import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { Id } from './_generated/dataModel'

// Function to crate a document
export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("document"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        // console.log("<----------------Identity----------------->", identity);
        // console.log("<----------------Context----------------->", ctx);

        if (!identity) throw new Error("User not Authorized")

        const userId = identity.subject

        const document = await ctx.db.insert("document", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false,
        })

        return document
    }
})

// Function for fetching data for Sidebar
export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("document"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) throw new Error("User not Authenticated")

        const userId = identity.subject

        const documents = await ctx.db.query("document")
            .withIndex("by_user_parent", q =>
                q.eq('userId', userId)
                    .eq('parentDocument', args.parentDocument))
            .filter(q => q.eq(q.field('isArchived'), false))
            .order('desc')
            .collect()



        return documents
    }
})

// Function for archiving notes
export const archive = mutation({
    args: {
        id: v.id('document')
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) return new Error("User not Authenticated")

        const userId = identity.subject

        // Check if note really exists
        const existingDoc = await ctx.db.get(args.id)

        if (!existingDoc) return new Error("Note doesn't exist")

        // Check if note is of authenticated user  
        if (existingDoc.userId !== userId) return new Error("Unauthenticated User")


        // Making recursive call for archiving notes
        const recursiveArchive = async (documentId: Id<"document">) => {
            const children = await ctx.db.query("document").withIndex('by_user_parent', q => (
                q
                    .eq('userId', userId)
                    .eq('parentDocument', documentId)
            )).collect()

            console.log("children of documents are: ", children)

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true
                })
                await recursiveArchive(child._id)
            }
        }

        // Set archive field to true
        const document = await ctx.db.patch(args.id, {
            isArchived: true
        })

        recursiveArchive(args.id)
        return document

    }
})