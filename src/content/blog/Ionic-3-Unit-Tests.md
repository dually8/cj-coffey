---
title: Ionic 3 Unit Tests
date: 1900-01-01
tags: [ionic, angular, tutorial, unit test, firebase]
draft: true
---

# Ionic 3 Unit Test Update

> Disclaimer: Since I've been baptised by React, I've become rather opionated on the topic of Angular. Please excuse me when I start to rant. :)

> GitHub repo for this tutorial at https://github.com/dually8/Ionic3-Workshop

I (relatively) recently got a request to update my Ionic 2 workshop to Ionic 3/Angular 4, so, since work has been slow,
I decided to give it a go. I want to preface this saying a few things though.

1. I have mostly abandoned ionic/angular as of late. The whole "breaking changes in between release candidates" and not-so-good communication kind of turned me off to it/them.
2. During the bitter moments I had with angular/ionic, I decided to see what was up with React/React Native since I kept reading such good things about them.
3. I fell in love with the React library and community and haven't really looked back since.

Having said all that, I think it's important to stay up-to-date with everything regardless of whether or not I dislike the technology, so, here I am.

I'd like to keep this post brief since not a whole lot has changed between Ionic 2 -> 3 and Angular 2 -> (what happened to 3?) -> 4. The majority of the content you need to know is in the previous post, and because I'm lazy, and, if you're a programmer, you probably are too, I'm not going to re-write the same things again. Instead, I'll just cover the differences I saw between the two.

## The App Itself

Once of the first things I noticed between the Ionic 2 beta and the Ionic 3 (stable?) was the `app.module.ts` (located in `src/app/`). From what I could tell, this is where you make your superhero sandwich of imports, providers, etc. Basically, everything you're ever going to use ever is declared here [1].

Another new thing is the `IonicPage` decorator (which you may read more about [here](https://ionicframework.com/docs/api/navigation/IonicPage/)). It's basically another layer on top of the `Component` that allows for registration with the `NavController` (TLDR - It works with `NavController` to do navigation stuff). In this particular project, I haven't had the need to pass it any arguments, but you're able to do things like rename the component, set its url path, etc. I find it rather handy, especially when it comes to using an ionic app in your browser.

One thing I noticed (perhaps a bug in ionic?) is that I wasn't able to combine my login modal with the upload page. I had to make a separate component for that (easy thanks to ionic/angular generators). Though, it was frustrating at first. Perhaps it was better to separate those things anyway.

Not much else has changed in regards to creating the app. I was basically able to copy/paste most everything. If you have any questions regarding any of the migration, I'd be happy to answer it in the comments below (or even make another blog post about it if it comes to that).

## The Unit Tests

First off, _major_ applause to the angular team for finally coming up with a standard way to unit test. When I was writing the first workshop, that stuff was _way_ up in the air and changing all the time. So, props to you guys out there at angular for making a standard set of testing practices. Thanks.

Quite a lot has changed in regards to the actual testing part, so I'll try to break it up a bit.

### Test Config



### Page Unit Tests

### Provider/Service Unit Tests

## Notes

1. Why on earth would you do this? This has basically become the new `references.d.ts` you'd keep in TypeScript v1 projects. What a mess! This is going to get _really_ bad when it comes to enterprise applications.
  - We use Angular 4 at work and it is a _nightmare_ seeing over 9000 lines of code that basically does nothing.