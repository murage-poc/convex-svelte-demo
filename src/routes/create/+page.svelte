<script lang="ts">
    import { useConvexClient } from 'convex-svelte';
    import { api } from "$lib/convex/_generated/api";

    const convexClient = useConvexClient();

    interface Task {
        title: string;
        description: string;
        status: 'PENDING' | 'COMPLETE'
    }

   let isSubmitting = $state(false);

    let task = $state<Task>({
         title :'',
         description :'',
         status :'PENDING' // Default status
    })

    async function handleSubmit(evt: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
        evt.preventDefault();

        isSubmitting = true;
       await convexClient.mutation(api.tasks.create, task);

        isSubmitting = false;
       //reset form
       task = {title:'',description:'',status:'PENDING'};
    }
</script>

<div class="mx-auto w-[80%] md:w-1/3 p-5">

    <form onsubmit={handleSubmit} class="space-y-4 p-4 bg-white shadow border border-gray-100 rounded-lg">
        <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
                    type="text"
                    id="title"
                    bind:value={task.title}
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>

        <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea
                    id="description"
                    bind:value={task.description}
                    rows="3"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
        </div>

        <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select
                    id="status"
                    bind:value={task.status}
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
                <option value="PENDING">Pending</option>
                <option value="COMPLETE">Complete</option>
                <option value="ABANDONED">Abandoned</option>
            </select>
        </div>

        <button
                type="submit"
                disabled={isSubmitting}
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Add Task
        </button>
    </form>
</div>