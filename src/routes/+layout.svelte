<script lang="ts">
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import '../app.css';
	
	setupConvex(PUBLIC_CONVEX_URL,{});
	
	let { children } = $props();
</script>

{@render children()}
