import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
    linearRegression,
    linearRegressionLine,
    sampleCorrelation,
    approxEqual
} from "../index.js";

describe("linear regression", function () {
    it("correctly generates a line for a 0, 0 to 1, 1 dataset", function () {
        const l = linearRegressionLine(
            linearRegression([
                [0, 0],
                [1, 1]
            ])
        );
        assert.equal(l(0), 0);
        assert.equal(l(0.5), 0.5);
        assert.equal(l(1), 1);
    });

    it("correctly generates a line for a 0, 0 to 1, 0 dataset", function () {
        const l = linearRegressionLine(
            linearRegression([
                [0, 0],
                [1, 0]
            ])
        );
        assert.equal(l(0), 0);
        assert.equal(l(0.5), 0);
        assert.equal(l(1), 0);
    });

    it("handles a single-point sample", function () {
        const l = linearRegressionLine(linearRegression([[0, 0]]));
        assert.deepEqual(l(10), 0);
    });

    it("a straight line will have a slope of 0", function () {
        assert.deepEqual(
            linearRegression([
                [0, 0],
                [1, 0]
            ]),
            { m: 0, b: 0, r: Number.NaN }
        );
    });

    it("a line at 50% grade", function () {
        const { m, b, r } = linearRegression([
            [0, 0],
            [1, 0.5]
        ]);
        assert.deepEqual({ m, b }, { m: 0.5, b: 0 });
        assert.ok(approxEqual(r, 1));
    });

    it("a line with a high y-intercept", function () {
        const { m, b, r } = linearRegression([
            [0, 20],
            [1, 10]
        ]);
        assert.deepEqual({ m, b }, { m: -10, b: 20 });
        assert.ok(approxEqual(r, -1));
    });
});

describe("linear regression correlation", function () {
    it("returns the Pearson correlation coefficient r", function () {
        const data = [
            [1, 2],
            [2, 2],
            [3, 3],
            [4, 4],
            [5, 5],
            [6, 60]
        ];
        const { r } = linearRegression(data);
        assert.equal(
            r.toFixed(4),
            sampleCorrelation(
                data.map((d) => d[0]),
                data.map((d) => d[1])
            ).toFixed(4)
        );
    });

    it("returns r = 1 for a perfect positive fit", function () {
        assert.equal(
            linearRegression([
                [0, 0],
                [1, 1],
                [2, 2]
            ]).r,
            1
        );
    });
});
