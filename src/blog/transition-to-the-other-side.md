---
layout: post
title: Transition to the Other Side with Container Query Units
description: How container queries help move an element to the opposite side of its parent container when both have dynamic responsive dimensions.
ogImage: /social/transitions-with-container-query-units.png
date: 2025-10-11
---

Managing the position of an element as it travels across the length of its parent container can be tricky. Assuming they both have dynamic, responsive dimensions, we might rely on JS to check the width and/or height of each element and do some calculations for a proper end result. The classic [FLIP technique](/blog/gsap-flip-cart/) has proven to be a solid solution in the past. For a modern approach, the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) can also work well here.

I now realize there's a much simpler approach using [container query units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries#container_query_length_units) and a dash of CSS wizardry.

## The demo

Select the `container query units` option if it's not already, then click and hold the container to witness the magic. Try changing the element dimensions or resizing the parent container using its handle on the bottom right.

{% codepen "https://codepen.io/hexagoncircle/pen/gbPxYaW" %}

[Jump down to the solution](#the-solution) if you'd like to get right into it. Otherwise, join me on a transformative journey to this final result.

## Transition exploration

The following CSS will transition an element smoothly to the right when its parent container is pressed:

```scss
.element {
  transition: transform 200ms ease-out;
}

.parent:active .element {
  transform: translateX(100%);
}
```

Individual transform properties are also available and well supported in modern browsers. I tend to use them more frequently when writing simple transforms like this. In the demo, we'll find the [`translate` property](https://developer.mozilla.org/en-US/docs/Web/CSS/translate) is being transitioned. Let's update the above code example to something similar:

```scss
.element {
  transition: translate 200ms ease-out;
}

.parent:active .element {
  translate: 100%;
}
```

Keep in mind that there's a pre-defined order for independent transform properties. Stefan's article explains [the fundamental differences between transform functions and individual transforms](https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/). Not an issue with our current examples, but something to remember when multiple individual transforms are being applied.
{.callout}

Check out [the demo](#the-demo) with `x` checked and the `percentage` option selected. When we click and hold the container, the element transitions the width of itself to the right. We can see that this percentage is based on the element's dimensions. While handy, it doesn't achieve our goal of moving the element all the way to the opposite side.

### Explicit dimensions

If we knew the exact dimensions of the parent container, we could declare a `calc()` function where the element's full percentage is subtracted from the explicit parent size.

```scss
.parent {
  width: 300px;
}

.element {
  transition: translate 200ms ease-out;
}

.parent:active .element {
  translate: calc(300px - 100%);
}
```

It works, but it's uncommon to have explicit dimensions declared like that. Our elements need to be flexible and responsive in any context. What can we do instead?

### Position properties

Properties like `top` and `left` are available to us. Could we transition the element by doing something like this?

```scss
.element {
  position: relative;
  left: 0;
  transition: 200ms ease-out;
  transition-property: translate, left;
}

.parent:active .element {
  left: 100%;
  translate: -100%;
}
```

Seems that we can, at least in the context of the demo. However, animating position properties has a negative impact on layout and creates performance issues. The browser works harder to recalculate element positions, repaint pixels, and then composite the result. This inevitably leads to janky or sluggish animations. GPU-accelerated properties such as  `transform` and `translate` avoid triggering repaints so animations run buttery-smooth and fluid.

Fair enough. We'll focus on moving the element using transform properties. It's time to reveal the strongest solution.

## The solution

In the demo's controls, check that `container query units` is selected. Click and hold the container. Watch as the element smoothly transitions to the opposite side of the parent container. Try changing the element dimensions using the sliders, or resize the parent with the resize handle on its bottom right. It _still_ works!

Here's the gist when we only need to transition to the opposite side of the parent horizontally.

```scss
.parent {
  container-type: inline-size;
}

.element {
  transition: translate 200ms ease-out;
}

.parent:active .element {
  translate: calc(100cqi - 100%);
}
```

If we want to transition vertically or in both directions, we'll need the `size` value for our [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type) so that containment is applied to the block and inline directions. The example below translates the element along the y-axis.

```scss
.parent {
  container-type: size;
}

.element {
  transition: translate 200ms ease-out;
}

.parent:active .element {
  translate: 0 calc(100cqb - 100%);
}
```

By setting a `container-type` on the parent, the element is able to access the parent size via [container query length units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries#container_query_length_units):

- `1cqi` is 1% of the inline size.
- `1cqb` is 1% of the block size.

Notice that we're using logical properties instead of physical ones. If this isn't familiar territory, I recommend Ahmad's excellent [Digging Into CSS Logical Properties](https://ishadeed.com/article/css-logical-properties/) article to learn more.
{.callout}

`100cqi` is the full inline size of the parent container. We can recall from earlier that a transform percentage reflects the element's dimensions. Once we subtract `100%` from that container query unit, the element can gracefully transition to its proper position on the opposite side of the container.

Take a moment to enjoy the wonder and magic that is modern CSS.

## Helpful resources

- [Container Queries and Units](https://frontendmasters.com/blog/container-queries-and-units/)
- [How to create high-performance CSS animations](https://web.dev/articles/animations-guide)
- [Order in CSS transformations – transform functions vs individual transforms](https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/)
- [Digging Into CSS Logical Properties](https://ishadeed.com/article/css-logical-properties/)