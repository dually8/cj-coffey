# My Hugo Site

## Getting Started

1. Install [hugo-extended](https://gohugo.io/getting-started/installing)
2. Run `hugo server` to start the dev server
   1. You can add the `-D` argument to show drafts
3. Run `hugo` to build the site to the `/public` directory.

**Optional**:

1. Install NodeJS
2. Run `npm ci`
3. Run
   1. `npm run start:dev` to run with drafts enabled
   2. `npm run start` to run with drafts disabled
   3. `npm run clear-public` to clear the `/public` directory
   4. `npm run build` to build the `/public` directory

## New Posts

- Run `hugo new posts/name-for-post.md` to create a new post file

## Directory Structure

> From [Directory Structure](https://gohugo.io/getting-started/directory-structure/)

- `archetypes`
  - You can create new content files in Hugo using the hugo new command. By default, Hugo will create new content files with at least date, title (inferred from the file name), and draft = true. This saves time and promotes consistency for sites using multiple content types. You can create your own archetypes with custom preconfigured front matter fields as well.
- `assets`
    - Stores all the files which need be processed by Hugo Pipes. Only the files whose .Permalink or .RelPermalink are used will be published to the public directory. Note: assets directory is not created by default.
- `config`
    - Hugo ships with a large number of configuration directives. The config directory is where those directives are stored as JSON, YAML, or TOML files. Every root setting object can stand as its own file and structured by environments. Projects with minimal settings and no need for environment awareness can use a single config.toml file at its root.

_Many sites may need little to no configuration, but Hugo ships with a large number of configuration directives for more granular directions on how you want Hugo to build your website. **Note**: config directory is not created by default._

- `content`
    - All content for your website will live inside this directory. Each top-level folder in Hugo is considered a content section. For example, if your site has three main sections—blog, articles, and tutorials—you will have three directories at content/blog, content/articles, and content/tutorials. Hugo uses sections to assign default content types.
- `data`
    - This directory is used to store configuration files that can be used by Hugo when generating your website. You can write these files in YAML, JSON, or TOML format. In addition to the files you add to this folder, you can also create data templates that pull from dynamic content.
- `layouts`
    - Stores templates in the form of .html files that specify how views of your content will be rendered into a static website. Templates include list pages, your homepage, taxonomy templates, partials, single page templates, and more.
- `static`
    - Stores all the static content: images, CSS, JavaScript, etc. When Hugo builds your site, all assets inside your static directory are copied over as-is. A good example of using the static folder is for verifying site ownership on Google Search Console, where you want Hugo to copy over a complete HTML file without modifying its content.

- `resources`
    - Caches some files to speed up generation. Can be also used by template authors to distribute built SASS files, so you don’t have to have the preprocessor installed. Note: resources directory is not created by default.

## Further Reading

- [Hugo](https://gohugo.io/getting-started/quick-start/)
- [Directory Structure](https://gohugo.io/getting-started/directory-structure/)