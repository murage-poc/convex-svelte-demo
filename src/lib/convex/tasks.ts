import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const index = query({
    args:{},
    handler: async (ctx)=>{
        const tasks = await ctx.db.query('tasks').collect();
        const authors = await ctx.db.query('users').collect();

        return tasks.map((task) => {
            const author = authors.find((a) => a._id === task.authorId);
            return {
                ...task,
                author
            };
        });
    }
});

export const show = query({
    args:{},
    handler: async (ctx)=>{
        
    }
});


const CreateRequest = {
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal('PENDING'),v.literal('COMPLETE'),v.literal('ABANDONED'),),
}
export const create =mutation({
    args:  CreateRequest ,
    handler: async (ctx, data)=>{

        const author = await ctx.db.query('users').first();

        return await ctx.db.insert('tasks',{...data, authorId:author!._id})
    }
})