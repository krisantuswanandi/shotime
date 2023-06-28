<script>
	export let data;
</script>

<h1>{data.name} #{data.number}</h1>
<h2>{data.team}</h2>

<br />

<h3>Hitting</h3>
<table border={1}>
	<thead>
		<tr>
			<th>HR</th>
			<th>RBI</th>
			<th>SB</th>
			<th>AVG</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{data.stats.hitting.homeRuns}</td>
			<td>{data.stats.hitting.rbi}</td>
			<td>{data.stats.hitting.stolenBases}</td>
			<td>{data.stats.hitting.avg}</td>
		</tr>
	</tbody>
</table>

<h3>Pitching</h3>
<table border={1}>
	<thead>
		<tr>
			<th>W</th>
			<th>ERA</th>
			<th>SO</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{data.stats.pitching.wins}</td>
			<td>{data.stats.pitching.era}</td>
			<td>{data.stats.pitching.strikeOuts}</td>
		</tr>
	</tbody>
</table>
