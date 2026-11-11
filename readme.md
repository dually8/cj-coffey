# cjcoffey.com

This repository holds the code that is [cjcoffey.com](https://cjcoffey.com). This site is built with Astro v7.

## Getting Started

0. Install [Vite+](https://viteplus.dev/guide/) (`vp`) to manage the project's Node.js and Bun versions.
1. Clone the repo and enter its directory
2. Run `vp env install` to install Node.js and Bun
3. Run `vp install --frozen-lockfile` to install the dependencies
4. Run `vp run dev` to run the dev server.
5. Run `vp run build` to build to the `/dist` folder.
6. Run `vp run preview` to build and run the preview server (serves up the contents of the `/dist` folder).

### Tip

Sometimes Astro can't find the collection anymore (no idea what's up with that). Most of the time, blowing away the follow directories and then re-building the site/re-running the dev server will fix it:

- `.astro`
- `dist`
- `node_modules`

#### Error Examples

<details>
<summary>Collection is empty error</summary>

```
The collection "blog" does not exist or is empty. Ensure a collection directory with this name exists.
```

</details>

<details>
<summary>Cannot destructure property error</summary>

```
11:29:21 [ERROR] Cannot destructure property 'title' of 'data' as it is undefined.
  Stack trace:
    at path\to\src\layouts\BlogPost.astro:17:9
```

</details>


## Resources

- [Animate.css](https://github.com/animate-css/animate.css/tree/main)
- [Astro docs](https://docs.astro.build/en/getting-started/)
- [Box Shadow Generator](https://web-toolbox.dev/en/tools/box-shadow-generator)
- [Iconify - Simple Icons](https://icon-sets.iconify.design/simple-icons/)
- [PicoCSS](https://picocss.com/)
- [Playwright](https://playwright.dev/docs/intro)
