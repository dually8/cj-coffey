---
title: "New Stuff I Want To Talk About"
date: 2024-05-18
draft: false
---

Man, life comes at your first, doesn't it? Sorry it's been a minute, but welcome back! In this post, I wanted to talk about a few random things I've stumbled upon and learned about recently. Technology moves fast, and I feel like I was out of the JavaScript bubble just long enough to miss a few key things. I really wish there was some kind of newsletter or something I could read so I can better keep up-to-date with things. Having said all that, let's dive into things.

## [tsx][tsx]

I code in almost exclusively typescript. If I can get away without having to compile to JavaScript first, then I will. I used to use [ts-node](https://www.npmjs.com/package/ts-node) for this kind of thing, but a lot of the time (recently anyway), it gets in the way more than it helps. I mostly want to use types where _I_ want to use them. I found ts-node to be a bit too strict most of the time. After some debugging and searching, I ended up finding out about tsx. tsx has been a great alternative that "just works". I don't really worry about needing some kind of `tsconfig.json` file in the root of my project or if I'm just using it kind of willy nilly in-line. It's become a mainstay for all of my "just messing around" projects now.

### Example

```javascript
// sum.ts
function sum(a: number, b: number) {
  return a + b;
}
console.log(sum(1,2));
```

```bash
tsx sum.ts
# => 3
```

## [Mutation Observer][mut-ob]

Evidently this has been around for a _long_ time at this point, but I only found out about it recently. If you don't know, basically, you can observe a DOM node for changes and do something with that information in a callback. I imagine this would be a great tool if you're running [Vanilla JS](http://vanilla-js.com/) and need to monitor the interactivity of your site. I think this kind of thing is mostly taken care of by the various JavaScript frameworks out there, but I'm curious which ones, if any, are using this API behind the scenes.

[Link to example](https://javascript.info/mutation-observer)

## [queueMicrotask][queue-microtask]

Evidently, this one was released in 2018 and no one told me. I wish I had known back then, because I feel like it would have made a difference in my life. This API allows you to add a task to the microtask queue of your browser. It's a non-UI blocking call, so it's really good for those smaller, background tasks where you may need to update some UI piece but still need to let the user be free to use your site. I stumbled upon this while watching [this JS Visualized video by Lydia Hallie](https://www.youtube.com/watch?v=eiC58R16hb8). It's a really great video, and I wish it was something I could have watched a long time ago when I was starting my foray into the JS world.


### Example

Let's say you're using Vanilla JS and `fetch` to update some UI bits.

```html
<div class="card">
  <figure>
    <img id="avatar" src="/my-pic.jpg" alt="Me" />
  </figure>
  <div class="card-body">
    <h2 id="name" class="card-title">Steve</h2>
    <p id="description">Likes pina coladas</p>
  </div>
</div>
```

```javascript
function updateUI(data) {
    // Update the user's name
    document.getElementById('name').textContent = data.name;

    // Queue the next update
    queueMicrotask(() => {
        // Update the user's email
        document.getElementById('description').textContent = data.description;

        // Queue the final update
        queueMicrotask(() => {
            // Display the user's avatar
            document.getElementById('avatar').src = data.avatarUrl;

            // Optionally, log completion or trigger further actions
            console.log("User profile updated successfully.");
        });
    });
}
async function fetchData() {
    // Simulate an async operation like fetching data from a server
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    return { name: "Yuki", description: "Likes katsu curry", avatarUrl: "yuki.jpg" };
}

async function main() {
  const data = await fetchData();
  updateUI(data);
}

main();
```

## [Bun][bun]

I was pretty excited when Bun was announced. It seemed like it was helping to push the JS community forward. Problem was, I am a Windows user, and Bun wasn't supported when it was released. However, since v1.1, we have official Windows support! Yay! I've been using this heavily where I was using python before. Things like web scraping and little demos and whatnot have been pretty quick to put together. I really like its API, and it's super fast too, which is nice. I look forward to see where this goes in the future.

## [Playwright][playwright] (as a web scraper)

This kind of goes together with Bun and tsx, but I've recently traded python and selenium for Playwright. It's so easy to get setup and going, and the codegen thing comes in super handy. I've been able to quickly write stock checkers for several things using it. It's a breeze to learn and pairing it up with Bun (if it works; tsx and Node if Bun doesn't) has made for super quick and handy weekend projects. I'll show off some sample code below if you're interested in trying it out for yourself.

### Example

Here's a snippet of an interest rate checker. I run it once per day to watch the interest rates in the US. I used [discord.js][discordjs] to notify myself when something is in stock.

```javascript
import playwright from 'playwright';

const url = 'https://www.usbank.com/home-loans/refinance/refinance-rates.html';
const minRate = 6.0;

export async function checkInterestRate(headless = true) {
  const browser = await playwright.firefox.launch({
    headless,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);
  await page.locator('#stateName').fill('YOUR_STATE');
  await page.locator('#getRates').click();
  const rateStr = await page.locator('#Conventional')
    .locator('.rateConventional30')
    .evaluateAll((nodes) => {
      const visibleElement = nodes.find(el => el.checkVisibility());
      if (!visibleElement) return '';
      return visibleElement.textContent?.trim();
    });
  console.log(`Rate on usabank is: ${rateStr}`);
  const rate = Number(rateStr?.split('%')[0]);
  if (isNaN(rate)) throw new Error('Could not parse rate');
  if (rate < minRate) sendDiscordMessage(`Rate is below ${minRate}!`);
  await browser.close();
}
```

## Conclusion

Thanks for reading. I hope you learned some new things. The next section is just a life update kind of thing, so feel free to skip if you don't care about that kind of thing.

### Life Updates

The start of this year wasn't good to me, so I've had to cut back on a lot of fun things that I wanted to do. Things are a bit better now, but there's still a lot to adjust to and whatnot. My game dev adventures are on pause until I can find some more time for it. I've been learning Japanese on-and-off for a few years now, and I'm off again until I can get my mental health back in check. Google killed their domains and moved everything to Squarespace, so I've been navigating that mess recently too. I used this URL as an email forward to my Gmail account, and it still technically works now that it's in Squarespace, but I don't know when that might end. If you have any suggestions for a good domain registrar that I can use to forward emails to my gmail email, then please let me know. I'd love to hear from you.

In other news, I made a neat new site, [NES Cart Browser][nes-carts]. It let's you browse all of the NES games by their cartridge art. It was a neat little project that came to me while I was sleeping, and it helped me learn [Svelte(Kit)](https://kit.svelte.dev/), so that was nice too. I'm still waiting to see what I'm going to do about re-working this site using something like [Astro](https://astro.build/), SvelteKit, or something else. Maybe someday lol. Thanks again for reading. I hope you have a good rest of your day ♥.

[tsx]: https://www.npmjs.com/package/tsx
[queue-microtask]: https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask
[mut-ob]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
[bun]: https://bun.sh/
[deno]: https://deno.com/
[playwright]: https://playwright.dev/
[discordjs]: https://www.npmjs.com/package/discord.js
[nes-carts]: https://dually8.github.io/nes-cart-browser/