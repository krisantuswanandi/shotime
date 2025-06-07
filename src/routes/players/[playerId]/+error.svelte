<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Player Not Found - Shotime</title>
</svelte:head>

<div class="flex justify-center items-center flex-col h-full">
	<h1 class="text-4xl mb-4">Player Not Found</h1>
	<p class="text-gray-600 mb-8">
		The player with ID "{$page.params.playerId}" could not be found.
	</p>
	<div class="flex gap-4">
		<a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
			Go Home
		</a>
		<a
			href="/players/660271"
			class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
		>
			View Shohei Ohtani
		</a>
	</div>
</div>
