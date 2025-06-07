import { getPlayer, getTeam, getTodaysGames, categorizeStats } from '$lib/utils';

const PLAYER_ID = '660271';

export async function load() {
	const player = await getPlayer(PLAYER_ID);
	const categorizedStats = categorizeStats(player);

	return {
		playerId: PLAYER_ID,
		name: player.fullName,
		number: player.primaryNumber,
		stats: categorizedStats,
		team: getTeam(player.currentTeam.id),
		games: getTodaysGames(player.currentTeam.id)
	};
}
