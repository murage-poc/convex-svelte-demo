import {defineTable} from "convex/server";
import {v} from "convex/values";

export const Tasks = defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal('PENDING'),v.literal('COMPLETE'),v.literal('ABANDONED'),),
    authorId: v.id('users')
})