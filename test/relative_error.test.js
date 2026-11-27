import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("relative error", function () {
    it("equal values", function () {
        assert.equal(ss.relativeError(14.5, 14.5), 0.0);
    });

    it("negative values", function () {
        assert.equal(ss.relativeError(-4, -5), 0.2);
    });

    it("correct handling of zero", function () {
        assert.equal(ss.relativeError(10101, 0), Number.POSITIVE_INFINITY);
    });

    it("correct handling of double zero", function () {
        assert.equal(ss.relativeError(0, 0), 0);
    });

    it("does not overflow on large opposite-sign values", function () {
        assert.equal(ss.relativeError(1e308, -1e308), 2);
        assert.equal(ss.relativeError(-1e308, 1e308), 2);
    });
});
