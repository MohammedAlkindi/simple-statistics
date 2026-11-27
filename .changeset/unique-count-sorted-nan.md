---
"simple-statistics": patch
---

Treat consecutive NaN values as a single unique entry in uniqueCountSorted so repeated NaNs are not counted separately.
