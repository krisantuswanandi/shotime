const MLB_API = "https://statsapi.mlb.com/api/v1"
const PLAYER_ID = "660271"
const TEAM_ID = "108"

async function getPlayer() {
	const response = await fetch(`${MLB_API}/people/${PLAYER_ID}`)
	const result = await response.json()

	return result.people[0]
}

async function getTeam() {
	const response = await fetch(`${MLB_API}/teams/${TEAM_ID}`)
	const result = await response.json()

	return result.teams[0]
}

async function getStats() {
	const response = await fetch(`${MLB_API}/people/?personIds=${PLAYER_ID}&hydrate=stats(type=season,group=[hitting,pitching])`)
	const result = await response.json()

	return result.people[0].stats
}

export async function load() {
	const player = await getPlayer()
	const team = await getTeam()
	const stats = await getStats()

	return {
		player,
		team,
		stats,
	};
}
