---
layout: base.njk
title: home
eleventyImport:
    collections: ["posts"]
---

Welcome to my little corner of the internet! A place I've been trying to make for over a decade.

Read a little introduction on this website [here](/post/finally-a-beginning) and on me [here](/post/a-little-introduction).

{% set post = collections.posts | last %}
My most recent post was [{{ post.data.title }}]({{ post.url }}) published on {{ post.date | date }} using {{ post.data.using }}.