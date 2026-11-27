/**
 * When combining two lists of values for which one already knows the means,
 * one does not have to necessary recompute the mean of the combined lists in
 * linear time. They can instead use this function to compute the combined
 * mean by providing the mean & number of values of the first list and the mean
 * & number of values of the second list.
 *
 * @since 3.0.0
 * @param {number} mean1 mean of the first list
 * @param {number} n1 number of items in the first list
 * @param {number} mean2 mean of the second list
 * @param {number} n2 number of items in the second list
 * @returns {number} the combined mean
 *
 * @example
 * combineMeans(5, 3, 4, 3); // => 4.5
 */
function combineMeans(mean1, n1, mean2, n2) {
    const weighted = mean1 * n1 + mean2 * n2;
    const total = n1 + n2;
    if (
        (!Number.isFinite(weighted) || !Number.isFinite(total)) &&
        Number.isFinite(mean1) &&
        Number.isFinite(mean2) &&
        Number.isFinite(n1) &&
        Number.isFinite(n2) &&
        total !== 0
    ) {
        if (Number.isFinite(total)) {
            return mean1 * (n1 / total) + mean2 * (n2 / total);
        }
        const scale = Math.max(Math.abs(n1), Math.abs(n2));
        const scaledN1 = n1 / scale;
        const scaledN2 = n2 / scale;
        const scaledTotal = scaledN1 + scaledN2;
        return (
            mean1 * (scaledN1 / scaledTotal) + mean2 * (scaledN2 / scaledTotal)
        );
    }
    return weighted / total;
}

export default combineMeans;
