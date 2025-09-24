---
title: "Making a Raspberry Pi Server"
date: 2025-09-24
draft: false
tags: ["raspberry pi", "docker", "nginx", "nextjs"]
---

## TLDR

I got a Raspberry Pi running some neat things on my local network.

---

## The Problem

I've been working on and off on this [egg price tracker](https://github.com/dually8/tamadachi-egg-tracker) project for a few months. I have a cron job on my windows machine that will check prices for my local area and add those price checks to a local SQLite database. When I want to see the price trends or the current prices, I need to open a terminal, navigate to my app, and run it. When I am done looking at things, I shut it down. I do many other things on this machine, and I can't have this thing running in the background constantly. I don't want to push it onto a VPS or some other cloud hosted solution either, because I need another subscription like I need another hole in my head. I want to be able to check prices whenever I want, but I don't want to spend any (more) money, nor do I want it to constantly run on my personal PC. What should I do?

## The Solution

Oh, I know, I have a Raspberry Pi that recently got dethroned as my emulation station once my [MiSTer](https://retroremake.co/pages/store) and [Steam Deck](https://store.steampowered.com/steamdeck) took those responsibilities over. It's just been collecting dust at this point, so why not put it to use? I'll set this up in the basement with my other networking things so that it doesn't take up space in my office, and I'll put everything I need on it in order to get some web projects up and running. What shall we do first?

## What you will need

Consider this your ingredient list in order to make something like this.

- A Raspberry Pi (version 4 or 5 -- I'm using v4 with 8GB of RAM)
- A router with configurable DNS settings (I'm using a Ubiquiti Dream Machine Pro)
    - There are other ways around this step, but I won't be going into it here.
- A little bit of docker knowledge

### Architecture

I've had a rocky relationship with Docker. It's not been the easiest thing to grasp, and I still don't find it very intuitive. Luckily, we have ChatGPT and Claude now, so getting examples and explanations for things is _way_ easier. Let's see, how do I want this to look? How about this? We'll use docker compose to build out an nginx server that will act as a reverse proxy to ship us the content we want based on the URL we request. Here's a flow chart of what this would look like.

![structure](/img/making-a-raspberry-pi-server/structure.svg)

Then, I can go into my router's settings and setup a local DNS entry to point a URL to the Raspberry Pi. Shoutout to Ubiquiti for making this so easy.

![local dns](/img/making-a-raspberry-pi-server/pi-dns.png)

Essentially, I want to do something like:

- Type in my browser `http://mypi.local/my-app`
- Have my local network DNS handle where this goes (i.e., go to the Pi in this situation)
- Have the Pi see the incoming request and route me to the proper place
  - In this case, I want to see my egg tracker app

I want to use a specific `/path` here because I want to be able to host more than one application on the Pi. I should be able to manage that via nginx.

### The Setup

In order to get this working, I first needed to get docker running on the Pi. I just followed a [tutorial online](https://raspberrytips.com/docker-on-raspberry-pi/) to get that going. Next, I needed to get a `docker-compose.yml` file going that would orchestrate the whole thing so that I only needed to run one or two commands instead of several. Below is what I ended up with.

```
.
├── docker-compose.yml
├── nginx
│   ├── default.conf
│   └── Dockerfile
└── tamadachi-egg-tracker
    ├── Dockerfile
    ├── local.db
    ├── etc...
```

I had a parent folder that would contain the docker compose file, and two directories that would be my "apps" for said compose file. One of these would be nginx. Nginx would manage the incoming connections and handle routing the user to the proper app. Next would be my egg tracker app. Here's what this looks like all together:

```
# docker-compose.yml
services:
  eggtracker:
    container_name: tamadachi-egg-tracker
    build:
      context: ./tamadachi-egg-tracker
      args:
        NODE_ENV: production
        NEXT_PUBLIC_BASE_PATH: /tamadachi-egg-tracker
        DB_FILE_NAME: /app/local.db
    environment:
      NODE_ENV: production
      DB_FILE_NAME: /app/local.db
    restart: unless-stopped
    ports:
      - 3000:3000
    volumes:
      # This will link the outside sqlite database with the internal one
      # so that any changes we make outside will be seen inside the container
      # Replace /path/to/... with the actual and full path to the db file
      - /path/to/tamadachi-egg-tracker/local.db:/app/local.db:rw

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - eggtracker
    restart: unless-stopped
```

```
# default.conf for nginx
upstream tamadachi-egg-tracker {
	server tamadachi-egg-tracker:3000;
}

server {
	listen 80;
  # Adjust the value here (rpi.home) to match your own local DNS entry
	server_name rpi.home;

	location /tamadachi-egg-tracker/ {
		proxy_pass http://tamadachi-egg-tracker;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_set_header X-Forwarded-Prefix /tamadachi-egg-tracker;
	}

	# Optional: Root redirect
	location = / {
		return 301 /tamadachi-egg-tracker/;
	}
}
```

Next thing to do is to just run `docker compose up -d --build` and we're up and running.

And, _voila!_

![result on my local network](/img/making-a-raspberry-pi-server/rpi-home.png)

There we have my Next.js egg tracker app running on my Raspberry Pi at home. No VPS. No subscription. Just a few tears and minor desk banging to get it working.

## Conclusion and follow up

I've had this running for a little while now, and it's been working well. Looking up the latest egg prices is much easier now that I can look at the site on my phone or iPad now. It's also made sharing results with my wife much easier since she has access to the site as well. I've since added [FreshRSS](https://www.freshrss.org/) on top of it, so now I can go to `http://rpi.home/freshrss` to get the latest from my favorite RSS-enabled sites (including [this one](https://cjcoffey.com/rss.xml) 😄). Side note on that, I've really enjoyed the stripped back experience of using an RSS reader. No ads, no filler, just the content. It's been a nice change of pace from doom-scrolling.

You may be wondering how the Raspberry Pi is getting price updates since the price checker is still running on my own machine. I actually have a cron job that runs right after the price checks that pushes the database updates to the Pi. While I could technically just run the price checks on the Pi, there are a couple of things stopping me right now.

1. I use Edge for price checks because Playwright's downloaded browser binaries are more sandboxed from the OS. While this isolation is generally a good security feature, I need consistent location services and user agent behavior for my price scraping to work reliably.
2. This ties in with 1, but I haven't gotten the price checks to consistently work on the Pi. There are several reasons for this, one being that playwright just hasn't played nicely with the Pi for the time being.

So, we're still using my own machine for price checks at the moment. This is fine by me because I have another cron job that checks interest rates and sends me updates via Discord. Side note, I'm doing this because I got mega screwed over by interest rates when buying my house in 2023, so I'm looking to refinance as soon as interest rates are a bit more reasonable. Hopefully I'll get lucky and get one of those 2% rates we got in 2020-2021 🤞 (_HIGHLY UNLIKELY_).

If I stumble upon anything else fun to do with this setup, I'll update this post, but until next time, thanks for reading. I hope you enjoyed, and if you pursue something like this, let me know if you found this post helpful. My goal in writing this was to hopefully help someone else in a similar situation, because I wasn't finding much online regarding this specific setup. If you have any questions, feel free to write me in the comments below, or shoot me a message on [BlueSky](https://bsky.app/profile/cjcoffey.com). Take care ✌
