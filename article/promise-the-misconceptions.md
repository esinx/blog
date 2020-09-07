---
title: "Promise: The Misconceptions"
date: 2020-07-15T11:30:34.059Z
tags:
    - javascript
    - nodejs
    - promise
---

The Promise API and `async` `await` markers saved many develpers from callback hells and the uncertain states of asynchoronous tasks. In fact, it's a great relief that we are seeing many libraries wrapped around the promises api and even a global promisifier too!

## When does a promise fire?

The introduction of `async` and `await` was possibly the reason behind my confusion regarding the "trigger" of a promise-- the question of when a promise fires.

But from the experiment below, everything becomes quite clear.

```javascript
---
header: true
footer: true
---
const { performance, PerformanceObserver } = require("perf_hooks");
const obs = new PerformanceObserver((items) => {
    items.getEntries().forEach((item) => {
        console.log(item.name, item.duration);
    });
});
obs.observe({ entryTypes: ["measure"] });
// the lines above are for nodejs environments only

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const times = Array(10)
    .fill(0)
    .map((_, idx) => (idx + 1) * 500);
const promises = times.map(
    (time, idx) =>
        new Promise((resolve) => {
            performance.mark(`promise-${idx}-fired`);
            setTimeout(() => {
                performance.mark(`promise-${idx}-resolved`);
                resolve();
            }, time);
        })
);
performance.mark(`promises-fired`); //  assuming that that promises fire upon their "creation..."
(async () => {
    await sleep(1000);
    // performance.mark(`promises-fired`); //  assuming that that promises fire upon their "then calls"
    Promise.all(promises).then(() => {
        performance.mark(`promises-resolved`);
        times.forEach((_, idx) =>
            performance.measure(
                `Promise ${idx} took`,
                `promise-${idx}-fired`,
                `promise-${idx}-resolved`
            )
        );
        performance.measure(`All promises took`, `promises-fired`, `promises-resolved`);
        // for browser environments
        if (performance.getEntriesByType) {
            // from https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure
            // Pull out all of the measurements.
            performance.getEntriesByType("measure").forEach((measure) => {
                console.log(measure.name, measure.duration);
            });
            // Finally, clean up the entries.
            performance.clearMarks();
            performance.clearMeasures();
        }
    });
})();
```
