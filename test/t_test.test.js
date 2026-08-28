import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("t test", function () {
    it("can compare a known value to the mean of samples", function () {
        // tTest uses the SAMPLE standard deviation (Bessel's correction),
        // matching the one-sample t statistic defined on the Wikipedia page
        // linked from this function's own JSDoc.
        const res = ss.tTest([1, 2, 3, 4, 5, 6], 3.385);
        assert.equal(res, 0.15057034426283503);
    });

    it("matches a hand-computed value anchored to the Wikipedia standard-deviation worked example", function () {
        // x = [2, 4, 4, 4, 5, 5, 7, 9] is the worked example from Wikipedia's
        // "Standard deviation" article: mean = 5, and the sum of squared
        // deviations from the mean is 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32.
        //
        // Working the one-sample t statistic by hand from that reference,
        // against expectedValue = 4:
        //   sample variance (Bessel's correction, n = 8) = 32 / (8 - 1) = 32/7
        //   sample standard deviation                    = sqrt(32/7)
        //   t = (mean - expectedValue) / (sampleStandardDeviation / sqrt(n))
        //     = (5 - 4) / (sqrt(32/7) / sqrt(8))
        //     = 1 / sqrt(32 / (7 * 8))
        //     = sqrt(7) / 2
        const x = [2, 4, 4, 4, 5, 5, 7, 9];
        const expected = Math.sqrt(7) / 2;
        const res = ss.tTest(x, 4);
        assert.equal(res, expected);
    });

    it("throws for a sample of fewer than two data points", function () {
        // tTest delegates to sampleStandardDeviation, which requires
        // Bessel's correction (n - 1) to be non-zero, so a single-element
        // sample throws rather than silently returning Infinity.
        assert.throws(() => ss.tTest([5], 3), {
            message: "sampleVariance requires at least two data points"
        });
    });
});
