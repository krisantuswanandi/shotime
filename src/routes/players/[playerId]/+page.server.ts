import { getPlayer, getTeam, getTodaysGames, categorizeStats } from '$lib/utils';

export async function load({ params }: { params: { playerId: string } }) {
	try {
		const player = await getPlayer(params.playerId);
		const categorizedStats = categorizeStats(player);

		return {
			playerId: params.playerId,
			name: player.fullName,
			number: player.primaryNumber,
			stats: categorizedStats,
			team: getTeam(player.currentTeam.id),
			games: getTodaysGames(player.currentTeam.id)
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		throw new Error(`Failed to load player data: ${errorMessage}`);
	}
}
