import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("geometric mean", function () {
    // From http://en.wikipedia.org/wiki/Geometric_mean
    it("can get the mean of two numbers", function () {
        assert.equal(ss.geometricMean([2, 8]), 4);
        assert.equal(ss.geometricMean([4, 1, 1 / 32]), 0.5);
        assert.equal(Math.round(ss.geometricMean([2, 32, 1])), 4);
    });

    it("cannot calculate for empty lists", function () {
        assert.throws(function () {
            ss.geometricMean([]);
        });
    });

    it("cannot calculate for lists with negative numbers", function () {
        assert.throws(function () {
            ss.geometricMean([-1]);
        });
    });

    it("equals zero if array contains zero", function () {
        if (ss.geometricMean([0, 1, 2]) !== 0) {
            assert.fail("geometric mean of array containing zero is not zero");
        }
    });

    it("does not overflow when the running product leaves double range", function () {
        // The geometric mean of 500 copies of 1e10 is 1e10, but the product
        // multiplied out is 1e5000.
        const mean = ss.geometricMean(new Array(500).fill(1e10));
        assert.ok(Number.isFinite(mean), "expected a finite mean, got " + mean);
        assert.ok(Math.abs(mean / 1e10 - 1) < 1e-9);
    });

    it("does not underflow when the running product leaves double range", function () {
        const mean = ss.geometricMean(new Array(500).fill(1e-10));
        assert.ok(mean > 0, "expected a positive mean, got " + mean);
        assert.ok(Math.abs(mean / 1e-10 - 1) < 1e-9);
    });

    it("keeps the exact result when the product stays in range", function () {
        assert.equal(ss.geometricMean([1, 2, 3, 4, 5]), 2.605171084697352);
    });
});
