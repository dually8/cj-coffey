---
title: Let Me Gush About Gogs
tags:
  - git
  - server
  - ilovegogs
  - gogs
  - go
subtitle: I love this thing
date: 2016-10-20
draft: false
---


So, fairly recently, I needed to mirror a private git repository from an external site to an internal site. I searched the interwebs far and wide to try and figure out the best way to do this. I thought, "Perhaps I could just run a git instance on my team's build server? That way, the new guy can see the code until we get him the licenses he needs in order to use the external site." So, I scoured the net for the quickest or best way I could set up a git server. I looked at GitLab and a few other things around GitHub. I like GitLab. I use it for my own private repos, but the set up process seemed bulky for what I wanted. By all means, I would probably go that route if I needed something more scalable, but then I found [Gogs](https://gogs.io/) (or, Go Git Service). I fell in love immediately. I just downloaded the binary, put it on the build server, and ran `./gogs web`. BOOM! Working git server for my company.

![](/img/LetMeGushAboutGogs/img001.png)

Here's a list of repositories that are saved currently.

I think this thing is just amazing. It was super easy to mirror my external repo to the internal one.

![](/img/LetMeGushAboutGogs/img002.png)

I just threw it my credentials and the git url for it. Ba da boom, ba da bing, _mirrored_.

This thing has an issue tracker (not mirrored), tags, releases, web hooks, and so much more. If you need a super easy-to-use, easy-to-set-up git server, I 100% recommend this thing. 10/10 Would use again.

If you have any experience with [Gogs](https://gogs.io/), let me know in the comments below and tell me your thoughts!