---
title: "Dev Log Series Part 3"
date: 2023-11-18
tags: ["godot", "devlog"]
draft: false
---

## TLDR

I finished the courses and now I'm moving on to other micro projects until I feel more comfortable doing bigger projects.


## The First Leg of the Journey

Welcome back, readers. I've finally finished all of the [courses](https://academy.zenva.com/course/humble-godot-2023-bundle-tier-3/) from that Humble Bundle I mentioned in the previous blog. I feel much more confident in my abilities now.

![](/img/DevLog3/Dunning-Kruger-Effect.png)

I'm currently at the _Peak of "Mount Stupid"_. Of course, I still have a long way to go, but I've gotten enough reps in at this point that I don't feel completely lost when trying to do something.

I've completed all [16 courses](https://github.com/dually8/godot-projects/issues/2) that were included with that bundle now. Most were related to the [Godot game engine](https://godotengine.org/), but some touched things like [Blender](https://www.blender.org/) as well as pixel art. I wouldn't consider myself an expert in any of these things now, but I do feel much more comfortable with them than I did before. Still, I feel a wall starting to form around me again. The programming part has never really been an issue to me. Not to toot my own horn, but 📯 _doot doot_, I'm pretty good at programming. It's everything else that seems to slow me down and create that struggle. Things like creating models, sprites, music, levels, animations, etc. take up so much more of my time. I feel like I'm one guy trying to play every instrument at the same time while performing [Beethoven's 5th](https://www.youtube.com/watch?v=IvrzJ8uH1PI). I'm struggling with it, but I know it will become easier over time the more I do it. Props to people like [ConcernedApe](https://en.wikipedia.org/wiki/Eric_Barone_(developer)) and [Toby Fox](https://en.wikipedia.org/wiki/Toby_Fox) that can evidently do it all.

## The Courses

### The Good

Let's start with the good stuff. I really like the length of the courses. All of them were roughly an hour long in terms of video length. Of course, you have to pause and go back while watching them, as you would for any course I imagine. So the hour runtime doesn't really tell the full story here. Rather, I think the condensed nature of them helped make things much more digestible, even if it may have sacrificed a bit of substance. Everything was explained well, at least, to me. I had no trouble following along at any point during my time with the courses. Completing everything gave me the confidence to go out and try new things. Having this kind of course structure helped start me in the right direction, so I'm excited for the next step of my journey.

### The Bad

There's an opposite end to everything. For every good, a bad. For every yin, a yang. Likewise here, there are some spots that stand out. For one, why did we never discuss creating a pause menu? I feel like that's something in every game. It's essential to the user experience. Of course, I went out to YouTube to find a few videos to help explain how to create one. I can't just _not_ know something so essential, but I ran into the same situations I've ran into before when using YouTube for essential knowledge. Each video I watched showed a completely different way to implement it. Now, I know, as a seasoned coder, there's more than one way to code a cat, but I'd rather do it the [Gang of Four](https://www.geeksforgeeks.org/gang-of-four-gof-design-patterns/#) way than the [YandereDev](https://i.redd.it/kaw54c8g7hx71.jpg) way. If I'm a newbie to this, how am I supposed to know which is which? I ended up going with the way _I_ thought was most easy/intuitive, but I could have screwed up. I'm obsessed with best practices, and I feel icky if I don't follow them. Speaking of best practices...

### The Ugly

Let me preface this by saying a couple of things. 1) I know this is a beginner's course, so following all of the design patterns may be a bit overwhelming or unnecessary. 2) I'm well aware (at least after 10+ hours) that GDScript may not (easily) allow us to implement and utilize some of these design patterns (see [this entire Scripts folder](https://github.com/dually8/godot-projects/tree/main/StrategyGame/Scripts)). But _oh my god_ was this painful. Why are these functions _so long_? Why is there no separations of concern? Why are there so many nested if statements? _Surely_ there are better ways out there! I did my best during these courses to right the wrongs I felt were being inflicted, but I could only do so much with my limited knowledge. I'm glad I have an engineering background, otherwise this code would look much worse. I ended up buying two books in the middle of taking these courses. One was [Game Programming Patterns](http://gameprogrammingpatterns.com/) and another was [Godot 4 Game Development Cookbook](https://www.amazon.com/dp/B0BZDMM3P9/). I haven't gone through either of these yet, but just skimming them told me that I'd be in a better spot if I gave them a proper read. For the last course I went through, I downloaded the .NET build of Godot so I could code in C#. I thought, perhaps if I have a more structured and statictly typed language, I could do better. Granted, I don't have the time with this build that I do with regular ol' GDScript, but I immediately felt more at home while coding. I knew I had the tools available to me to 1) write unit tests, and 2) _create interfaces_. Oh my lord! How novel! Interfaces! Regardless of what language these new books throw at me, I at least have the ability to translate them now. My one piece of feedback for these Godot courses is just this: please don't sacrifice best practices for time's sake. It's just going to hurt us all in the long run.

## Next Steps

Okay, so now what? I've finished the courses, but I'm left wondering what exactly to do next. I have some ideas, but I'm not 100% sure where to start. Perhaps I'll take a look at these books I have now and focus on that? But I also don't want to accidentally lose what I learned during these courses. I think I'm going to have to split my time between the cookbook and just making something on my own. My initial idea is to re-create a level from an NES game (perhaps Castlevania?), but I'm not 100% certain. I'll continue to use the [monorepo](https://github.com/dually8/godot-projects) for this work so you can follow along. I need help, though. I'm not an artist, and I'm not a designer by any stretch of the imagination. I'm not what you'd call an "ideas guy". I'm a worker bee, and I do the work (programming in this situation). Let me know your ideas. Please either leave me a comment below or [open an issue](https://github.com/dually8/godot-projects/issues/new) with your request on GitHub. I want to hear it.

## Conclusion

I'm glad I took these courses. They've help push me forward on this journey. I regret nothing. But, it's time to put this axe to the grind. I want to get better at this because this is important to me. [Shigeru Miyamoto](https://en.wikipedia.org/wiki/Shigeru_Miyamoto) was my first hero as a kid. I remember so vividly learning about him while reading [Nintendo Power Magazine](https://en.wikipedia.org/wiki/Nintendo_Power) back in 1998. All I knew at the time was that he made my favorite games, and I wanted to do what he did. I know I'll never reach his or his contemporaries' level, but it's something to reach for. Thank you for taking the time to read this. Please feel free to leave a comment below. I'd love to hear your thoughts. Take care ✌.

## Links

- [Godot Game Engine](https://godotengine.org/)
- [Course List](https://academy.zenva.com/course/humble-godot-2023-bundle-tier-3/)
- [My Godot Projects Monorepo](https://github.com/dually8/godot-projects)