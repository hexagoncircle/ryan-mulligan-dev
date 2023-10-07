---
title: Scrollspy Navigation Web Component
subtitle: A web component for sticky-positioned page anchor menus
description: A web component for sticky-positioned page anchor menus.
ogImage: /assets/social/scrollspy-nav.png
date: 2023-10-07
---

A "scrollspy" is a method of tracking which link in a menu is active based on a relevant section of information being visible in the viewport. Typically, the menu position is fixed to the browser window and the active link is indicated with some additional styling. I'm not 100% sure, but it might have started as a [Bootstrap plugin](https://getbootstrap.com/docs/5.3/components/scrollspy/). There have been a number of other versions and variations to follow.

This particular `scrollspy-nav` component had more specific needs, so allow me to break it all down:

- A page contains sections of content, each with a unique `id` attribute.
- There is a horizontal menu list of page anchor links. When a link is clicked, it jumps the page down to a related section of content.
- When a section passes a certain threshold in the viewport, it becomes "active" along with its anchor link counterpart. It uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to keep track of the active section.
- A change in the active section updates the position of a marker element in the menu. The marker animates from the previous active anchor link to the next, resizing itself to the dimensions of the current link's inline size.
- If a menu item is obscured in the viewport overflow horizontally, when it becomes active it will be scrolled fully into view.

I had messed around with this general idea some time ago, but a recent project design brought me back to those old experiments. This is my attempt  at turning the concept into a web component and I thought I'd share the results with you all. The project hasn't been packaged on [npm](https://www.npmjs.com/) or anything because it's still, in my opinion, a work in progress. I've always been keen on web components but I am quite fresh in sharing my own. If you are interested in messing with it, then check out the [scrollspy-nav repository](https://github.com/hexagoncircle/scrollspy-nav) on GitHub and its corresponding [demo page](https://hexagoncircle.github.io/scrollspy-nav/).

## What's in a name?

Deciding on what to call this component was tough—naming things is perpetually difficult. I settled on `scrollspy-nav` for conciseness, but I debated and refactored for a bunch of different names:

- `sticky-scrollspy-nav`
- `scrollspy-section-menu`
- `animated-marker-nav`
- `marker-menu`
- `scrollspy-navigation-with-sweet-animated-marker`

That last one isn't true.

## WebC

The first iteration of this was built as a [WebC](https://www.11ty.dev/docs/languages/webc/) component since my project happened to be using 11ty and WebC. This allowed me to combine the `script` and `style` elements into a single file, then let 11ty and WebC bundle them to their designated buckets in my page layout. Sticking to that vibe, I have included a [scrollspy-nav.webc](https://github.com/hexagoncircle/scrollspy-nav/blob/main/scrollspy-nav.webc) file in the repo. All it does is pull in the css and js files. When the custom element is used on a page, the component code is then bundled appropriately.

## Styling

This is where I'd really love to hear feedback from all the web component makers and advocates out there.

I opted to keep all the base styles in [a separate css file](https://github.com/hexagoncircle/scrollspy-nav/blob/main/scrollspy-nav.css). Most of the layout styles are necessary, although some of the gap spacing and margins are a bit opinionated. While I have tried moving the styles into a shadow DOM, I wasn't quite sure how I'd apply styling to nested selectors. Passing styles to the [host](https://developer.mozilla.org/en-US/docs/Web/CSS/:host) and the [slotted](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted) `ul` can be done:

```css
:host {}
::slotted(ul) {}
```

But targeting any nested elements of the unordered list won't work. At least not from what I've tried. Regardless, I prefer the styles detached from the script so that they still get applied if javascript happens to be disabled in the browser.

For style overrides, this component provides a handful of `--scrollspy-nav-*` CSS custom properties. The [demo page](https://hexagoncircle.github.io/scrollspy-nav/) showcases a couple examples where the marker position, duration, easing, and style are altered with author-selected values.

## FLIP the marker

In my previous experiments, the marker element was inserted as a direct descendant of the `scrollspy-nav` element. At first, everything looked great. The marker animated smoothly as the active link changed. However, this presented a couple issues. Most notably, when resizing the browser window, the marker would lose its positioning visually as the menu started overflowing the parent container.

So I thought: Maybe I could listen to a resize event and reposition it? That felt hacky and it might lead to other problems. What about appending the element to the active anchor link? That fixes the positioning woes, but how would I animate the marker from the previous active link to the next while keeping the animation smooth and performant?

It then _finally_ dawned on me: I had forgotten about the wonderful FLIP (First, Last, Invert, Play) technique! I had even written about it before in [Animating with the Flip Plugin for GSAP](/blog/gsap-flip-cart/) and, while [Animating Layouts with the FLIP Technique](https://css-tricks.com/animating-layouts-with-the-flip-technique/) on CSS-Tricks is now over six years old, it's still perfectly relevant to the topic.

For the marker animation, I capture the width and position of the previous (first) and new (last) active links, update layout so that the marker is now appended to the new element, get the delta between the two link positions (invert), and then run the animation (play) from the previous position to the new one. The resulting `animateMarker` method can be reviewed in [the component script](https://github.com/hexagoncircle/scrollspy-nav/blob/main/scrollspy-nav.js).

## Adjusting for overflow

One last piece to call out is how the component handles active items hidden outside of the visible viewport area. Check out the [demo page](https://hexagoncircle.github.io/scrollspy-nav/) in a narrow viewport size. A hidden or partially hidden active link will slide fully into view by calling the `scrollTo` method on the menu and scrolling it along the X axis by setting the distance to the `left` option value.

## Thoughts?

I'll wrap things up here. There are still plenty of UX enhancements to explore. Clearer indication that the menu scrolls horizontally and layout considerations in different writing modes are some that come immediately to mind. I'd love to hear what you like (or don't like) and how this component could be improved. [Reach out to me on Mastodon](https://fosstodon.org/@hexagoncircle) and let's talk web components.