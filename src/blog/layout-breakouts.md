---
title: Layout Breakouts with CSS Grid
description: Extending elements beyond the content area with CSS Grid and named grid lines
subtitle: Extending elements beyond the content area with CSS Grid & named grid lines
ogImage: /assets/social/layout-breakouts-css-grid.png
date: 2022-10-07
---

## A post about the layout you're looking at right now

The previous structure of this page layout was virtually the same, the foundation of it expertly defined in the article, [Full-Bleed Layout Using CSS Grid](https://www.joshwcomeau.com/css/full-bleed/) by Josh Comeau. It's a technique I've used on many projects. I've even blogged about it previously in [Horizontal Scrolling in a Centered Max-Width Container](/blog/x-scrolling-centered-max-width-container/).

What I'm documenting here is an extension of the full-bleed CSS Grid layout. In the last version of my site, selected elements  – images, code blocks, quotes – were made wider than the page content area using negative margins. It worked well! For this next iteration, I explored applying these breakout offsets using CSS grid and [named grid lines](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Layout_using_Named_Grid_Lines).

## Layout setup

Below are the styles applied to the main content container, defining the grid display and its columns template:

```css
.content {
  --gap: clamp(1rem, 6vw, 3rem);
  --full: minmax(var(--gap), 1fr);
  --content: min(50ch, 100% - var(--gap) * 2);
  --popout: minmax(0, 2rem);
  --feature: minmax(0, 5rem);

  display: grid;
  grid-template-columns:
    [full-start] var(--full)
    [feature-start] var(--feature)
    [popout-start] var(--popout)
    [content-start] var(--content) [content-end]
    var(--popout) [popout-end]
    var(--feature) [feature-end]
    var(--full) [full-end];
}
```

In the `grid-template-columns` declaration, column areas are represented by keywords wrapped in square brackets suffixed with `-start` and `-end`. These keywords are set as `grid-column` values on elements residing in this container.

Starting at the edge for an example: `[full-start]` and `[full-end]` represent the full-bleed. Any child element containing `grid-column: full;` will span its parent's available horizontal space.

Each grid line is accompanied by a CSS variable of the same name, which supplies the inline size or width of the column. Outside of the center column block (the `content` area) that same variable is used after the `-start` and before the `-end` positions so their sizes match on either side. Continuing with the `full` keyword example, these values are `[full-start] var(--full)` and `var(--full) [full-end]`.

I like to imagine each keyword's area blooms out from the center. `popout` grows out of `content`, `feature` from `popout`, then `full` blossoms all the way to the edge. The horizontal space each keyword covers is the sum of values between its `-start` and `-end` points.

As a way to visualize this grid, I've created a fresh CodePen demo below. Click the "show grid lines" checkbox and resize the browser window to get a sense of how the layout expands and collapses.

{% codepen "https://codepen.io/hexagoncircle/pen/dyejrpE" %}

Many modern browser developer tools include the ability to inspect CSS grid and display grid lines. Here's how to do it in [Chrome](https://developer.chrome.com/docs/devtools/css/grid/), [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_grid_layouts/index.html), and [Safari](https://webkit.org/blog/11588/introducing-css-grid-inspector/).{.callout}

In the CSS tab of that demo, we can see how these grid areas are being applied. The first ruleset, `.content > *`, matches all direct children of the container, setting them to the center `content` area. Cascading rulesets then revise `grid-column` with their respective keyword values.

```css
.content > * {
  grid-column: content;
}
.popout {
  grid-column: popout;
}
.feature {
  grid-column: feature;
}
.full {
  grid-column: full;
}
```

## Having fun with sizing functions

Much of the real magic here is through the use of `minmax()`. It permits the flexible structure of this layout, elements breaking free on larger viewports and collapsing back in when less space is available. Or, as [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax) and the CSS Spec describe it:

> The `minmax()` CSS function defines a size range greater than or equal to _min_ and less than or equal to _max_

Let's revisit the CSS variables declared at the top of the ruleset. I'll explain how this all works in harmony.

```css
  --gap: clamp(1rem, 6vw, 3rem);
  --full: minmax(var(--gap), 1fr);
  --content: min(50ch, 100% - var(--gap) * 2);
  --popout: minmax(0, 2rem);
  --feature: minmax(0, 5rem);
```

* `--gap` represents a gutter size for the left and right sides of the page. This value leans into the [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) function for more fluid, flexible sizing.
* `--full` stretches an element so that it spans the entire horizontal space. By setting `--gap` as the _min_ value, it also takes on the role of visible page gutters for smaller screens.
* `--content` acts as the main content area. The [`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/min) function sets the max-width of this column. Once the available space falls below this value, it then switches to 100% while also subtracting the left and right gutter sizes.
* `--popout` and `--feature` extend elements beyond the content area by `2rem` and `5rem` respectively. As the available horizontal area tightens, these values collapse down to nothing, aligning elements with the main content space on smaller screens.

## Breakout session

That wraps things up! The potential of this concept doesn't stop here. How might you extend or refactor? Drop me a note on [Twitter](https://twitter.com/hexagoncircle) with your awesome layout ideas. 🙌

## Helpful Resources

* [Grid layout using named grid lines](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Layout_using_Named_Grid_Lines)
* [A Deep Dive Into CSS Grid `minmax()`](https://ishadeed.com/article/css-grid-minmax/)
* [min(), max(), and clamp(): three logical CSS functions to use today](https://web.dev/min-max-clamp/)
* [Grid by Example](https://gridbyexample.com/)
