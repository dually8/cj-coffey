---
title: "My Astro Experience"
date: 2025-03-23
draft: false
---

## TLDR

After getting over some odd hurdles, I really like the experience of using Astro. It really _really_ helps to start thinking more in plain ol' HTML, CSS, and JS terms than the "yet another JavaScript framework" terms. It's not like React/Vue/Svelte/Angular/etc. It's more so something like [Jekyll](https://jekyllrb.com/).

## Why a new site?

I think most of us like magic tricks. If I see someone pull a bunny out of a hat, I'll certainly applaud. One of my favorite professors in college used to tell us, "we don't use magic in programming." I had two previous iterations of this site, and both felt a bit too much like magic. I realize it was at least partially a skill issue, but making tweaks felt a bit cumbersome, so most of the design was left at the default template. I wanted a site that was [made with love, not magic](). I had heard about [Astro](https://astro.build/) before, and I heard many good things about it. During the planning phase, I struggled picking among a few options:

- [Astro](https://astro.build/)
- [Next.js](https://nextjs.org/)
- [Nuxt](https://nuxt.com/)
- [SvelteKit](https://svelte.dev/docs/kit/introduction)

As a seasoned React developer, Next.js, at least on the surface, felt like it would be the obvious choice. It has great templating, support for MDX, and more. However, I didn't want to burden my site with any extra JavaScript if I didn't have to. I think VueJS and Nuxt are neat, but I didn't have any experience with either, so it didn't make sense to use that if I wanted to hit the ground running. Plus, I don't believe it supports MDX, at least, at the time of the transition it didn't. That just left Astro and SvelteKit at that point. I'd made a site with SvelteKit before, and I mostly enjoyed it, but as I ready researching Astro, it sounded like it'd fit my use case a lot better. Heck, they even have a [blog starter template](https://vercel.com/templates/astro/astro-blog). So, that's where I started.

## What was the experience like?

Let's talk about the experience of using Astro. If you spend any time in the dev area on BlueSky or the bad site, you'll hear people absolutely raving about Astro. It's the greatest thing since sliced bread. I don't think I've seen one post talk negatively about Astro (though there are plenty on Next.js). If you're inundated with that kind of positive press, you might start to think that Astro will fix everything in your life. So, I set off to try and build this thing with Astro, though, I quickly realized Astro couldn't fix me.

### Good

Let's start with the good stuff. Clearly, Astro has a lot of love, and I think it's mostly warranted. It's not "yet another JavaScript framework", at least, I don't see it that way. It has _a lot_ of cool plugins and whatnot to help you build your site your way. I love that. There's two schools of thought when it comes to development: convention over configuration, and fine-grained control. Like most things, I think the best is somewhere in the middle, and that's where Astro fits in as well. As far as conventions go, Astro follows file-based routing and has an opinionated folder layout. For configuration, Astro has dozens of plugins and other integrations. It's a hodge podge of "bring your own <whatever>". You can build components using your favorite UI framework like React, Solid, Vue, Svelte, and more. It has integrations for things like Tailwind, MDX, Partytown, and others. I love this approach because you're not tied to any one way of doing things. I like rules, but I don't like constraints (if that makes sense). Astro does a really good job of balancing that sort of thing. It has really nice, easy-to-use CLI. It's certainly a pleasure to work with...for the most part.

### Bad

Okay, so, this part is certainly just my bad, but I want to mention it for anyone else like me that may have scrambled eggs for brains. _So_, one of the first things that tripped me up was coming to terms with the fact that this is _not another JavaScript framework_. What do I mean by that? So, you know when you're coding an Angular, React, or Svelte app and you can kind of mix-and-match some JavaScript with some HTML? You can't do that here. Let me provide an example. In the [index page for the list of blog posts](), I basically wanted to show a list of posts and let the user filter them out by the post's title and/or its tags. How would we do that in React? Fairly simple:


```tsx
import React, { useState } from 'react';

const SearchFilterComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const links = [
    { id: 1, text: 'Post 1', href: '/post1' },
    { id: 2, text: 'Post 2', href: '/post2' },
    { id: 3, text: 'Post 3', href: '/post3' },
    { id: 4, text: 'Post 4', href: '/post4' },
  ];

  const filteredLinks = links.filter((link) =>
    link.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredLinks.map((link) => (
          <a key={link.id} href={link.href} style={{ display: 'block', margin: '5px 0' }}>
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchFilterComponent;
```

and now in Svelte!

```svelte
<script>
  import { writable, derived } from '@svelte/store';

  // Create a writable store for the search term
  const searchTerm = writable('');

  // Define the list of links
  const links = [
    { id: 1, text: 'Post 1', href: '/post1' },
    { id: 2, text: 'Post 2', href: '/post2' },
    { id: 3, text: 'Post 3', href: '/post3' },
    { id: 4, text: 'Post 4', href: '/post4' },
  ];

  // Create a derived store for filtered links
  const filteredLinks = derived(searchTerm, ($searchTerm) =>
    links.filter((link) =>
      link.text.toLowerCase().includes($searchTerm.toLowerCase())
    )
  );
</script>

<div>
  <input
    type="text"
    placeholder="Search links..."
    use:bind={searchTerm}
    style="margin-bottom: 10px; padding: 5px; width: 200px;"
  />
  <div>
    {#each $filteredLinks as link}
      <a href={link.href}>
        {link.text}
      </a>
    {/each}
  </div>
</div>
```

See how we can just chuck in those filters straight in there? Can't do that with Astro. Absolutely _illegal_. Instead, you have to treat it more like plain ol' HTML and JavaScript. Astro will let you use JSX-like templating, but you _cannot_ shove any JS in there whatsoever. If you need JS, you have to create a separate `<script>` tag and work it like you would a [VanillaJS]() site. When I was first working through this, I was getting so mad and confused. _Why is this not working?!_ Well, Astro isn't like other girls, I don't know what to tell you. This girl is more like [Jekyll](https://jekyllrb.com/) than here other JS counterparts.

Again, definitely a skill and [RTFM](https://en.wikipedia.org/wiki/RTFM) issue on my part, but _why does no one talk about this???_.

### Ugly

I'll start with one issue that's [recently been fixed](https://github.com/withastro/astro/issues/12513). During the whole skill issue debacle, I was like "F this, I'm doing it in Svelte". So, I go to make this component that'll just be used for the post search piece, and, of course, it fails. You're supposed to be able to give Astro a [fallback component](https://docs.astro.build/en/reference/directives-reference/#display-loading-content) for when it's loading in a client component, but this component was never removed. I haven't tested the fix yet, but supposedly this has now been fixed. I just opted to use plain JS for it instead. Probably for the best.

Another issue I'm still running into is the "Collection is empty". It might be fixed in a newer version of Astro, but I'm currently running v5.1.1, and I am forced to blow away the `.astro` folder _every single time_ I start up the dev server. What a mess.

Similarly, I run into this issue where the `BlogPost` component can't read or destructure the `title` property from `Astro.props.data`? Again, I have to blow away my project and re-build it when this happens. At least, this one doesn't happen every time, but it's an annoying bug for sure.

## Conclusion

All in all, I've had a good experience using Astro. Would I use it for another project? Perhaps? I suppose it depends on the situation, because I'm a firm believer of using the right tool for the job. Astro has allowed me to create a site I'm much more proud of because I feel much closer to the code. There's a lot less magic happening, and while it's not as fast as something like [Hugo](https://gohugo.io/), I find the developer experience to be much nicer. This is now the third iteration of this site, and I think it's the best it's ever been. As an added bonus, I'll throw you a couple of images of and links to the previous iterations to show you where we've been vs. where we are now.

Thanks for taking the time to read this. I hope whoever you are, wherever you are, you're doing well. Stay safe out there, and I hope to see you again next time.

### Previous Site Iterations

Here's my first site. I used [Hexo](https://hexo.io/) for it _and_ [my wedding site](https://web.archive.org/web/20180825224332/https://twocoffeys.com/).

Archived link: https://web.archive.org/web/20171003200130/https://cjcoffey.com/

[![Image of the first iteration of my site](/img/my-astro-experience/super fun blog time circa 2017.jpg)](https://web.archive.org/web/20171003200130/https://cjcoffey.com/)

This is the second iteration of the site. I used Hugo to build it.

Archived link: https://web.archive.org/web/20240603085251/https://cjcoffey.com/

[![Image of the second iteration of my site](/img/my-astro-experience/my site circa 2024.jpg)](https://web.archive.org/web/20240603085251/https://cjcoffey.com/)


## Other updates

I recently started a new project, the [Tamadachi Egg Price Tracker](https://github.com/dually8/tamadachi-egg-tracker). This project was born out of the current [eggflation](https://www.usatoday.com/story/graphics/2025/02/04/egg-price-increase-history/78063370007/) going on. My wife does most of the grocery shopping, and she often goes to a few different stores to get everything we need. The problem she would run into is that some stores would sell eggs cheaper than the others, but it wasn't until she'd already purchased eggs from one of the more expensive stores that she'd run into some that were less expensive. My goal here was to run a cron job on my desktop to check egg prices every few days and put that information in a site I can host locally at home. That way, we could check to see who sells them the cheapest before making the mistake of buying the more expensive eggs while out shopping. I also wanted to be able to track prices over time so we can try and see trends. So far, this project is roughly a week old, so I don't have much data to compare against, but I have seen a couple of price drops in that time, so that's been neat to see. The site still needs a lot of work done on the UI front because I want to make something that appeals to my wife's aesthetic. Functionally speaking, it's more or less where I want it to be.

Here's a screenshot of what it looks like at the time of writing.

![Image of application showing egg prices and charts](/img/my-astro-experience/egg-price-tracker.png)
