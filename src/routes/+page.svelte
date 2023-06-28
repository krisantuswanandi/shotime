<script>
	export let data;

	const { fullName: name, primaryNumber: number } = data.player;
	const { name: team } = data.team;

	let stats = {};

	data.stats.forEach((stat) => {
		stats[stat.group.displayName] = stat.splits[0].stat;
	});
</script>

<h1>{name} #{number}</h1>
<h2>{team}</h2>

<br />

<h3>Hitting</h3>
<table border>
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
			<td>{stats['hitting'].homeRuns}</td>
			<td>{stats['hitting'].rbi}</td>
			<td>{stats['hitting'].stolenBases}</td>
			<td>{stats['hitting'].avg}</td>
		</tr>
	</tbody>
</table>

<h3>Pitching</h3>
<table border>
	<thead>
		<tr>
			<th>W</th>
			<th>ERA</th>
			<th>SO</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{stats['pitching'].wins}</td>
			<td>{stats['pitching'].era}</td>
			<td>{stats['pitching'].strikeOuts}</td>
		</tr>
	</tbody>
</table>
