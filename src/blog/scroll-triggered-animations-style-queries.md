---
layout: post
title: CSS Scroll-triggered Animations with Style Queries
description: Combine scroll-driven animations and style queries to trigger an animation sequence powered only by CSS.
ogImage: /social/scroll-triggered-animations-style-queries.png
date: 2024-01-27
---

Topping my CSS wishlist in 2024 are [scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) and [style queries](https://developer.chrome.com/docs/css-ui/style-queries). At the time of writing this post, both lack full support but I've got fingers crossed they become available in all evergreen browsers not too long from now. I had done some [exploration of scroll-driven animations](/blog/scroll-driven-animations/) but have not yet spent much time with style queries beyond reading and daydreaming about the amazing possibilities they'll unlock.

## Discovery zone

I happened upon [a CodePen by Jhey Tompkins](https://codepen.io/jh3y/pen/qBgRLxb) that kicked off my curiosity. In that demo, as the page is scrolled, animations are triggered that smoothly highlight passages of text within the copy. It's all powered by CSS. That's incredible! I've achieved this effect in past demos using [GSAP ScrollTrigger](https://codepen.io/hexagoncircle/pen/gOPMwvd) and the [Intersection Observer API](https://codepen.io/hexagoncircle/pen/OJMXZzB). How is this same concept accomplished with only CSS?

Diving into Jhey's code, we find a `--highlighted` custom property set to `0`. Using scroll-driven animations, the value is updated to `1` as the `mark` element reaches the end of its `animation-range`. That value is passed into a `calc()` function that transitions a `background-position` property to create the highlighting effect.

This scroll-driven animation mimics intersection observer functionality. In fact, if we inspect the JS panel in the CodePen editor, we'll find that Jhey provides an intersection observer fallback for browsers that don't support CSS view progress timelines.

## Scroll-driven animations and style queries join forces

That demo got me jazzed. What else might be possible with this bonafied CSS trick? Could we also trigger a `@keyframes` animation sequence? I've tested and scrapped a handful of ideas, deciding that it may not be feasible in scroll-driven animations. At least not without a little help from a new friend.

Style queries give us the ability to supply styling based on the value of a parent CSS custom property. Ahmad Shadeed's [Style Queries](https://ishadeed.com/article/css-container-style-queries/) deep dive demonstrates this in a variety of ways. I ran with Jhey's view progress timeline approach, "toggling" a custom property value in a `@keyframes` ruleset, then added a style query that triggered an animation on a child element.

How about that—it works! 🎉 Or rather, it works in browsers that support both style queries and scroll-driven animations. When unsupported, the demo falls back to displaying the text without the animations.

{% codepen "https://codepen.io/hexagoncircle/pen/wvOPmGO" %}

The magic is in the following CSS code. It has been stripped back from the demo CSS to focus on the trigger animation specifics.

```scss
.box {
  animation: trigger steps(1) both;
  animation-timeline: view();
  animation-range: entry 80% contain 40%;
}

@container style(--animate: true) {
  .text { 
    /* animate! */
  }
}

@keyframes trigger {
  to {
    --animate: true;
  }
}
```

Note that only the `animation-range` end value is relevant for the trigger. Declaring `animation-range-end: contain 40%` instead would also work here. However, the demo includes the start value to explicitly set where the `fade` animation starts on the same element.
{.callout}

Once the `.box` element reaches the end of the `animation-range`, the `trigger` animation runs instantly, sets `--animate: true` on the element, then kicks off the elastic popup and background gradient transition on its child `.text` element. If the page is scrolled back up, the text recedes back to its starting position.

## Additional thoughts

I find this fascinating. Modern CSS continues to deliver fresh delight. However, keep in mind that the CodePen demo works well here because the animated elements are hidden outside of the viewport on initial page load. We'd see the text animate on load if it were visible on screen, which may not be ideal. There are a few ways to handle supressing animation playback on load using JavaScript but I'd love to have this control through a CSS rule.

Another thought I had, which Bramus asks the reader in the intro of his [article about scroll-driven animations](https://www.bram.us/2023/10/05/run-a-scroll-driven-animation-only-once/):

> [...] what if you want a scroll-driven animation to stay on its endframe once it was entirely played?

Play through one and done? Sounds like an excellent option. Unfortunately, this cannot be done in CSS but Bramus shared a set of [scroll-driven animation utilities](https://github.com/bramus/sda-utilities) which includes a way to run a scroll-driven animation only once.

Have any feedback or other ideas? Come and [join the conversation](https://fosstodon.org/@hexagoncircle/111829670640360211) on Mastodon.

**Updated on January 29th, 2023**: Bramus shared with me his own [experiment with this concept](https://www.bram.us/2023/06/15/scroll-triggered-animations/) from last year. The article does an excellent job explaining how it works and I recommend checking it out. Our conclusions on this seem to be the same.

> This was a fun experiment to do. However, it’s only an experiment and to me makes the case that we still need proper Scroll-Triggered Animations in the future – maybe something to work on for `scroll-animations-2`? 😉

Now there's a sequel I would be excited to see. 👀