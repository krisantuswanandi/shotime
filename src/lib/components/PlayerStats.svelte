<script lang="ts">
	import mlbLogo from '../../assets/mlb.svg';
	import type { PlayerData } from '$lib/types';

	let { data }: { data: PlayerData } = $props();
</script>

<div class="flex justify-center items-center flex-col h-full">
	<h1 class="text-4xl">
		<a href="https://www.mlb.com/player/{data.playerId}" target="_blank">
			{data.name}
		</a>
	</h1>
	<h2>
		{#await data.team}
			Loading...
		{:then team}
			<a href="https://www.mlb.com/{team.slug}/schedule" target="_blank">
				{team.name} #{data.number}
			</a>
		{:catch}
			#{data.number}
		{/await}
	</h2>
	<div class="w-8 mt-6">
		<a href="https://www.mlb.com/standings/wild-card" target="_blank">
			<img src={mlbLogo} alt="MLB" class="block" />
		</a>
	</div>
	<div class="mt-8">
		<table class="bg-gray-200">
			<caption>
				<a href="https://www.mlb.com/stats" target="_blank">Hitting</a>
			</caption>
			<thead>
				<tr>
					<th class="px-4 py-1">
						<a href="https://www.mlb.com/stats/home-runs" target="_blank">HR</a>
					</th>
					<th class="px-4 py-1">
						<a href="https://www.mlb.com/stats/rbi" target="_blank">RBI</a>
					</th>
					<th class="px-4 py-1">
						<a href="https://www.mlb.com/stats/stolen-bases" target="_blank">SB</a>
					</th>
					<th class="px-4 py-1">
						<a href="https://www.mlb.com/stats/batting-average" target="_blank">AVG</a>
					</th>
					<th class="px-4 py-1">
						<a href="https://www.mlb.com/stats/slugging-percentage" target="_blank">SLG</a>
					</th>
					<th class="px-4 py-1">
						<a href="https://www.mlb.com/stats" target="_blank">OPS</a>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="px-4 py-1">{data.stats.hitting.homeRuns}</td>
					<td class="px-4 py-1">{data.stats.hitting.rbi}</td>
					<td class="px-4 py-1">{data.stats.hitting.stolenBases}</td>
					<td class="px-4 py-1">{data.stats.hitting.avg}</td>
					<td class="px-4 py-1">{data.stats.hitting.slg}</td>
					<td class="px-4 py-1">{data.stats.hitting.ops}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="mt-4">
		<table class="bg-gray-200">
			<caption>
				<a href="https://www.mlb.com/stats/pitching" target="_blank">Pitching</a>
			</caption>
			<thead>
				<tr>
					<th class="px-4 py-1">
						<a href="https://www.mlb.com/stats/pitching/wins" target="_blank">W</a>
					</th>
					<th class="px-4 py-1">
						<a href="https://www.mlb.com/stats/pitching" target="_blank">ERA</a>
					</th>
					<th class="px-4 py-1">
						<a href="https://www.mlb.com/stats/pitching/strikeouts" target="_blank">SO</a>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="px-4 py-1">{data.stats.pitching.wins}</td>
					<td class="px-4 py-1">{data.stats.pitching.era}</td>
					<td class="px-4 py-1">{data.stats.pitching.strikeOuts}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="mt-10 flex flex-col items-center">
		{#await data.games}
			Loading...
		{:then games}
			{#if games.length}
				<div>Today's games:</div>
				{#each games as game}
					<div class="mt-1 relative">
						<a href="https://www.mlb.com/gameday/{game.gamePk}" target="_blank">
							<b>{game.teams.home.team.abbreviation}</b>
							{game.teams.home.score ?? ''} vs {game.teams.away.score ?? ''}
							<b>{game.teams.away.team.abbreviation}</b>
						</a>
						{#if game.status.abstractGameState === 'Live'}
							<div class="absolute top-2 -right-4 w-2 h-2">
								<div class="absolute w-full h-full bg-red-500 rounded-full animate-ping"></div>
								<div class="w-full h-full bg-red-500 rounded-full"></div>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		{/await}
	</div>
	<div class="mt-10">
		<a href="https://github.com/krisantuswanandi/shotime" target="_blank">
			<img src="https://cdn.svgporn.com/logos/github-icon.svg" alt="github" class="w-6" />
		</a>
	</div>
</div>
