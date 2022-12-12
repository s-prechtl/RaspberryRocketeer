export interface LeaderboardEntry<T> {
    rank: number,
    username: string,
    score: T,
}