/**
 * https://simple-statistics.github.io/docs/#chisquaredgoodnessoffit
 */
declare function chiSquaredGoodnessOfFit(
    data: readonly number[],
    distributionType: (mean: number) => number[] | undefined,
    significance: number
): boolean;

export default chiSquaredGoodnessOfFit;
