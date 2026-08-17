---
"simple-statistics": minor
---

`linearRegression()` now also returns `r`, the Pearson correlation coefficient of the input data, alongside the existing `m` and `b`. `r` is computed via `sampleCorrelation` so the library gives one answer for that quantity, and is `NaN` where the correlation is undefined (a single point, or data with no variance in `x` or `y`).
