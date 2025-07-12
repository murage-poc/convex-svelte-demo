import {defineTable} from "convex/server";
import {v} from "convex/values";

export const Users = defineTable({
    firstname: v.string(),
    lastname: v.optional(v.string()),
    email: v.string(),
    creatorId: v.union(v.id('users'),v.null())
});