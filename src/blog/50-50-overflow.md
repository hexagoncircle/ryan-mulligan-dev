---
layout: post
title: The Fifty-Fifty Split and Overflow
description: A responsive 50/50 component with a scrollable section
ogImage: /social/50-50-overflow.png
date: 2024-02-19
---

The fifty-fifty split—or 50/50 for a dash of brevity—is a classic layout pattern where two elements occupy the same amount of inline space inside a row. These two elements will stack once it becomes too narrow to properly display them side by side. Both flexbox and CSS grid can accommodate this pattern.

I had recently shared a demo on CodePen built with this layout pattern, but the component in the demo contains an extra feature: The content of one section overflows and can be scrolled. Try it out by scrolling the section sandwiched between the "header" and "footer" elements.

{% codepen "https://codepen.io/hexagoncircle/pen/PoLdzzo" %}

Let's find out how it all works. We'll jump into flexbox and grid versions of the 50/50 layout as well as how to handle overflow scrolling.

## The flexbox 50/50

In the [50/50 flexbox layout demo](https://codepen.io/hexagoncircle/pen/YzgdVEp), the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis">`flex-basis`</a> value represents how tight the section elements within the container can get before wrapping. `flex-grow: 1` insists these sections grow beyond their `flex-basis` value to equally fill the inline space. Once the container becomes too narrow, the two sections will stack.

```scss
.fifty-fifty {
  display: flex;
  flex-wrap: wrap;
}

.fifty-fifty > * {
  flex-grow: 1;
  flex-basis: 250px;
}
```

In the CodePen demos, we'll find a `--min-inline-size` variable is utilized. I've removed it from these article code blocks to keep them simple. The reason for having it? It acts as a configuration property for the `.fifty-fifty` selector. When necessary, we can set a custom value to it and override how tight the sections get before they stack. Otherwise, it'll use the fallback value.
{.callout}

## The grid 50/50

This same layout can be achieved with CSS grid as we'll discover in the [50/50 grid layout demo](https://codepen.io/hexagoncircle/pen/poYYoLX).

- A columns template is declared to represent the two sections.
- `auto-fit` expands the columns so that they evenly fill the parent container.
- A `minmax()` function provides the minimum width for when the sections should stack once the parent container becomes too narrow.

```scss
.fifty-fifty {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  );
}
```

## Scrolling overflow content

Imagine a design requirement in which one of the sections within the 50/50 is scrollable. The intrinsic height of the non-scrolling side should instruct the overall height of the parent container. Problem is, we can't just declare a static height value because the content in the non-scrolling section could change. Maybe the text is translated by the user. Maybe the font size is increased for readability.

This seems tricky to pull off, but both the flexbox and grid patterns can accommodate such a feature. The code blocks below contain the essential HTML and CSS for the grid version. We can also get a look at how both versions work in this [CodePen demo](https://codepen.io/hexagoncircle/pen/qBvvdbg).

```html
<article class="fifty-fifty">
  <section>
    <!-- this content controls overall height -->
  </section>
  <section class="scroll-container">
    <!-- overflowing section content -->
  </section>
</article>
```

```scss
.fifty-fifty {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
}

.scroll-container {
  contain: size;
  overflow-y: auto;
}
```

My original take on this has been massively improved after some [feedback from Roma Komarov](https://front-end.social/@kizu/111959588855601850). I totally slept on the [`contain`](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) property! After setting the `contain: size` rule, I can drop my previous iteration which had an additional nested element with absolute positioning applied. This simplifies both the template and styles. Thank you, Roma! 👏

Now, when the sections are side by side, the height of the `fifty-fifty` container is based on the size of the non-scrolling section.

### Visually collapsed when stacked

For either layout, it is important to apply a _minimum_ height on the scrollable section. Otherwise, when the sections stack, the scrolling section would disappear visually. Although, if we use CSS grid, we get an extra twist of magic: the `grid-auto-rows` property. Instead of setting a static "magic number" minimum height, `grid-auto-rows: 1fr` can be declared. What makes this an attractive alternative is that, whether stacked or split, the two sections are always the same size. In other words, the scrollable section height will consistently mirror the height of the non-scrolling section.

## Where it all started

The [CodePen demo](https://codepen.io/hexagoncircle/pen/PoLdzzo) introduced at the beginning of the article has its rules organized another way. Since there are distinct border styles applied depending on whether the sections are stacked or split, we'll find that a media query ruleset handles the layout breakpoint instead. When the browser viewport is larger than the `min-width` in the query, each section is explicitly set to `1fr` to distribute their inline sizes evenly. The code below focuses on those specifics.

```scss
.container {
  display: grid;
  grid-auto-rows: 1fr;
}

.details {
  border-block-start: var(--border);
}

@media (min-width: 40rem) {
  .container {
    grid-template-columns: 1fr 1fr;
  }

  .details {
    border-block-start: unset;
    border-inline-start: var(--border);
  }
}
```

If we desired more modular control than a media query can provide, we could consider using a [container query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) to manage these styles. A solid enhancement to add when it becomes necessary.

## Helpful resources

- The [Fifty-Fifty Split collection](https://codepen.io/collection/NqoVpN) of all the CodePen demos in this article.
- Temani Afif's [collection of solutions](https://stackoverflow.com/questions/48943233/how-can-you-set-the-height-of-an-outer-div-to-always-be-equal-to-a-particular-in/48943583#48943583) on Stack Overflow.