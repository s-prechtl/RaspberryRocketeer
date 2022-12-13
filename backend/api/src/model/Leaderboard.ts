export type Leaderboard<T> = LeaderboardEntry<T>[];

export interface LeaderboardEntry<T> {
    rank: number,
    username: string,
    score: T,
}