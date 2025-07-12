import {defineSchema} from "convex/server";
import {Users} from "$lib/convex/schemas/users";
import {Tasks} from "$lib/convex/schemas/tasks";

export default defineSchema({
    users: Users,
    tasks: Tasks
})