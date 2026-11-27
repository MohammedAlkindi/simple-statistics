---
"simple-statistics": patch
---

Normalize shifted values by data spread in ckmeans and jenks so extreme large, extreme small, and overflowing ranges avoid Infinity and zero underflow when squaring deviations.
