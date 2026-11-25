import assert from "node:assert/strict";
import { it } from "node:test";
import * as Random from "random-js";

const random = new Random.Random(Random.MersenneTwister19937.seed(0));

import * as ss from "../index.js";

function rng() {
    return random.real(0, 1);
}

it("sample", function () {
    assert.deepEqual(ss.sample([], 0, rng), [], "edge case - zero array");
    assert.deepEqual(ss.sample([], 2, rng), [], "edge case - zero array");
    assert.deepEqual(
        ss.sample([1, 2, 3], 0, rng, 0),
        [],
        "edge case - zero array"
    );
    assert.deepEqual(
        ss.sample([1, 2, 3], 1, rng),
        [1],
        "edge case - sample of 1"
    );
    assert.deepEqual(ss.sample([1, 2, 3], 1, rng), [2]);
    assert.deepEqual(ss.sample([1, 2, 3], 3, rng), [2, 3, 1]);
    assert.deepEqual(ss.sample([1, 2, 3, 4], 2, rng), [3, 1]);
    assert.deepEqual(ss.sample([1, 2, 3, 4, 6, 7, 8], 2, rng), [8, 7]);
    assert.deepEqual(
        ss.sample(["foo", "bar"], 1, rng),
        ["foo"],
        "non-number contents"
    );
    assert.deepEqual(ss.sample([1, 2, 3], -1, rng), [], "negative sample size");
    assert.deepEqual(ss.sample([1, 2, 3], -5, rng), [], "negative sample size");
});

it("sample with no rng", function () {
    const input = [1, 2, 3, 4, 5];
    const sampled = ss.sample(input, 3);
    assert.equal(sampled.length, 3);
    for (const val of sampled) {
        assert.equal(input.includes(val), true);
    }
});

it("sample with readonly array", function () {
    const input = Object.freeze([1, 2, 3, 4, 5]);
    const sampled = ss.sample(input, 2);
    assert.equal(sampled.length, 2);
});
