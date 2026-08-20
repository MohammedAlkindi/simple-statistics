---
"simple-statistics": patch
---

Stop `geometricMean` returning `Infinity` or `0` for inputs whose geometric mean is perfectly representable. The running product is accumulated before the nth root is taken, so it leaves double range long before the answer does: 500 copies of `1e10` overflowed to `Infinity` and 500 copies of `1e-10` flushed to `0`, although both means are the input value itself. When the product overflows or underflows, the calculation now falls back to the log-space form already in the library as `logAverage`. Products that stay in range are untouched, so every previously correct result keeps its exact value.
