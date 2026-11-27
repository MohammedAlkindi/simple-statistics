import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bisect } from "../index.js";

describe("bisect", function () {
    it("can find root of sin and cos", function () {
        assert.equal(
            Number(bisect(Math.sin, 1, 4, 100, 0.003).toFixed(4)),
            3.1416
        );
        assert.equal(
            Number(bisect(Math.cos, 0, 4, 100, 0.003).toFixed(4)),
            1.5723
        );
        assert.throws(function () {
            assert.equal(
                Number(bisect(Math.cos, 0, 4, 1, 0.003).toFixed(4)),
                1.5723
            );
        });
        assert.throws(function () {
            bisect(0);
        });
    });

    it("does not overflow midpoint on large endpoints", function () {
        const root = bisect(
            function (x) {
                return x - 1.2e308;
            },
            1e308,
            1.5e308,
            100,
            1e290
        );
        assert.ok(Math.abs(root - 1.2e308) < 1e290);

        const symmetricRoot = bisect(
            function (x) {
                return x;
            },
            -1e308,
            1e308,
            100,
            1
        );
        assert.equal(symmetricRoot, 0);
    });
});
