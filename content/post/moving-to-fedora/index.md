---
title: moving to Fedora
date: 2025-06-15
using: VS Code on Fedora 42
tags:
- dunyā
- fedora
meta:
- fedora
- debian
- ubuntu
- alpine
- asahi
- linux
---

{{ bsmllh }}

I can't remember what sparked it, but I had a sudden urge and desire to start using Linux as my daily driver. 

This urge led me to reflection on the distros I've been using of late which have primarily been Debian-based (Ubuntu and Debian mainly) or Alpine. The Debian-based distros are great for community, support and stability but are really far behind on versions of tools and softwares. Alpine lacks that community and support but if you're using edge, then software/tools are generally quite up-to-date; there is also the occasional compatibility issue with Alpine due to musl. These slight drawbacks led me to research what other people are choosing as their daily driver distro and a common occurence was: Fedora. Although I had dabbled with a bunch of other distros such as Arch, Kali and CentOS (this was actually my introduction to Linux), I had never actually tried Fedora because ever since leaving CentOS I've kind strayed away from Red Hat and thought that any of the Red Hat distros would be very much akin to CentOS. What I was reading about Fedora, made a lot of sense and appealed to me so I decided to give it a go. I spun up a Fedora 42 Workstation VM in VMWare Fusion on my MBP, because unfortunately I just don't have any computers which would be well-supported by Linux; although I'm planning to fix that with my next laptop {{ nshllh }}.

After about a weeks use, I was sold. Tools and third-party software being up-to-date was/is a breeze of fresh air after working with Ubuntu for so long. DNF is great, and honestly not all too different from APT - in fact, I think I might even find it easier to use. So, I had decided that Fedora would be the distro I run on my next daily driver since it wasn't exactly feasible to run it through a VM all the time and none of the computers I had would support it well enough to use as the primary OS - or so I thought.

I have known about Asahi Linux for a while, but to my knowledge it was still very experimental and finicky - not quite ready for regular use but that's when as I was researching what my next laptop should be, I saw people claiming that they run Linux on their Apple Silicon Macs. That led me to check the current compatibility of [Asahi Linux](https://asahilinux.org/fedora/#device-support) and to my surprise, it's actually very useable - sure, there's a lot of hardware which will be deemed useless under it but enough of the hardware is supported to actually daily drive it.

That's what leads us here, my first post written on Fedora running off of my M1 Pro MBP. It is still day 1, so I may post about this again in the future either after long-term use or after having to return back to macOS (until I get my next laptop).

Oh, also, since moving to Fedora, I've been exposed to Podman which I'll be attempting to move to from Docker because: rootless containers! More on that soon.