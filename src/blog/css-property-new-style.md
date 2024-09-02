---
layout: post
title: "CSS @property and the New Style"
description: An exploration of the newly supported at-rule for explicitly defining and animating custom properties in CSS.
ogImage: /social/css-property-new-style.png
date: 2024-09-02
---

The [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) at-rule has recently gained support across all modern browsers, unlocking the ability to explicitly define a syntax, initial value, and inheritance for CSS custom properties. It seems like forever ago that CSS Houdini and its [CSS Properties and Values API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API) were initially introduced. I experimented sparingly over time, reading articles that danced around the concepts, but I had barely scratched the surface of what `@property` could offer. The ensuing demo explores what's possible in the next generation of CSS.

## Calls to action

Ever seen those sleek, attention-seeking, shiny call-to-action webpage elements? Waves of sites across the web, especially the ones marketing services and software urging for you to "Upgrade your account" or "Sign up today," have discovered the look and latched on. I'm not here to knock it and admittedly think it's kind of fresh. I thought I'd give that style a try myself. Check out the result in the CodePen below.

{% codepen "https://codepen.io/hexagoncircle/pen/MWMqXbK??editors=0100", 500 %}

There's a ton to unpack in this demo. Let's start with that shine looping around the button. Toggle open the demo's CSS panel to find a collection of `@property` rules related to those custom properties that need to animate. Here's the one defined for the `--gradient-angle`:

```scss
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
```

The `@property` rule communicates to the browser that [`<angle>`](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) is the allowed syntax for this custom property and its initial value is `0deg`. This enables the browser to smoothly transition from `0deg` to `360deg` and output a rotating gradient.

```scss
@keyframes rotate-gradient {
  to { --gradient-angle: 360deg; }
}

.rotate-gradient {
  background: conic-gradient(from var(--gradient-angle), transparent, black);
  animation: rotate-gradient 10s linear infinite;
}
```

I put together a simple gradient spin demo to focus on the handful of lines necessary to render this concept.

{% codepen "https://codepen.io/hexagoncircle/pen/eYwLqJx", 300, result, true %}

We can achieve the shiny animated border effect by evolving this code a bit. We'll introduce a `linear-gradient` as the first value of the element's `background` property and set a [`background-origin`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin) to each value.

- The origin of the `linear-gradient` is set to `padding-box`. This prevents the gradient from spilling into the border area.
- The `conic-gradient` origin is set to `border-box`. This gradient overflows into the space created by the border width.
- To reveal the rotating `conic-gradient`, a single-pixel transparent border is added.

```scss
.border-gradient {
  background: 
    linear-gradient(black, black) padding-box,
    conic-gradient(from var(--gradient-angle), transparent 25%, white, transparent 50%) border-box;
  border: 1px solid transparent;
}
```

In the CSS panel of the [simple gradient spin demo](#cp_embed_eYwLqJx), uncomment the `.border-gradient` ruleset to reveal the shiny animated border. Looking pretty slick! For more examples, I've included a bunch of animated gradient border articles in the [resources section](#helpful-resources) at the end of the post.

## Silky smooth hover transitions

A few special ingredients help facilitate a buttery smooth gradient transition when the element is hovered. Let's dig into its `background` values:

```scss
.shiny-cta {
  background: 
    linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
    conic-gradient(
        from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
        transparent,
        var(--shiny-cta-highlight) var(--gradient-percent),
        var(--gradient-shine) calc(var(--gradient-percent) * 2),
        var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
        transparent calc(var(--gradient-percent) * 4)
      )
      border-box;
}
```

Since each custom property that needs to animate has its proper syntax set in its `@property` rules, the browser can interpolate between corresponding value changes and transition seamlessly. The size of the shiny area is determined by the `--gradient-percent` value. On hover, a higher percentage lengthens the shine. The `--gradient-angle-offset` value is used to readjust the gradient angle so that the shine doesn't rubber band back and forth on hover.

{% video "/videos/shiny-cta-angle-offset", "Demonstrating the transition behavior without the angle offset value" %}

I had to fine-tune the percent and offset values until the shine length and transition felt optically aligned. Finally, the `--gradient-shine` brightness gets toned down to blend more seamlessly with the adjacent highlight colors.

## Slow it on down

This [CSS tip to slow down a rotation on hover](https://css-tip.com/slow-down-rotation/) truly blew my mind. In the tip's example code, the same rotate animation is declared twice. The second one is reversed and paused, its duration divided in half. When the element is hovered, `animation-play-state: running` overrides the `paused` value and slows the rotation to half speed. The mind-blowing part, at least to me, is that the animation speeds back up at the current position when the element is no longer hovered. No snapping back to a start position, no extra wrapper elements necessary. That is one heck of a tip.

[The article demo](#cp_embed_MWMqXbK) relies on this method to slow down animations when the button is hovered. This technique keeps all the rotations and movements in sync as they change speed.

## Tiny shiny dots

Looking even closer, we'll discover pinhole-sized dots shimmering inside the button as the shiny border passes near them. To render this dot pattern, a `radial-gradient` background is created.

```scss
.shiny-cta::before {
  --position: 2px;
  --space: calc(var(--position) * 2);
  background: radial-gradient(
      circle at var(--position) var(--position),
      white calc(var(--position) / 4),
      transparent 0
    )
    padding-box;
  background-size: var(--space) var(--space);
  background-repeat: space;
}
```

Remember that `--gradient-angle` custom property? It has returned! But this time, it's being used in a `conic-gradient` mask that reveals parts of the dot pattern as it rotates. The gradient angle is offset by 45 degrees to align it perfectly with the shiny border rotation.

```scss
.shiny-cta::before {
  mask-image: conic-gradient(
    from calc(var(--gradient-angle) + 45deg),
    black,
    transparent 10% 90%,
    black
  );
}
```

For one last touch of magic, a gradient containing the highlight color is added to the `::after` pseudo element, spinning in unison with the shine area. These highlights flowing through the button add a pleasant, welcoming ambience it was previously missing.

## Enhancing the hover colors

The hover styles looked decent. But they didn't seem totally finished. I felt the desire to enhance. Create more depth. [Make it pop, as they say](https://ryanmulligan.dev/blog/detect-js-support-in-css/#:~:text=%22Make%20it%20pop!%22).

The button's `::before` and `::after` pseudo elements were already in use so I wrapped the button text in a `span` element. A blurred `box-shadow` containing the highlight color is applied to one of its pseudo elements which is then expanded to fill the button dimensions. On hover, the pseudo element slowly scales up and down, evoking a vibe similar to relaxed breathing. Paired with the spinning highlight color inside the button, the effect finally resonated with me. This intricately designed call-to-action button felt complete.


## In with the new style

Many of the above techniques would have been nearly impossible only a short time ago. Explicitly defining custom properties unlocks a great big world of opportunity. I'm especially eager to see how `@property` will be utilized in large-scale applications and design systems. Adam Argyle's [Type safe CSS design systems with @property](https://nerdy.dev/cant-break-this-design-system) is just one glimpse into a really promising future for publishing our CSS.

## Helpful resources

- [Animated CSS gradient borders (no JavaScript, no hacks)](https://www.learnwithjason.dev/blog/animated-css-gradient-border/)
- [Creating an animated gradient border with CSS](https://ibelick.com/blog/create-animated-gradient-borders-with-css)
- [CSS border animations](https://web.dev/articles/css-border-animations)
- [Animating a CSS Gradient Border](https://www.bram.us/2021/01/29/animating-a-css-gradient-border/)
- [CSS border ripple effect](https://codepen.io/hexagoncircle/full/LYKJPjm)
- [The Times You Need A Custom @property Instead Of A CSS Variable](https://www.smashingmagazine.com/2024/05/times-need-custom-property-instead-css-variable/)
- [@property: Next-gen CSS variables now with universal browser support](https://web.dev/blog/at-property-baseline)