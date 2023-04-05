---
title: Sticky Page Header Shadow on Scroll
description: Applying a shadow to a sticky page header when scrolling using the Intersection Observer API.
ogImage: /assets/social/sticky-page-header-shadow-scroll.png
date: 2023-04-02
---

We've seen it plenty of times around the web where a website's page header follows us as we scroll down the page. CSS makes doing this a breeze with [sticky positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky_positioning):

```css
.page-header {
  position: sticky;
  top: 0;
}
```

What if we desired something a little bit extra, like applying a `box-shadow` to the sticky header as soon as the page is scrolled? I thought it was worth sharing one solution that has worked well for me to accomplish this goal. Check out the following CodePen demo. As soon as the page is scrolled, a shadow fades in below the header.

{% codepen "https://codepen.io/hexagoncircle/pen/qBMeWqo", "result", "400" %}

An element that I've decidedly dubbed an "intercept"—naming is hard and this felt right in the moment—is created and inserted above the page header at the top of the page. If we open the browser dev tools and inspect the <abbr title="Document Object Model">DOM</abbr>, we'll find:

```html
 <div data-observer-intercept></div>
 <header id="page-header">
  //...
 </header>
 ```



The [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is being used to observe when the intercept is no longer appearing in the visible viewport area which happens as soon as the page scrolls. So when the intercept is _not_ intersecting, a class is applied to the header element.

```js
const observer = new IntersectionObserver(([entry]) => {
  header.classList.toggle("active", !entry.isIntersecting);
});

observer.observe(intercept);
```

Inspecting the DOM again, we'll catch the `active` class name on the page header element toggling on and off as we scroll down and back up.

## Delay that shadow

It's also possible to wait on when the shadow should appear by offsetting the intercept element. Try editing the above demo on CodePen. In the CSS panel add the following ruleset:

```css
[data-observer-intercept] {
  position: absolute;
  top: 300px;
}
```

This will push the intercept down from the top of the page by 300 pixels. When scrolling the page again, notice that the shadow doesn't appear right away, waiting until the page has been scrolled passed the offset value.

Have questions? Other ways to handle this? I'd love to hear about it! Reach out to me on [Mastodon](https://fosstodon.org/@hexagoncircle) with your ideas.