const MLB_API = 'https://statsapi.mlb.com/api/v1';
const PLAYER_ID = '660271';
const TEAM_ID = '119';

interface Player {
	fullName: string;
	primaryNumber: string;
}

interface Team {
	name: string;
}

interface PitchingStat {
	wins: number;
	era: string;
	strikeOuts: number;
}

interface PitchingStats {
	group: { displayName: 'pitching' };
	splits: { stat: PitchingStat }[];
}

interface HittingStat {
	homeRuns: number;
	rbi: number;
	stolenBases: number;
	avg: string;
}

interface HittingStats {
	group: { displayName: 'hitting' };
	splits: { stat: HittingStat }[];
}

type Stats = HittingStats | PitchingStats;

interface CategorizedStats {
	hitting: HittingStat;
	pitching: PitchingStat;
}

async function getPlayer() {
	const response = await fetch(`${MLB_API}/people/${PLAYER_ID}`);
	const result = await response.json();

	return result.people[0] as Player;
}

async function getTeam() {
	const response = await fetch(`${MLB_API}/teams/${TEAM_ID}`);
	const result = await response.json();

	return result.teams[0] as Team;
}

async function getStats() {
	const response = await fetch(
		`${MLB_API}/people/?personIds=${PLAYER_ID}&hydrate=stats(type=season,group=[hitting,pitching])`
	);
	const result = await response.json();

	return result.people[0].stats as Stats[];
}

export async function load() {
	const [player, team, stats] = await Promise.all([getPlayer(), getTeam(), getStats()]);

	const categorizedStats: CategorizedStats = {
		hitting: { rbi: 0, avg: '', homeRuns: 0, stolenBases: 0 },
		pitching: { wins: 0, strikeOuts: 0, era: '' }
	};

	stats.forEach((stat) => {
		categorizedStats[stat.group.displayName] = stat.splits[0].stat as PitchingStat & HittingStat;
	});

	return {
		name: player.fullName,
		number: player.primaryNumber,
		team: team.name,
		stats: categorizedStats
	};
}
