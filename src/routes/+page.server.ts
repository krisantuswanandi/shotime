const MLB_API = 'https://statsapi.mlb.com/api/v1';
const PLAYER_ID = '660271';

interface Player {
	fullName: string;
	primaryNumber: string;
	currentTeam: { id: number };
	stats: Stats[];
}

interface Team {
	name: string;
	teamName: string;
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

	// still sceptical about streaming 🤨
	await new Promise((res) => {
		setTimeout(() => {
			res(true);
		}, 10000);
	});

	return {
		name: team.name,
		slug: team.teamName.replace(/\W/g, '').toLowerCase()
	};
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
		team: getTeam(player.currentTeam.id)
	};
}
