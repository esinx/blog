# esinx/sapper-template

This is a modified version of the `sveltejs/sapper-template` repo, which you should use with `degit` to start a project.

## Getting started

```bash
npx degit "esinx/sapper-template" project-name
```

## Features

### Sass

Use `<style lang="scss">` to use sass.

### Alias

`#components` is an alias of `src/components`. So you could do the following:

```js
import MyComponent from "#components/my-component.svelte";
```

Aliasing is done using [link-module-alias](https://github.com/Rush/link-module-alias).

Run `npm install` if anything breaks.

### Server Side Features

Unlike the original template, this template uses express and has `body-parser` and `cookie-parser` built-in.
