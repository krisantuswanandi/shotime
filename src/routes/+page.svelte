<script>
	import mlbLogo from '../assets/mlb.svg';

	export let data;
</script>

<svelte:head>
	<title>Shotime</title>
</svelte:head>

<div class="flex justify-center items-center flex-col h-full">
	<h1 class="text-4xl">
		<a href="https://www.mlb.com/player/shohei-ohtani-660271" target="_blank">
			{data.name}
		</a>
	</h1>
	<h2>
		<a href="https://www.mlb.com/dodgers/schedule" target="_blank">
			{data.team} #{data.number}
		</a>
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
	<div class="mt-10">
		<a href="https://github.com/krisantuswanandi/shotime" target="_blank">
			<img src="https://cdn.svgporn.com/logos/github-icon.svg" alt="github" class="w-6" />
		</a>
	</div>
</div>
