<script lang="ts">
	import PlayerStats from '$lib/components/PlayerStats.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.name} - Shotime</title>
</svelte:head>

<PlayerStats {data} />
