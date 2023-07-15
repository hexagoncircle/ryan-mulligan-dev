---
title: CSS Custom Property Fallbacks in Shorthand Values
description: Using fallbacks for CSS custom properties for granular control of shorthand values.
ogImage: /assets/social/css-custom-property-fallbacks.png
date: 2023-07-14
---

CSS Custom Properties are incredibly versatile and have become especially useful as customizable props in common layout and component style patterns. Here's an example derived from the [SmolCSS](https://smolcss.dev/#smol-css-grid) site:

```css
.grid {
  --min: 15ch;
  --gap: 1rem;

  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
}
```

The `--gap` and `--min` custom property values can be customized by declaring new values for those properties, whether it's through inline styles or a custom CSS ruleset:

```html
<!-- inline style -->
<ul class="grid" style="--gap: 2rem">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<!-- custom ruleset -->
<style>
  .super-cool-list {
    --gap: 2rem;
  }
</style>
<ul class="super-cool-list grid">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

Remember! The `super-cool-list` styles needs to be declared _after_ the `grid` ruleset in the stylesheet. Otherwise the default `--gap` value inside `grid` would win with higher precedence. I'm a fan of using [CSS cascade layers](https://css-tricks.com/css-cascade-layers/) where layout primitives like `grid` would reside in a lower priority layer than component-specific styles.
{.callout}

I absolutely love this concept of altering layouts through exposed props like the example above. But what if we desired the ability to provide independent values for the horizontal and vertical spacing between each item? This is where a key feature of CSS custom properties comes into play: [fallback values](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#custom_property_fallback_values). In the revised version of the above code snippet, The `--gap` value declared at the start of the ruleset becomes the fallback—or default value—for two new variables.

```css
.grid {
  --min: 15ch;
  --gap: 1rem;
  --row-gap: initial;
  --column-gap: initial;

  display: grid;
  gap: var(--row-gap, var(--gap)) var(--column-gap, var(--gap));
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
}
```

The [`gap` property](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) is shorthand for `row-gap` and `column-gap` respectively. With these values now split, we can pass in an override value to either axis.

```html
<ul class="grid" style="--row-gap: 2rem">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

The gap spacing between each row of items will now be `2rem` while the columns stick to the default `--gap` size of `1rem`.

## Guaranteed-invalid values

`--row-gap` and `--column-gap` are both set to the `initial` keyword because it's a [guaranteed-invalid value](https://drafts.csswg.org/css-variables/#guaranteed-invalid-value) in custom properties. This means that these two custom property values will become invalid at computed-value time and revert to a fallback if one is available. I think this concept is summed up nicely in [a snippet from this article](https://css-tricks.com/using-custom-property-stacks-to-tame-the-cascade/):

> [...] rather than being passed along to set `background: initial` or `color: initial`, the custom property becomes `undefined`, and we fallback to the next value in our stack [...]

In the example above, since `--row-gap` and `--column-gap` are undefined through the `initial` keyword, the fallback `--gap` value is applied.

## Why not only use fallbacks?

Custom properties can have more than one fallback value—a concept Miriam Suzanne refers to as [custom property "stacks" in this article](https://css-tricks.com/using-custom-property-stacks-to-tame-the-cascade/), which I love. It's also where I discovered how `initial` works in custom properties as mentioned above.

So then if custom properties can have multiple fallback values, could we instead write our CSS like this?

```css
.grid {
  display: grid;
  gap: var(--row-gap, var(--gap, 1rem)) var(--column-gap, var(--gap, 1rem));
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min, 15ch)), 1fr));
}
```

This works as one would expect. However, keep in mind that on the occasion there is a nested element that uses the `grid` selector, that element would inherit the `--gap` set on the parent.

```html
<ul class="grid" style="--gap: 2rem">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>
    Item 3
    <!-- This <ul> will also have a 2rem gap -->
    <ul class="grid">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </li>
</ul>
```

By setting `--gap` at the top of the `grid` ruleset, the nested element's gap value will reset to that declared default. I personally prefer this. I can imagine headaches may come from having a very deeply (hopefully not too deep!) nested element where the gap value is different than the presumed default. It wouldn't be immediately clear, especially in a componentized codebase.

## Inheritance is a good thing

**This content has been revised on July 15th** after a valid argument was made on [my Mastodon post sharing the article](https://fosstodon.org/@hexagoncircle/110713633805281051) in favor of inheriting ancestor custom property values:

> Isn’t inheritance of custom properties a good thing? I thought that’s how they’re meant to be used. Setting a custom property _once_ on an outer container, and then it inherits to _all_ the nested components. I’m not sure that intentionally breaking this system is a good idea.

Excellent point, and agreed: Inheritance of custom properties is a good thing. This has certainly given me some pause on my preferred approach. I had imagined layout primitives such as the `grid` example would set ideal default values every time the selector is applied. Instead, when inheriting properties on a nested element, we would then have to add a "reset" value to revert it back, which arguably may be the optimal method.

```html
<ul class="grid" style="--gap: 2rem">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>
    Item 3
    <!-- Revert the value on this element -->
    <ul class="grid" style="--gap: 1rem">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </li>
</ul>
```

What do you think? Please feel free to join us on [the Mastadon thread](https://fosstodon.org/@hexagoncircle/110713633805281051) with your opinions and feedback. Also, check out [this CodePen](https://codepen.io/hexagoncircle/pen/ExOEjGG) if you'd like to experiment with the different methods described here.

## Helpful resources

- [Every Layout](https://every-layout.dev/) has been a key staple in my layout style diet and I highly recommend going through all of it if you haven't already.
- [SmolCSS](https://smolcss.dev/) is a fantastic, robust collection of modern layout and component snippets. A must-bookmark for many revisits.
- [Using Custom Property “Stacks” to Tame the Cascade](https://css-tricks.com/using-custom-property-stacks-to-tame-the-cascade/)—a special thanks to Miriam's article for introducing me to some amazing, new (to me) custom property concepts.