import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("combineMeans", function () {
    it("can combine the means of two lists", function () {
        const values1 = Object.freeze([8, 3, 4]);
        const values2 = Object.freeze([2, 6, 4]);
        assert.equal(
            ss.combineMeans(
                ss.mean(values1),
                values1.length,
                ss.mean(values2),
                values2.length
            ),
            4.5
        );
        assert.equal(
            ss.combineMeans(
                ss.mean(values1),
                values1.length,
                ss.mean(values2),
                values2.length
            ),
            ss.mean(values1.concat(values2))
        );
    });

    it("does not overflow on large means or counts", function () {
        assert.equal(ss.combineMeans(1e308, 2, 1e308, 2), 1e308);
        assert.equal(ss.combineMeans(1e308, 2, -1e308, 2), 0);
        assert.equal(ss.combineMeans(5, 1e308, 10, 1e308), 7.5);
    });
});
