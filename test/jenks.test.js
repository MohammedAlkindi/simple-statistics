import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { jenks } from "../index.js";

describe("jenks", function () {
    it("will not try to assign more classes than datapoints", function () {
        assert.equal(jenks([1, 2], 3), null);
    });
    it("assigns correct breaks (small gaps between classes)", function () {
        assert.deepEqual(jenks([1, 2, 4, 5, 7, 9, 10, 20], 3), [1, 7, 20, 20]);
    });
    it("assigns correct breaks (large gaps between classes)", function () {
        assert.deepEqual(jenks([2, 32, 33, 34, 100], 3), [2, 32, 100, 100]);
    });
    it("assigns correct breaks (breaking N points into N classes)", function () {
        assert.deepEqual(
            jenks([9, 10, 11, 12, 13], 5),
            [9, 10, 11, 12, 13, 13]
        );
    });
    it("is translation invariant", function () {
        const offset = 1700000000000;
        const data = [];
        for (let i = 0; i < 12; i++) {
            data.push(i);
        }
        const shifted = data.map(function (v) {
            return v + offset;
        });

        const breaks = jenks(data, 3);
        const shiftedBreaks = jenks(shifted, 3);

        assert.deepEqual(
            shiftedBreaks,
            breaks.map(function (v) {
                return v + offset;
            })
        );
    });
    it("handles extreme magnitudes without overflow or underflow", function () {
        assert.deepEqual(
            jenks([1e160, 2e160, 1e161, 2e161], 2),
            [1e160, 2e161, 2e161]
        );
        assert.deepEqual(
            jenks([1e-170, 2e-170, 1e-169, 2e-169], 2),
            [1e-170, 2e-169, 2e-169]
        );
        assert.deepEqual(
            jenks([-1e308, -1e308, 1e308, 1e308], 2),
            [-1e308, 1e308, 1e308]
        );
        assert.deepEqual(
            jenks([-2e307, -1e307, 1e308, 1.5e308], 2),
            [-2e307, 1e308, 1.5e308]
        );
    });
});
