---
layout: post
title: Some Things About Keyframes
description: A few lesser-known bits about CSS keyframe animations, from handling duplicate keyframe properties to customizing timing function easings within keyframe rulesets.
ogImage: /social/some-things-about-keyframes.png
date: 2024-12-30
---

Whether you've barely scratched the surface of keyframe animations in CSS or fancy yourself as a seasoned pro, I suggest reading [An Interactive Guide to Keyframe Animations](https://www.joshwcomeau.com/animation/keyframe-animations/). Josh (as always) does an impeccable deep dive that includes interactive demos for multi-step animations, loops, setting dynamic values, and more.

This is a quick post pointing out some other minor particulars:

1. Duplicate keyframe properties
2. The order of keyframe rules
3. Custom timing function (easing) values at specific keyframes

## Duplicate keyframe properties

Imagine an "appearance" animation where an element slides down, scales up, and changes color. The starting `0%` keyframe sets the element's y-axis position and scales down the size. The element glides down to its initial position for the full duration of the animation. About halfway through, the element's size is scaled back up and the background color changes. At first, we might be tempted to duplicate the `background-color` and `scale` properties in both `0%` and `50%` keyframe blocks.

```css
@keyframes animate {
  0% {
    background-color: red;
    scale: 0.5;
    translate: 0 100%;
  }
  50% {
    background-color: red;
    scale: 0.5;
  }
  100% {
    background-color: green;
    scale: 1;
    translate: 0 0;
  }
}
```

Although this functions correctly, it requires us to manage the same property declarations in two locations. Instead of repeating, we can share them in a comma-separated ruleset.

```css
@keyframes animate {
  0% {
    translate: 0 100%;
  }
  0%, 50% {
    background-color: red;
    scale: 0.5;
  }
  100% {
    background-color: green;
    scale: 1;
    translate: 0 0;
  }
}
```

## Keyframe rules order

Another semi-interesting qwirk is that we can rearrange the keyframe order.

```css
@keyframes animate {
  0% {
    translate: 0 100%;
  }
  100% {
    background-color: green;
    scale: 1;
    translate: 0 0;
  }
  /* Set and hold values until halfway through animation */
  0%, 50% {
    background-color: red;
    scale: 0.5;
  }
}
```

["Resolving Duplicates" from the MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes#resolving_duplicates) mentions that `@keyframes` rules don't cascade, which explains why this order still returns the expected animation. Customizing the order could be useful for grouping property changes within a `@keyframes` block as an animation becomes more complex.

That same section of the MDN docs also points out that cascading _does_ occur when multiple keyframes define the same percentage values. So, in the following `@keyframes` block, the second `translate` declaration overrides the first.

```css
@keyframes animate {
  to {
    translate: 0 100%;
    rotate: 1turn;
  }
  to {
    translate: 0 -100%;
  }
}
```

## Keyframe-specific easing

Under ["Timing functions for keyframes"](https://www.w3.org/TR/css-animations-1/#timing-functions) from the CSS Animations Level 1 spec, we discover that easing can be adjusted within a keyframe ruleset.

> A keyframe style rule may also declare the timing function that is to be used as the animation moves to the next keyframe.

Toggle open the CSS panel in the ensuing CodePen demo and look for the `@keyframes` block. Inside one of the percentages, a custom easing is applied using the [`linear()` CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear) to give each element some wobble as it lands.

{% codepen "https://codepen.io/hexagoncircle/pen/yyBozpm", "500" %}

I think that looks quite nice! Adding keyframe-specific easing brings an extra layer of polish and vitality to our animations. One minor snag, though: We can't set a CSS variable as an `animation-timing-function` value. This unfortunately means we're unable to access shared custom easing values, say from a library or design system.

```css
:root {
  --easeOutCubic: cubic-bezier(0.33, 1, 0.68, 1);
}

@keyframes {
  50% {
    animation-timing-function: var(--easeOutCubic);
  }
}
```

## Helpful resources

- [An Interactive Guide to Keyframe Animations](https://www.joshwcomeau.com/animation/keyframe-animations/)
- [@keyframes on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
- [Easing Functions Cheat Sheet](https://easings.net/)
- [Linear easing generator](https://linear-easing-generator.netlify.app/)
- [The Path To Awesome CSS Easing With The `linear()` Function](https://www.smashingmagazine.com/2023/09/path-css-easing-linear-function/)