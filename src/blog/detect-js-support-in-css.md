---
layout: post
title: Detect JavaScript Support in CSS
description: Description
ogImage: /social/detect-js-support-in-css.png
date: 2024-04-20
---

I had been aware of the [`scripting` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scripting) but I was still under the impression that cross-browser support was lacking. What a pleasant surprise to discover that it has been available in all modern browsers as of December 2023 according to [caniuse.com](https://caniuse.com/?search=scripting). With this feature, we can provide alternative CSS rules depending on whether or not JavaScript is available in the user's browser.  It can also help reduce flashes of unstyled content or undesirable layout shifts.

*Before we dive in:* As exciting as this feature is, I've learned that there are a couple unfortunate gotchas. I've amended the article with an [issues](#issues) section below.

## Usage

We can progressively enhance our styles:

```scss
@media (scripting: enabled) {
  .my-element {
    /* enhanced styles if JS is available */
  }
}
```

Or we can gracefully fall back to some alternate styles:

```scss
@media (scripting: none) {
  .my-element {
    /* fallback styles when JS is not supported */
  }
}
```

There's also an `initial-only` value, which is for scripting that is enabled during page load but not after. The [Media Queries Level 5 W3C Working Draft](https://www.w3.org/TR/mediaqueries-5/#scripting) includes a couple cases where it can be useful.

> Examples are printed pages, or pre-rendering network proxies that render a page on a server and send a nearly-static version of the page to the user.

I don't personally imagine using `initial-only` much, if ever. Although, I'd be interested to find more specific examples of it in practice.

## The time before the query

Before this feature, one approach for detecting JavaScript support was by setting a custom selector on the opening `html` tag—a common one seen in the wild is the `no-js` class name. If JavaScript is supported and enabled, it removes that selector just prior to rendering page content. When JavaScript is disabled, we can supply alternative styles that adapt to the experience.

```html
<html class="no-js">
  <!-- page content -->
</html>
```

```scss
.no-js .my-element {
  /* styles when JS is disabled */
}
```

## Is this real life?

Imagine a new web campaign is on the cusp of going live and it's time to connect with all the key stakeholders. Everything looks great, most of the team satisfied with the result, but then suddenly some hip marketer in the meeting emphatically requests a complex intro animation on the hero component when the page loads. They gesture wildly as they ask for the main headline to fade in, shrink away as if it were being pulled back on a sling shot, and then... at this point they make an explosion noise with their mouth. "Make it pop!" they decree a mere 24 hours before launch.

Woof. Better get started.

To handle the complexity of this work, we might reach for an animation library such as [GSAP](https://gsap.com/). But what does the user see when JavaScript is not available, not to mention if a user's [`prefers reduced motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) setting is enabled? We'll need to consider an alternate version of the hero without all that swooping and scaling.

This media query unlocks the ability to provide CSS rules that are a better fit to the user's experience. In the CodePen demo below, if we disable JavaScript, we'll find that the animation is skipped and the static headline is displayed.

{% codepen "https://codepen.io/hexagoncircle/pen/NWmEMmJ/e1e382620c5897b4c72fa29b36227fd4" %}

## Watch that flash

To really make the intro animation feel smooth on page load, the demo relies on the `scripting` media query to hide the headline with CSS. By doing so, we won't catch a flash of unstyled text before the GSAP animation is loaded. Also, we only want to hide the headline if JavaScript _is_ available, otherwise it would be hidden for users when it's disabled.

In the following video, watch what happens when the headline is not hidden on page load. The text flashing is even more glaring when throttling on a slower network.

{% video "/videos/detect-js-support-in-css", "In the video, the headline is no longer hidden on page load to share that pesky flash of unstyled text. When emulating slower network speeds, the issue becomes even more egregious." %}

## Combining queries

In the CSS tab of the demo, notice that the media queries are combined to check both scripting and reduced-motion conditions.

```scss
@media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
  /* JS available and motion OK */
}

@media (scripting: none), (prefers-reduced-motion) {
  /* JS disabled or reduced motion enabled */
}
```

Each condition can surely have exclusive styles if the desired outcome calls for it, but it's nice that we can combine them where there's overlap in rulesets.

## Issues

**Updated on April 21st, 2024** - After publishing this post, some feedback surfaced explaining where this media feature unexpectedly fails.

1. It does not behave as anticipated when a browser extension such as NoScript or uBlock Origin is used to disable page scripts. `scripting: enabled` still matches even though the extension has JavaScript turned off.
2. If a script gets blocked or fails to load, a fallback would need to be handled via JavaScript. In the demo above, the fallback would need to tap into the demo's `scripting: none` media query ruleset so that the static version of the hero is displayed.

Tremendous thanks to [Sara](https://front-end.social/@SaraSoueidan/112307456267714875), [Šime](https://mastodon.social/@simevidas/112305703318360235), and [Vadim](https://mastodon.social/@pepelsbey/112308080752283580) for sharing!

## Helpful resources

- [CSS Media Query for Scripting Support](https://blog.stephaniestimac.com/posts/2023/12/css-media-query-scripting/)
- [New on the web: How to detect disabled JavaScript in CSS](https://www.stefanjudis.com/blog/how-to-detect-disabled-javascript-in-css/)
- [Day 106: the scripting media feature](https://www.matuzo.at/blog/2023/100daysof-day106)