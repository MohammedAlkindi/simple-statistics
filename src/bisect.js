import sign from "./sign.js";

/**
 * [Bisection method](https://en.wikipedia.org/wiki/Bisection_method) is a root-finding
 * method that repeatedly bisects an interval to find the root.
 *
 * This function returns a numerical approximation to the exact value.
 *
 * @param {Function} func input function
 * @param {number} start - start of interval
 * @param {number} end - end of interval
 * @param {number} maxIterations - the maximum number of iterations
 * @param {number} errorTolerance - the error tolerance
 * @returns {number} estimated root value
 * @throws {TypeError} Argument func must be a function
 *
 * @example
 * bisect(Math.cos,0,4,100,0.003); // => 1.572265625
 */
function bisect(func, start, end, maxIterations, errorTolerance) {
    if (typeof func !== "function")
        throw new TypeError("func must be a function");

    for (let i = 0; i < maxIterations; i++) {
        let output = (start + end) / 2;
        if (!Number.isFinite(output)) {
            output = start / 2 + end / 2;
        }

        let halfWidth = Math.abs((end - start) / 2);
        if (!Number.isFinite(halfWidth)) {
            halfWidth = Math.abs(end / 2 - start / 2);
        }

        if (func(output) === 0 || halfWidth < errorTolerance) {
            return output;
        }

        if (sign(func(output)) === sign(func(start))) {
            start = output;
        } else {
            end = output;
        }
    }

    throw new Error("maximum number of iterations exceeded");
}

export default bisect;
