---
title: CSS Grid Gap Behavior with Hidden Elements
description: Some discoveries on how the CSS Grid gap property operates when hiding items in grid-template and grid-auto layouts.
subtitle: Some discoveries on how the CSS gap property operates when hiding items in grid-template & grid-auto layouts
ogImage: /assets/social/grid-gap-behavior.png
date: 2023-02-14
---

I was recently prototyping a component layout that included a way to toggle the visibility of sibling elements inside a grid display. What tripped me up was, while these elements were hidden, all of the container's `gap` gutters remained, leaving undesired extra visual spacing. I expected these gutters to collapse. The reason they stick around is related to explicitly defining grid templates.

## Template or auto layout?

What are the differences between `grid-template-*` and `grid-auto-*` when defined for columns or rows in a grid layout? Ire Aderinokun has [a fantastic article](https://bitsofco.de/understanding-the-difference-between-grid-template-and-grid-auto/) that thoroughly explains these distinctions and I recommend giving it a read. I'll try to quickly summarize: `grid-template-*` sets explicit column and row tracks, while `grid-auto-*` creates implicit track patterns.

The following excerpt in the "How grid-auto works" section from the article stood out to me:

> Unlike the `grid-template-*` properties, the `grid-auto-*` properties only accept a single length value.

After some experimentation and confirming through examples from the [_Syntax_ section](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows#syntax) in the `grid-auto-rows` MDN web docs, I found that multiple track-size values can be used as well. Let's try an example to create a layout commonly referred to as [the pancake stack](https://web.dev/patterns/layout/pancake-stack/). Its value of `auto 1fr auto` will either:

- explicitly size and position only the first three rows when used in `grid-template-rows`
- act as a pattern to implicitly size each group of three rows in `grid-auto-rows`

## Visualize the gap

In the CodePen demo below, tick on the "Hide elements" checkbox to assign `display: none` on all but the first two elements in both grid containers.

{% codepen "https://codepen.io/hexagoncircle/pen/bGxbpjj" %}

::: callout
_Note:_ I'm toggling the container height value to help emphasize the difference between the explicitly-sized `grid-template-rows` and the implicit pattern created by `grid-auto-rows`.
:::

So what's happening here? When collapsed, the `grid-template-rows` container is slightly taller than its `grid-auto-rows` counterpart because of the extra space appearing beneath the remaining visible elements. Recall that rows are _explicitly_ set with `grid-template-rows`. In this situation, the `gap` gutters still apply even when elements are hidden or removed from the container.

I ending up moving forward with `grid-auto-rows` for my component's layout needs. You can see a stripped down version of it in the CodePen below. The classic small screen navigation!

{% codepen "https://codepen.io/hexagoncircle/pen/zYJOGbv" %}

## A template solution

If using `grid-template-*` is preferred or necessary, the solution is to override the property value to match the expected visual result. The above demo could even get by on a single ruleset that applies the template only when the menu is open:

```css
.nav.is-open {
  grid-template-rows: auto 1fr auto;
}
```

This same solution can also work for `grid-template-areas`. While it leads to writing more code, it self-documents really nicely.

```css
.nav {
  grid-template-areas: "logo toggle"
}

.nav.is-open {
  grid-template-areas: 
    "logo toggle"
    "menu menu"
    "cta  cta"
}

.nav .logo   { grid-area: logo;   }
.nav .toggle { grid-area: toggle; }
.nav .menu   { grid-area: menu;   }
.nav .cta    { grid-area: cta;    }

```

## Helpful resources

- [Understanding the difference between grid-template and grid-auto](https://bitsofco.de/understanding-the-difference-between-grid-template-and-grid-auto/)
- [Mind the Gap – Hide a Column in CSS-Grid](https://marcus-obst.de/blog/mid-the-gap-hide-a-column-in-css-grid)
- [grid-auto-rows on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)
- [grid-template-rows on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)