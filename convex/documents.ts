import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

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

export const get = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) throw new Error("User not Authorized")

        const documents = await ctx.db.query("document").collect()

        return documents
    }
})