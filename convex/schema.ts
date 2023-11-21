import {defineSchema, defineTable} from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    document: defineTable({
        title: v.string(),
        userId: v.string(),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isArchived: v.boolean(),
        isPublished: v.boolean(),
        parentDocument: v.optional(v.id("document"))
    })
    .index('by_user', ["userId"])
    .index('by_user_parent', ["userId", "parentDocument"])
})