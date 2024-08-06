const MLB_API = 'https://statsapi.mlb.com/api/v1';
const PLAYER_ID = '660271';

interface Player {
	fullName: string;
	primaryNumber: string;
	currentTeam: { id: number };
	stats: Stats[];
}

interface Team {
	id: number;
	name: string;
	teamName: string;
	abbreviation: string;
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
	ops: string;
	slg: string;
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

interface Schedule {
	dates: ScheduleDate[];
}

interface ScheduleDate {
	games: ScheduleGame[];
}

interface ScheduleGame {
	gamePk: number;
	status: {
		abstractGameState: 'Preview' | 'Live' | 'Final';
		statusCode: 'S' | 'I' | 'F' | 'PW';
	};
	teams: {
		away: ScheduleTeam;
		home: ScheduleTeam;
	};
}

interface ScheduleTeam {
	team: Team;
	score?: number;
}

async function getPlayer() {
	const response = await fetch(
		`${MLB_API}/people/${PLAYER_ID}?hydrate=stats(type=season,group=[hitting,pitching]),currentTeam`
	);
	const result = await response.json();

	return result.people[0] as Player;
}

async function getTeam(id: number) {
	const response = await fetch(`${MLB_API}/teams/${id}`);
	const result = await response.json();
	const team: Team = result.teams[0];

	return {
		name: team.name,
		slug: team.teamName.replace(/\W/g, '').toLowerCase()
	};
}

async function getTodaysGames(teamId: number) {
	const { date, timezone } = fuckTimezone();
	const response = await fetch(
		`${MLB_API}/schedule?sportIds=1&startDate=${date}&endDate=${date}&teamId=${teamId}&timeZone=${timezone}&hydrate=team`
	);
	const result: Schedule = await response.json();

	if (!result.dates.length) return [];

	return result.dates[0].games;
}

export async function load() {
	const player = await getPlayer();

	const categorizedStats: CategorizedStats = {
		hitting: { rbi: 0, avg: '0', homeRuns: 0, stolenBases: 0, ops: '0', slg: '0' },
		pitching: { wins: 0, strikeOuts: 0, era: '0' }
	};

	if (player.stats?.length > 0) {
		player.stats.forEach((stat) => {
			categorizedStats[stat.group.displayName] = stat.splits[0].stat as PitchingStat & HittingStat;
		});
	}

	return {
		name: player.fullName,
		number: player.primaryNumber,
		stats: categorizedStats,
		team: getTeam(player.currentTeam.id),
		games: getTodaysGames(player.currentTeam.id)
	};
}

function fuckTimezone() {
	const timezone = 'Asia/Jakarta';
	const timezoneOffset = 7 * 60 * 60 * 1000;
	const today = new Date(Date.now() + timezoneOffset);
	const date = today.toISOString().substring(0, 10);
	return { date, timezone };
}
