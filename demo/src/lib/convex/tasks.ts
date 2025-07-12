import { query } from "./_generated/server";

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