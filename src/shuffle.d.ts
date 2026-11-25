/**
 * https://simple-statistics.github.io/docs/#shuffle
 */
declare function shuffle<T>(x: readonly T[], randomSource?: () => number): T[];

export default shuffle;
