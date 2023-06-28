<script>
	export let data;
</script>

<div class="flex justify-center items-center flex-col h-full">
	<h1 class="text-4xl">{data.name}</h1>
	<h2>{data.team} #{data.number}</h2>
	<div class="mt-8">
		<table class="bg-gray-200">
			<caption>Hitting</caption>
			<thead>
				<tr>
					<th class="px-4 py-1">HR</th>
					<th class="px-4 py-1">RBI</th>
					<th class="px-4 py-1">SB</th>
					<th class="px-4 py-1">AVG</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="px-4 py-1">{data.stats.hitting.homeRuns}</td>
					<td class="px-4 py-1">{data.stats.hitting.rbi}</td>
					<td class="px-4 py-1">{data.stats.hitting.stolenBases}</td>
					<td class="px-4 py-1">{data.stats.hitting.avg}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="mt-4">
		<table class="bg-gray-200">
			<caption>Pitching</caption>
			<thead>
				<tr>
					<th class="px-4 py-1">W</th>
					<th class="px-4 py-1">ERA</th>
					<th class="px-4 py-1">SO</th>
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
