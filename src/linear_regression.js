import sampleCorrelation from "./sample_correlation.js";

/**
 * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
 * is a simple way to find a fitted line
 * between a set of coordinates. This algorithm finds the slope and y-intercept of a regression line
 * using the least sum of squares.
 *
 * @param {Array<Array<number>>} data an array of two-element of arrays,
 * like `[[0, 1], [2, 3]]`
 * @returns {Object} object containing the slope (`m`) and y-intercept (`b`) of
 * the regression line, plus the Pearson correlation coefficient (`r`) of the
 * input data. `r` is `NaN` when it is undefined, such as for a single point.
 * @example
 * linearRegression([[0, 0], [1, 1]]); // => { m: 1, b: 0, r: 1 }
 */
function linearRegression(data) {
    let m;
    let b;
    let r;

    // Store data length in a local variable to reduce
    // repeated object property lookups
    const dataLength = data.length;

    //if there's only one point, arbitrarily choose a slope of 0
    //and a y-intercept of whatever the y of the initial point is
    if (dataLength === 1) {
        m = 0;
        b = data[0][1];
        // Correlation is undefined for a single point.
        r = Number.NaN;
    } else {
        // Initialize our sums and scope the `m` and `b`
        // variables that define the line.
        let sumX = 0;
        let sumY = 0;
        let sumXX = 0;
        let sumXY = 0;

        // Use local variables to grab point values
        // with minimal object property lookups
        let point;
        let x;
        let y;

        // Gather the sum of all x values, the sum of all
        // y values, and the sum of x^2 and (x*y) for each
        // value.
        //
        // In math notation, these would be SS_x, SS_y, SS_xx, and SS_xy
        for (let i = 0; i < dataLength; i++) {
            point = data[i];
            x = point[0];
            y = point[1];

            sumX += x;
            sumY += y;

            sumXX += x * x;
            sumXY += x * y;
        }

        // `m` is the slope of the regression line
        m =
            (dataLength * sumXY - sumX * sumY) /
            (dataLength * sumXX - sumX * sumX);

        // `b` is the y-intercept of the line.
        b = sumY / dataLength - (m * sumX) / dataLength;

        // `r` is the Pearson correlation coefficient of the input data.
        // This delegates to `sampleCorrelation` rather than deriving `r`
        // from the sums above: the sum-of-squares form loses all precision
        // to catastrophic cancellation when the data has a large offset.
        r = sampleCorrelation(
            data.map(function (p) {
                return p[0];
            }),
            data.map(function (p) {
                return p[1];
            })
        );
    }

    // Return all three values as an object.
    return {
        m: m,
        b: b,
        r: r
    };
}

export default linearRegression;
