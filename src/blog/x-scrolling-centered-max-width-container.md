---
title: Horizontal Scrolling in a Centered Max-Width Container
description: Applying modern CSS techniques to align the start position of a horizontal scrolling gallery to a parent container's max-width while allowing its overflow to span the entire viewport.
subtitle: Applying modern CSS techniques on horizontal scroll section layouts
date: 2022-03-11
---

## The layout challenge

When I had first assembled a gallery of [CodePen projects](https://codepen.io/hexagoncircle) to include on my personal site redesign in the summer of 2021, I imagined the following layout and interaction:

- The page's main content container is centered on the page with a max-width set.
- The first gallery item aligns with the left side of the content container.
- Items overflow to the right and beyond the viewport, indicating that it can be scrolled horizontally.
- Once scrolling is initiated, the left side of the gallery would break out of the content container, eventually sliding past the left edge of the viewport.

This was a tough layout to get right! Ultimately, I decided to go with a slightly different [homepage](/) design that didn't rely on aligning the start position inside the page content area.

In case my site design has been updated, this is for my future friends reading: You can see the aforementioned version of my site in [this tweet](https://twitter.com/hexagoncircle/status/1338885523658555394?s=20&t=u2zpk5LgvhQeV5_YwYB5rg) from August 2021.
{.callout}

## Revisiting the desired result

The altered design worked well. But I still couldn't shake it. There had to be a way to build that original layout. Turns out nearly anything is possible with CSS these days. Here's a CodePen containing some gallery examples:

<p id="codepen-demo" class="codepen" data-height="650" data-default-tab="result" data-slug-hash="gOWjwme" data-user="hexagoncircle">
  <span>See the Pen <a href="https://codepen.io/hexagoncircle/pen/gOWjwme">
  Horizontal scrolling in a centered max-width container</a> by Ryan Mulligan (<a href="https://codepen.io/hexagoncircle">@hexagoncircle</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

I shared [this solution](https://twitter.com/hexagoncircle/status/1422559196088737797) on Twitter back before I had a blog space. Now that I do have one, I thought I'd take a deeper dive into how I achieved the final result.

## Using a full-bleed layout

Josh Comeau's [Full-Bleed Layout Using CSS Grid](https://www.joshwcomeau.com/css/full-bleed/) is an article I reference often. It's a solid, modern approach to limit the maximum width of page content while allowing "full-bleed" elements such as images to stretch across the viewport width. This style of layout has been achieveable by other means as discussed at length in [Full Width Containers in Limited Width Parents](https://css-tricks.com/full-width-containers-limited-width-parents/) on CSS-Tricks but I agree with Josh's sentiment about negative margin approaches being a bit hacky in comparison.

The CodePen above follows Josh's [padding example](https://www.joshwcomeau.com/css/full-bleed/#padding) but adds some named template areas which I'll explain:

```css
.content {
  display: grid;
  grid-template-columns:
    [full-start] 1fr
    [content-start]
    min(var(--content-max-width), 100% - var(--space-md) * 2)
    [content-end]
    1fr [full-end];
}

.content > * {
  grid-column: content;
}

.gallery {
  grid-column: full;
  /* other gallery code */
}
```

The first and third columns are set to `1fr`, causing them to fill the space surrounding either side of the second. The value of the second column is calculated by a CSS `min()` function, which selects the smaller of its two values depending on the window size. On screensizes smaller than `--content-max-width`, padding is created on either side by doubling a space value and subtracting it from 100% to suppress any unwanted page overflow.

Something to note is that `calc()` can be used but is not necessary for calculations written inside `min()`, `max()`, and `clamp()` functions.
{.callout}

A noticeable difference in this code are the [named grid lines](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Layout_using_Named_Grid_Lines) declared in `grid-template-columns`. Appending `-start` and `-end` creates a named area (or [custom-ident](https://drafts.csswg.org/css-values-4/#custom-idents)) that can be referenced in a child element's `grid-column` property. When applied, an element will span the area between these two lines.

- `content` becomes an identifier for the page content area. It will fill the second column of the grid and is the same as declaring `grid-column: 2`.
- The `full` identifier stretches across all the columns. This is equal to `grid-column: 1 / -1`.

This approach removes the need for a "full-bleed" utility class on HTML elements. Instead, `full` and `content` become reusable values in the CSS for child elements when `grid-column` is declared. If the columns template should change at all (adding additional values, adjusting sizes) the named areas stay the same.

## Creating the gallery styles

With the page layout finished, we can move on to the gallery component, starting on the top-level gallery element:

```css
.gallery {
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  padding-block: var(--gap);
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
```

This is where scroll behavior and scroll snapping are handled, as well as stretching the viewport width. It inherits the `grid-columns-template` from the parent grid, acquiring the same column values and named grid lines.

`inherit` works as expected since the gallery spans the full row of the parent grid, so its column dimensions match. However, its grid is independent of the parent one, unlike `subgrid` which allows nested elements to utilize the parent grid. [This article](https://www.annalytic.com/css-subgrid-vs-nested-grid.html) by Anna Monus explains it well. [CSS Subgrid](https://www.smashingmagazine.com/2022/03/new-css-features-2022/#subgrid) support is very low with only Firefox supporting it at the time of writing.
{.callout}

In browser developer tools, we can enable layout grid lines visually and get a sense of how it's all working. I'm using Chrome dev tools in the screenshot below but Firefox and Safari share similar steps.

- Open the _Layout_ panel and select "Show line names" from the _Overlay display settings_ dropdown.
- In the _Elements_ panel, click on the `grid` pills to the right of the main content and gallery elements to toggle their grid line visibility.

{% image "src/images/gallery-grid-lines.png", "Screenshot of dev tools showing the overlap of the gallery's grid lines on top of the parent container's grid lines.", "Dev tools can be used to visualize the overlap of the gallery's grid lines on top of the parent container's grid lines." %}

### The inner wrapper

In order to align the initial project item to the page content area, a wrapper element surrounds the project items and has `grid-column: content` declared. Remember, the gallery inherits the `grid-template-column` property value so the `full` and `content` keywords are available.

```css
.gallery .wrapper {
  grid-column: content;
  display: flex;
  gap: var(--space);
}

.gallery .wrapper::after {
  content: "";
  padding-inline-end: max(
    var(--gap) / 2,
    (100vw - var(--content-max-width)) / 2 - (var(--gap) / 2)
  );
}
```

A flex display is applied to the wrapper so that its children line up in a single row. The `gap` property adds the gutters between each child.

The wrapper also introduces a pseudo element as a spacer after the last project item to keep it from stopping right on the viewport edge. To make my original spacer code even better, Maarten Bruggink shared [a fantastic suggestion](https://twitter.com/maartenbruggink/status/1422641189732462594?s=20&t=05DWyNWsJX9CLrq9GQPuKQ) that supports scrolling until the last element aligns to the right side of the page content area, even on larger screensizes. 👏

### The projects

Adding `flex-shrink: 0` on project items keeps them from collapsing to fit within the gallery wrapper. I've applied a combination of inline-sizing and aspect-ratio to projects in this demo so that they share the same responsive dimensions. It's not required though! Depending on what the gallery intends to accomplish, some project items could be wider, some tighter, and the layout would work as you'd expect. In the [CodePen demo](#codepen-demo), scroll down a bit for an example.

## A fun scroll snap tidbit

Something that I found really interesting: `scroll-snap-align` can be declared on nested elements! Notice that `scroll-snap-align: center` is set on project items. Although, while this works nicely for the `center` value, the result is not what you might hope for when using `start` or `end`. The elements are aligning to the scroll container edges of the gallery, which handles the scroll snap positioning, not the wrapper.

Seems like there's a scroll snap regression in Firefox. For now, I've unset scroll snap alignment in a `@-moz-document url-prefix()` ruleset while waiting on a fix for [this](https://bugzilla.mozilla.org/show_bug.cgi?id=1737820) to be deployed.
{.callout}

## Reverse scroll direction

Scroll direction is handled quite gracefully. For languages that read from right to left, project items will be flipped appropriately thanks to their parent wrapper's flexbox display. The first item aligns to the right edge of the page content area and the gallery scrolls in from the left. Check the [CodePen demo](#codepen-demo) for an example of this further down the page.

For more information on this, [RTL Styling 101](https://rtlstyling.com/) is an excellent guide. I recommend the [Flexbox Layout Module](https://rtlstyling.com/posts/rtl-styling#flexbox-layout-module) section to learn more about flexbox and right-to-left styling.

## CSS is awesome

CSS Grid and Flexbox open the doors to so many layout patterns that, not long ago, were nothing but impossible to produce without leaning into JavaScript. There are so many more exciting [new features coming](https://www.smashingmagazine.com/2022/03/new-css-features-2022/) to CSS that will continue to push the boundaries of what we can create. If [CSS Cascade Layers](https://css-tricks.com/css-cascade-layers/) are any indication, browser teams are working hard on implementing these features faster than ever.

## Helpful resources

- [A Horizontal Scroll List and Custom Keyboard Navigation](/blog/project-keyboard-navigation/)
- [Full-Bleed Layout Using CSS Grid](https://www.joshwcomeau.com/css/full-bleed/)
- [min(), max(), and clamp(): three logical CSS functions to use today](https://web.dev/min-max-clamp/)
- [CSS subgrid vs nested grid — are they the same?](https://www.annalytic.com/css-subgrid-vs-nested-grid.html)
- [RTL Styling 101](https://rtlstyling.com/)
