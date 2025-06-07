import type {
	Player,
	Team,
	Schedule,
	CategorizedStats,
	PitchingStat,
	HittingStat
} from '$lib/types';

const MLB_API = 'https://statsapi.mlb.com/api/v1';

export async function getPlayer(playerId: string) {
	const response = await fetch(
		`${MLB_API}/people/${playerId}?hydrate=stats(type=season,group=[hitting,pitching]),currentTeam`
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch player data: ${response.status}`);
	}

	const result = await response.json();

	if (!result.people || result.people.length === 0) {
		throw new Error('Player not found');
	}

	return result.people[0] as Player;
}

export async function getTeam(id: number) {
	const response = await fetch(`${MLB_API}/teams/${id}`);
	const result = await response.json();
	const team: Team = result.teams[0];

	return {
		name: team.name,
		slug: team.teamName.replace(/\W/g, '').toLowerCase()
	};
}

export async function getTodaysGames(teamId: number) {
	const { date, timezone } = fuckTimezone();
	const response = await fetch(
		`${MLB_API}/schedule?sportIds=1&startDate=${date}&endDate=${date}&teamId=${teamId}&timeZone=${timezone}&hydrate=team`
	);
	const result: Schedule = await response.json();

	if (!result.dates.length) return [];

	return result.dates[0].games;
}

export function categorizeStats(player: Player): CategorizedStats {
	const categorizedStats: CategorizedStats = {
		hitting: { rbi: 0, avg: '0', homeRuns: 0, stolenBases: 0, ops: '0', slg: '0' },
		pitching: { wins: 0, strikeOuts: 0, era: '0' }
	};

	if (player.stats?.length > 0) {
		player.stats.forEach((stat) => {
			categorizedStats[stat.group.displayName] = stat.splits[0].stat as PitchingStat & HittingStat;
		});
	}

	return categorizedStats;
}

function fuckTimezone() {
	const timezone = 'Asia/Jakarta';
	const timezoneOffset = 7 * 60 * 60 * 1000;
	const today = new Date(Date.now() + timezoneOffset);
	const date = today.toISOString().substring(0, 10);
	return { date, timezone };
}
