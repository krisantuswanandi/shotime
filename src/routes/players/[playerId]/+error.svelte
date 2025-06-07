<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Not Found - Shotime</title>
</svelte:head>

<div class="flex justify-center items-center flex-col h-full gap-2">
	<h1 class="text-gray-600">
		Player "{page.params.playerId}" not found.
	</h1>
	<div class="flex gap-4">
		<a href="/" class="text-blue-500 hover:underline">Back</a>
	</div>
</div>
