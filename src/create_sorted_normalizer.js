/**
 * Create a normalizer function for a sorted numeric array so squared deviations
 * avoid overflow and underflow while remaining invariant to scale.
 *
 * @private
 * @param {Array<number>} sortedData Sorted numeric input array.
 * @param {number} length Number of elements to inspect.
 * @returns {(value: number) => number} Function mapping each value to a shifted, scaled number.
 */
function createSortedNormalizer(sortedData, length) {
    if (length === 0) {
        return function normalizeEmpty(value) {
            return value;
        };
    }

    const shift = sortedData[Math.floor(length / 2)];
    const minDiff = sortedData[0] - shift;
    const maxDiff = sortedData[length - 1] - shift;
    const absMaxDiff = Math.max(Math.abs(minDiff), Math.abs(maxDiff));

    if (Number.isFinite(absMaxDiff)) {
        if (absMaxDiff === 0 || (absMaxDiff >= 1e-140 && absMaxDiff <= 1e140)) {
            return function normalizeUnscaled(value) {
                return value - shift;
            };
        }

        return function normalizeScaled(value) {
            return (value - shift) / absMaxDiff;
        };
    }

    if (
        Number.isFinite(sortedData[0]) &&
        Number.isFinite(sortedData[length - 1]) &&
        Number.isFinite(shift)
    ) {
        const absScale = Math.max(
            Math.abs(sortedData[0]),
            Math.abs(sortedData[length - 1])
        );
        const shiftScaled = shift / absScale;

        return function normalizePreScaled(value) {
            return value / absScale - shiftScaled;
        };
    }

    return function normalizeNonFinite(value) {
        return value - shift;
    };
}

export default createSortedNormalizer;
