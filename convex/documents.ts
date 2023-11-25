import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { Doc, Id } from './_generated/dataModel'

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

// Function for get the archived notes
export const getArchived = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) throw new Error("Not Authenticated User")

        const userId = identity.subject

        const documents = await ctx.db.query('document')
            .withIndex('by_user', q => q.eq("userId", userId))
            .filter(q => q.eq(q.field('isArchived'), true))
            .order('desc')
            .collect()

        return documents
    }
})

// Function for restoring a note
export const restore = mutation({
    args: {
        id: v.id('document')
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) throw new Error("User not Authenticated")

        const userId = identity.subject

        const exisitingDoc = await ctx.db.get(args.id)
        if (!exisitingDoc) throw Error("Note does not exist")

        if (exisitingDoc.userId !== userId) throw new Error("Unauthorized User")


        const recursiveRestore = async (documentId: Id<"document">) => {
            const children = await ctx.db.query('document')
                .withIndex('by_user_parent', q => (q.eq("userId", userId).eq("parentDocument", documentId))).collect()

            for (const child of children) {
                await ctx.db.patch(child._id, {isArchived: false})
                await recursiveRestore(child._id)
            }

        }

        const options: Partial<Doc<"document">> = {
            isArchived: false
        }


        if (exisitingDoc.parentDocument) {
            const parent = await ctx.db.get(exisitingDoc.parentDocument)
            if (parent?.isArchived) {
                options.parentDocument = undefined
            }
        }
        const document = await ctx.db.patch(args.id, options)

        recursiveRestore(args.id)
        return document
    }
})

// Function for Deleting a note
export const deleteNote = mutation({
    args: {
        documentId: v.id("document")
    },
    handler: async(ctx,args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity) throw new Error("Unauthorized User")
        const userId = identity.subject

        const existingDoc = await ctx.db.get(args.documentId)
        if(!existingDoc) throw new Error("Document not found")

        if(existingDoc.userId !== userId) throw new Error("Unauthorized Access to the Note")

        const deleteNote = await ctx.db.delete(args.documentId)

        return deleteNote
    }
})