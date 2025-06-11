---
title: setting up wings behind two layers of proxies
date: 2025-05-24
using: VS Code on macOS
tags:
- pterodactyl
meta:
- pterodactyl
- wings
- proxy
- reverse proxy
- cloudflare
- setup
- npm
- nginx proxy manager
---

{{ bsmllh }}

I recently setup a personal instance of Pterodactyl + wings on my server, with both the panel and daemon webservers running behind an nginx reverse proxy (NPM) and then pointed to via proxied Cloudflare DNS. I knew that it was possible to run wings behind a reverse proxy and although I realise it's probably obvious in retrospective, I wasn't sure if it would also work even if there was two layers of proxying.

It's actually very easy to setup:
1. Setup the DNS record (Pterodactyl requires it before it allows you to create the node)
2. Create a node with the FQDN that you desire to use and enable SSL, make sure to use port 443
3. Make sure that the NPM instance has access to the wings instance - I had to make sure they were on the same docker network; setup the reverse proxy to port 443
4. Configure and boot up the wings daemon, wait a few seconds and you should see that lovely green heart

If anyone wants a more in-depth tutorial on setting this up, let me know and I'd gladly comply!
