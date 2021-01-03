---
title: "Promise: The Misconceptions"
subtitle: "When does it fire? Is it really concurrent?"
icon: 😉
date: 2020-07-15T11:30:34.059Z
tags:
    - javascript
    - nodejs
    - promise
---

The Promise API and `async` `await` markers saved many develpers from callback hells and the uncertain states of asynchoronous tasks. In fact, it's a great relief that we are seeing many libraries wrapped around the promises api and even a global promisifier too!

But promises are confusing. It's like adding a new dimension(time) to JavaScript programming. I'd like to go over some of the questions I've had about promises and answer them with short code experiments.

## When does a promise fire?

The introduction of `async` and `await` was possibly the reason behind my confusion regarding the "trigger" of a promise-- the question of when a promise fires.

The two possible answers might be

1. Promise fires upon creation
2. Promise fires when `.then`, `.catch`, or `.finally` is chained

Traditionally, a promise can be created using the `new` constructor on the `Promise` class.

```javascript
---
header: true
---
const sleepone = new Promise((resolve, reject) => setTimeout(() => {resolve()}, 1000));
```

`sleepone` is a promise that will wait for a second after it's fired. We can test both cases by running `console.log` with apporpriate timings.

```javascript
---
header: true
---
const sleepone = new Promise((resolve, reject) => setTimeout(() => {resolve()}, 1000));
console.log(sleepone); // check that sleepone is not fulfilled
setTimeout(() => { console.log(sleepone) }, 1500) // check after 1500ms; is sleepone fulfilled?
```

In the test above I've given 500ms of grace range for the promise to fulfill, because we would expect some delay between resolution calls after the 1000ms timeout in the promise (assuming that the promise is fired upon creation).

If the promise is in fact fired upon creation, the second `console.log` call in the root level `setTimeout` would print a fulfilled promise value. If not, the `sleepone` promise should be unfulfilled.

The output of the code follows:

```shell
Promise {<pending>}
Promise {<fulfilled>: undefined}
```

So, the promise does fire upon its creation! Notice how there is no `.then` chain anywhere in the code (or even `await`) yet the promise is fulfilled.

## Can multiple promises run parallelly?

You've probably heard that JavaScript is single-threaded.

> JavaScript is a prototype-based, multi-paradigm, **single-threaded**, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.
>
> \- excerpt from https://developer.mozilla.org/en-US/docs/Web/JavaScript

But despite the fact that it is single threaded, it is able to achieve concurrency / run asynchronous tasks. How is it doing that? and can Promises work that way?

The formal answer to "How" is better explained in the [MDN documentation on concurrency model and event loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). But becuase I'll be focusing on actally implementing the parallel tasks, so maybe the explanation on MDN's documentation might be another blog post in the future.

Back to promises. So can multiple promises run parallelly?

By parallel, we are hoping to see multiple promises firing at the same time and taking about the same amount of time to resolve.
I've set up a test for doing this using the `PerformanceObserver` API and the timeout strategy used above. We'll be running multiple timeout promises at the same time, and if the promises do run parallelly, we would find out that the entire process of `sleep(k[0]...k[n])` only took `sleep(max(k[n]))`.

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
(async () => {
    performance.mark(`promises-fired`); //  assuming that that promises fire upon their "creation..."
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

I ran the script above on node(`12.14.1`) and got the following output:

```shell
❯ node parallel-promises.js
Promise 0 took 503.74822
Promise 1 took 1001.955327
Promise 2 took 1501.471417
Promise 3 took 2001.111917
Promise 4 took 2502.691675
Promise 5 took 3003.214379
Promise 6 took 3500.444121
Promise 7 took 4004.497067
Promise 8 took 4503.013412
Promise 9 took 5000.557767
All promises took 5000.698353
```

All promises took about the same time as the maximum sleep duration, 5000ms. That concludes our experiment! Promises do run parallelly.
