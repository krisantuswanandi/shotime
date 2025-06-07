export interface Player {
	fullName: string;
	primaryNumber: string;
	currentTeam: { id: number };
	stats: Stats[];
}

export interface Team {
	id: number;
	name: string;
	teamName: string;
	abbreviation: string;
}

export interface PitchingStat {
	wins: number;
	era: string;
	strikeOuts: number;
}

export interface PitchingStats {
	group: { displayName: 'pitching' };
	splits: { stat: PitchingStat }[];
}

export interface HittingStat {
	homeRuns: number;
	rbi: number;
	stolenBases: number;
	avg: string;
	ops: string;
	slg: string;
}

export interface HittingStats {
	group: { displayName: 'hitting' };
	splits: { stat: HittingStat }[];
}

export type Stats = HittingStats | PitchingStats;

export interface CategorizedStats {
	hitting: HittingStat;
	pitching: PitchingStat;
}

export interface Schedule {
	dates: ScheduleDate[];
}

export interface ScheduleDate {
	games: ScheduleGame[];
}

export interface ScheduleGame {
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

export interface ScheduleTeam {
	team: Team;
	score?: number;
}

export interface PlayerData {
	playerId?: string;
	name: string;
	number: string;
	stats: CategorizedStats;
	team: Promise<{ name: string; slug: string }>;
	games: Promise<ScheduleGame[]>;
}
