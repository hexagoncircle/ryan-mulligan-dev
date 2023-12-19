---
title: We can :has it all
description: The functional :has() CSS pseudo class is available in all evergreen browsers.
ogImage: /we-can-has-it-all.png
date: 2023-12-19
---

[The functional `:has()` CSS pseudo class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) is now shipping in all evergreen browsers! 🎉

With [the release of Firefox 121.0](https://www.mozilla.org/en-US/firefox/121.0/releasenotes/), I'm excited to see that my semi-dusty `:has()` demos are finally realizing their full potential in Firefox. The amount of opportunity unlocked with this selector seems nearly infinite. It can simplify some of the more complex CSS selectors and hacks used in the past. It also opens the door to replacing JavaScript solutions that weren't yet possible to achieve with only CSS.

This post is merely a celebration of `:has()` browser support and shares a quick dive into some of my previous experiments. At the end of this article are helpful resources that do an amazing job explaining how the selector works and the unbelieveable power it gives us.

## Themes, layouts, and filters

This first demo showcases how `:has()` can be used to set a dark mode, change the layout, and toggle the visibility of elements. All of it can be achieved through a combination of the `:has()` and [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) selectors.

{% codepen "https://codepen.io/hexagoncircle/full/KKBBXQO" %}

To pull off this primitive filtering technique, each card has a `data-category` attribute. When a filter option is selected, only the cards with that particular category will remain visible. Check out the following HTML example:

```html
<article class="card" data-category="bakery">
  <!-- card contents -->
</article>
<article class="card" data-category="taquería">
  <!-- card contents -->
</article>
<article class="card" data-category="café">
  <!-- card contents -->
</article>
```

If the `bakery` filter option is selected, then the second and third cards would be hidden. Here's the CSS that hides all non-bakery cards:

```scss
body:has([name="filter"][value="bakery"]:checked) .card:not([data-category="bakery"]) {
  display: none;
}
```

`[name="filter"]` can be omitted from the selector above given the current circumstances. As things get more complex, however, there could be value overlaps that cause unintended results. This explicitness does raise [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity), but it can be reduced by using a [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) selector if preferred. Semi-related: [The truth about CSS selector performance](https://blogs.windows.com/msedgedev/2023/01/17/the-truth-about-css-selector-performance/) is a good read!
{.callout}

Using `:has()` to alter layout and filter collections of elements is incredibly powerful. Although, let's understand that there are important accessibility considerations to make here. Don't do something like this in production without ensuring all folks are enabled with a proper experience.

## Skate or theme!

In the next demo, the select dropdown acts as a progressive enhancement. The skateboard's theme will update based on the option selected.

```scss
:root {
  --color: black;
}

body:has([value="lightning"]:checked) {
  --color: yellow;
}

body:has([value="holiday"]:checked) {
  --color: green;
}
```

{% codepen "https://codepen.io/hexagoncircle/full/GRBJLwE" %}

This project has always been one of my personal favorites. It brings me a fair amount of joy seeing it working fully in Firefox.


## Helpful resources

- [Level Up Your CSS Skills With The :has() Selector](https://www.smashingmagazine.com/2023/01/level-up-css-skills-has-selector/)
- [CSS :has Parent Selector](https://ishadeed.com/article/css-has-parent-selector/)
- [Using :has() as a CSS Parent Selector and much more](https://webkit.org/blog/13096/css-has-pseudo-class/)
- [Selecting previous siblings with CSS :has()](https://tobiasahlin.com/blog/previous-sibling-css-has/)
- [The CSS :has() selector is way more than a “Parent Selector”](https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/)