export type Leaderboard<T> = LeaderboardEntry<T>[];

export type HighscoreLeaderboard = Leaderboard<number>;
export type TimeLeaderboard = Leaderboard<string>;

export interface LeaderboardEntry<T> {
    username: number,
    rank: number,
    score: T,
}