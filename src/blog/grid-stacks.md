---
layout: post
title: Center Items in First Row with CSS Grid
description: Stacking grid items so that an odd number of items appears horizontally centered in the first row instead of the last.
ogImage: /social/grid-stacks.png
date: 2024-08-19
---

Imagine the following section on a website:

1. A collection of elements, like a series of cards with marketing information, are presented in a grid display.
2. The elements are arranged in rows of three.
3. When there are an odd number of elements left over, they will be center-aligned horizontally.

There are a few ways to accomplish styling such a layout. [Controlling Leftover Grid Items with Pseudo-selectors](https://css-irl.info/controlling-leftover-grid-items/) by Michelle Barker shares a clever CSS Grid solution. But here's a twist: What if the centered odd number of elements should appear in the _first_ row instead of the last?

I've included a [CodePen demo](#demo) at the end of this article if you'd like to jump ahead. Otherwise, continue on a journey of style discovery.

## Grid Stacks

Is it a trapezoid grid? Grid pyramid? Pyragrid? For the sake of this article, I ultimately picked a more generic name, calling it *Grid Stack*. Here's how we'll build a *Grid Stack* that contains five cards displayed in a three-column grid.

```scss
.grid-stack {
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  > * {
    grid-column-end: span 2;
  }

  > :first-child {
    grid-column-start: 2;
  }
}
```

[CSS nesting](https://caniuse.com/?search=nesting) is being used here, which is newly supported across major browsers. Not feeling ready for that yet? We can move the nested rules into their own top-level rulesets. They just need to start with the parent selector name, i.e. `.grid-stack > * { }`
{.callout}

The parent `grid-stack` container produces a template with six columns. Notice that the `grid-template-columns` repeat count is double the amount of columns we want visually present in each row. Each child element will then span across two columns instead of one. Finally, the first child element is aligned to the start of the second column. The result is a visually centered top row.

{% image "./public/images/center-align-top-row-grid.png", "A screenshot showcasing grid lines of a container element on a webpage. The Chrome dev tools panel is open, including the Layout panel which has options for customizing the grid lines." "Grid lines (enabled in dev tools) help show where each child element is positioned on the grid." %}

## Variations

So far, the styles we've created only apply when there are five cards positioned across three columns. We may want different variations depending on our designs. Three cards displayed in two columns? Seven cards in four? Let's tweak the above ruleset to utilize a CSS variable for the `grid-template-columns` repeat count. Recall that this value should double our expected column amount. We could also think of it as the amount of child elements plus one.

```scss
.grid-stack {
  display: grid;
  grid-template-columns: repeat(calc(var(--columns) * 2), 1fr);

  > * {
    grid-column-end: span 2;
  }

  > :first-child {
    grid-column-start: 2;
  }
}
```

The `--columns` value gets doubled as it passes through the CSS `calc()` function. Now we're able to define the preferred amount of columns directly on the parent container.

```html
<div class="grid-stack" style="--columns: 2"></div>
<div class="grid-stack" style="--columns: 3"></div>
<div class="grid-stack" style="--columns: 4"></div>
```

## Demo

{% codepen "https://codepen.io/hexagoncircle/pen/gONvbNL/1a52c8d987cc2f6faf90dfe0b98310b2?editors=1100" %}

## Limitations

Each layout variation expects a specific odd-number of child elements to be rendered. I have explored ways of automatically adjusting the layout based on the element count but there were too many edge cases to consider. It created more problems than it solved. Additionally, while this layout works nicely on a wider viewport, it may not fare as well where less space is available. A `media` or `container` query ruleset can ensure our content adapts appropriately, but it certainly couldn't be a one-size-fits-all conditional set of styles.

## Bonus! Pyramid stacks

In the above demo, scroll down further to discover some configurations for the *Grid Stack* that result in a pyramid-style stack. Or maybe we can call it a pyragrid? Still not sure about that one? Anyway, to achieve this layout involves a few extra ingredients. We'll need to adjust the `grid-column-start` position of the first element in each row. Let's jump right to the `grid-stack-15` example:

```scss
.grid-stack-15 {
  --columns: 5;

  > :first-child {
    grid-column-start: 5;
  }

  > :nth-child(2) {
    grid-column-start: 4;
  }

  > :nth-child(4) {
    grid-column-start: 3;
  }

  > :nth-child(7) {
    grid-column-start: 2;
  }
}
```

- This calls for a five-column grid visually, so it sets `--columns: 5`. Recall that this value gets doubled and outputs a template of ten columns.
- We'll nudge the first item in each row with `grid-column-start`. The top row element's start position is equal to the `--column` value. Subsequent rules will decrease this value by 1.

It's surely possible to develop a Sass or PostCSS function that could dynamically generate this CSS output but that seemed a bit overkill for the demo. If you're looking for another way to output a pyramid of elements, Temani Afif offers [another solution for generating a pyramid](https://stackoverflow.com/a/67267124) using `float` and `shape-outside`. Very cool!