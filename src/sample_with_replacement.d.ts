/**
 * https://simple-statistics.github.io/docs/#samplewithreplacement
 */
declare function sampleWithReplacement<T>(
    x: readonly T[],
    n: number,
    randomSource?: () => number
): T[];

export default sampleWithReplacement;
