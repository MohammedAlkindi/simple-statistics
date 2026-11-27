---
"simple-statistics": patch
---

Normalize deviations before powering in sampleSkewness and sampleKurtosis so extreme scales do not overflow or underflow to NaN.
