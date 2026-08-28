---
"simple-statistics": minor
---

Fix `tTest()` computing the one-sample t statistic with the population standard deviation rather than the sample standard deviation. `standardDeviation` divides the sum of squared deviations by `n`, but the one-sample t statistic on the Wikipedia page this function's own JSDoc links to — and what R's `t.test()` and `scipy.stats.ttest_1samp` compute — divides by the Bessel-corrected sample standard deviation. `tTestTwoSample` already uses `sampleVariance`, so the two halves of the same test disagreed.

NOTE: this is tagged as a minor change, following `poissonDistribution`/`binomialDistribution` in 7.10.0, but it does change behavior for `tTest`.

1. The returned statistic is smaller in magnitude for the same input: the old value divided by `sqrt(n / (n - 1))`, which is about 9.5% at `n = 6` and 22% at `n = 3`. `tTest([1, 2, 3, 4, 5, 6], 3.385)` returns `0.15057034426283503` rather than `0.1649415480881466`. Because the old statistic was inflated, a p-value looked up against a t distribution with `n - 1` degrees of freedom was too small, which overstated significance — the error was largest for the small samples a t-test is normally used on.
2. A sample of fewer than two data points now throws `sampleVariance requires at least two data points` instead of returning `Infinity`. One value leaves no degrees of freedom, so the old return was a division by a zero standard deviation rather than a result.
