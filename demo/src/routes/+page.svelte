<script lang="ts">
    import { api } from '$lib/convex/_generated/api';
    import { useQuery } from 'convex-svelte';

    const query = useQuery(api.tasks.index,{})

    function getStatusColor(status: string) {
        switch (status) {
            case 'COMPLETE':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'ABANDONED':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    function formatDate(timestamp: number) {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
</script>

<svelte:boundary>
    {#snippet failed(error, reset)}
        <div class="min-h-screen flex items-center justify-center bg-gray-50">
            <div class="text-center p-8 bg-white rounded-lg shadow-lg">
                <div class="text-red-600 text-xl mb-4">
                    <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    Failed to load tasks
                </div>
                <button
                    on:click={reset}
                    class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Click to retry
                </button>
            </div>
        </div>
    {/snippet}

    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <!-- Header -->
        <div class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-6">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Task Management</h1>
                        <p class="text-gray-600 mt-1">Track and manage your project tasks</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {query.data?.length || 0} Tasks
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {#if query.isLoading}
                <div class="flex items-center justify-center py-12">
                    <div class="text-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p class="text-gray-600 text-lg">Loading tasks...</p>
                    </div>
                </div>
            {:else if !query.error && query.data}
                <!-- Task Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each query.data as task}
                        <div class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
                            <!-- Task Header -->
                            <div class="p-6 border-b border-gray-100">
                                <div class="flex items-start justify-between mb-3">
                                    <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
                                        {task.title}
                                    </h3>
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border {getStatusColor(task.status)}">
                                        {task.status}
                                    </span>
                                </div>

                                {#if task.description}
                                    <p class="text-gray-600 text-sm line-clamp-3">
                                        {task.description}
                                    </p>
                                {/if}
                            </div>

                            <!-- Task Footer -->
                            <div class="p-6 bg-gray-50">
                                <div class="flex items-center justify-between text-sm text-gray-500">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                            {task.author?.firstname?.[0]}{task.author?.lastname?.[0]}
                                        </div>
                                        <span class="font-medium text-gray-700">
                                            {task.author?.firstname} {task.author?.lastname}
                                        </span>
                                    </div>
                                    <div class="text-xs">
                                        {formatDate(task._creationTime)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- Empty State -->
                {#if query.data.length === 0}
                    <div class="text-center py-12">
                        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                        <p class="text-gray-600">Get started by creating your first task.</p>
                    </div>
                {/if}
            {/if}
        </div>
    </div>
</svelte:boundary>


