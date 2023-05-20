---
title: Full-bleed Table Scrolling on Narrow Viewports
description: Set an offset that matches the inline page gutter so the table can overflow the edge of the window.
ogImage: /assets/social/full-bleed-table-scrolling.png
date: 2023-05-20
---

I found the following to be a rather decent solution for having HTML tables overflow the inline edges of smaller/tighter/narrow viewports. Try resizing the width of the browser window if viewing this page on a larger screen.

{% codepen "https://codepen.io/hexagoncircle/pen/ZEqjzKw" %}

Notice that the table overflows beyond the edge of the window. This can be acheived by wrapping the `table` element with another element.

```html
<figure class="wrapper">
  <table>
    <!-- ... -->
  </table>
</figure>
```

On this wrapper, a combination of inline padding and negative margins create an offset that matches the page gutter size—that space to the left and right of the main content area. Here's a simplified example of those styles:


```css
body {
  --page-gutter: clamp(1rem, 4vw, 2rem);
  padding-inline: var(--page-gutter);
}

.wrapper {
  margin-inline: calc(var(--page-gutter) * -1);
  padding-inline: var(--page-gutter);
}
```

`clamp()` is used to create fluid padding. The gutter size shrinks as the viewport gets narrower. Unfamiliar with how this CSS function works? Check out the [docs on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp).
{.callout}

The inline margin will pull the table wrapper to the viewport edge. Then inline padding pushes the table back into position so that it's once again aligned with the page content. Here's all the CSS necessary for horizontal scrolling and wrapper repositioning:

```css
.wrapper {
  display: flex;
  overscroll-behavior-x: contain;
  overflow-x: auto;
  margin-inline: calc(var(--page-gutter) * -1);
  padding-inline: var(--page-gutter);
}
```

Setting `display: flex` on the wrapper element fixes a tiny issue in Safari (version 16.4 at the time of writing) where the inline padding at the end appears collapsed.
{.callout}

That's it! There are a handful of ways to display tables on smaller screens. I like that this solution requires very little code and doesn't rely on breakpoint changes. How might you solve this differently? [Let's discuss!](https://fosstodon.org/@hexagoncircle)

