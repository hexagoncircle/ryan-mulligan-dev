---
title: Inverted Media Queries and Breakpoints
description: Using the `not` keyword to negate a media query breakpoint and apply CSS rules.
date: 2022-07-05
---

## The occasional breakpoint

Nowadays I lean on [modern CSS solutions](https://moderncss.dev/contextual-spacing-for-intrinsic-web-design/), [fluid layout patterns](https://css-tricks.com/responsive-layouts-fewer-media-queries/), and [intrinsic sizing](https://ishadeed.com/article/intrinsic-sizing-in-css/) over viewport dimension-based media queries – typically referred to as _breakpoints_ – that adapt a design at particular screen sizes. Let's not forget that [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) will soon join our CSS toolset, expanding the exciting universe of parent context styling.

However, I do still find the occasional place to apply adaptive styles. Common example: a "desktop" menu (imagine a horizontal list of navigation items) that converts into its "mobile" counterpart (imagine a [hamburger button](https://en.wikipedia.org/wiki/Hamburger_button) that toggles a vertically stacked menu's visibility). After building out the foundational styles, I often prefer separating adaptive CSS properties versus having to override or unset them. This means I end up with rulesets that might look like this:

```css
.menu {
  /* base styles */
}

/* below 600px */
@media (max-width: 599px) {
  .menu {
    /* narrow viewport styles */
  }
}

/* 600px and above */
@media (min-width: 600px) {
  .menu {
    /* wide viewport styles */
  }
}
```

Notice the single pixel difference in the two values, `599px` and `600px`. If these min- and max-width queries shared the same value, then there would be a single pixel overlap where both styles would apply. Not ideal!

## Invert the media query

One way around this is to negate the media query. The `not` keyword in a media query will [invert the query's meaning](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#inverting_a_querys_meaning). To let both values in the previous example be the same, I could instead reuse a query and then invert it:

```css
/* below 600px */
@media not all and (min-width: 600px) {
  /* "... */
}

/* 600px and above */
@media (min-width: 600px) {
  /* "... */
}
```

The `not` keyword only seems to apply when first defining a [media type](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#targeting_media_types) and then the [media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#targeting_media_features) as I have above. Something like `@media not (min-width: 600px)` won't work.
{.callout}

If your current browser window is large enough, you can resize the CodePen result window below to see the text and background color change based on their respective media query declarations:

<p class="codepen" data-height="600" data-default-tab="result" data-slug-hash="QWmbRXe" data-user="hexagoncircle">
  <span>See the Pen <a href="https://codepen.io/hexagoncircle/pen/QWmbRXe">
  Invert media query</a> by Ryan Mulligan (<a href="https://codepen.io/hexagoncircle">@hexagoncircle</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Future CSS solutions

Level 4 [media query range contexts](https://www.bram.us/2021/10/26/media-queries-level-4-media-query-range-contexts/), which is getting closer to full modern browser support, will allow use of the same value:

```css
/* @media (max-width: 599px) becomes */
@media (width < 600px) {
  /* ... */
}

/* @media (min-width: 600px) becomes */
@media (width >= 600px) {
  /* ... */
}
```

I really dig that syntax. I personally find it easier to understand and maintain.

Another exciting solution involves [custom media queries](https://www.stefanjudis.com/notes/can-we-have-custom-media-queries-please/), which would allow us to store the media feature to a variable:

```css
@custom-media --breakpoint (min-width: 600px);

/* below 600px */
@media not all and (--breakpoint) {
  /* ... */
}

/* 600px and above */
@media (--breakpoint) {
  /* ... */
}
```

It seems that this won't be available for a while as it's in a draft of the [level 5 media queries spec](https://drafts.csswg.org/mediaqueries-5/#custom-mq), but the good news is that there's a [PostCSS plugin](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media) that give us this power today. 👏

## Helpful resources

- [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#combining_multiple_types_or_features)
- [Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)](https://www.bram.us/2021/10/26/media-queries-level-4-media-query-range-contexts/)
- [Can we have custom media queries, please?](https://www.stefanjudis.com/notes/can-we-have-custom-media-queries-please/)
- [Logic in CSS Media Queries (If / Else / And / Or / Not)](https://css-tricks.com/logic-in-css-media-queries/)
