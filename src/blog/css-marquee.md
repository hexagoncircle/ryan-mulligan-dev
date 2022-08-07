---
title: The Infinite Marquee
description: A responsive looping marquee-style animation using HTML and CSS
subtitle: A responsive looping marquee-style animation using HTML and CSS
date: 2022-08-06
---

## The deprecated tag

The HTML `<marquee>` element had blessed (cursed?) the early days of the internet with the ability to insert scrolling text onto a webpage. It even included options to control text behavior once it reached the end of its container with a handful of attributes. Review them [here on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee) if you're curious. Also, when visiting that MDN link, notice the page starts with a deprecation warning that this feature is no longer recommended:

> Avoid using it, and update existing code if possible [...] Be aware that this feature may cease to work at any time.

A handful of usability concerns led to `<marquee>` eventually being nixed. They can be too distracting, don't respect reduced-motion preferences, and in most cases render text unreadable. Things get really out of hand if there are multiple `<marquee>` visible on screen like [this example](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee#examples) from MDN.

Fun? Maybe. But maybe don't do that.

## A modern approach

Now that we've gleaned a tiny slice of web history, it's arguable that a marquee-style animation can inject some pop to a page when done responsibly. Developers have discovered a few ways of reimagining the concept, the most popular accomplished with HTML and CSS. In this scenario, content is duplicated to create the illusion of it looping indefinitely. Here's a stripped-down example:

```html
<div class="marquee">
  <ul class="marquee__content">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  <!-- Mirrors the content above -->
  <ul class="marquee__content" aria-hidden="true">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>
```

Be sure to set `aria-hidden="true"` to hide any repeated or redundant content from screen readers.
{.callout}

The marquee concept has been done plenty of times and may seem old hat. However, most of the examples I came across weren't fully responsive. Many rely on a fixed-width parent or having enough elements to overflow the container for a seamless loop. What if, when the parent container is wider than the content overflow, the items spread themselves out so that the loop works at any size? I experimented with a few ideas to see what's possible in making this concept more flexible.

Here are the responsive styles that correspond to the HTML code block above:

```css
.marquee {
  --gap: 1rem;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
}

.marquee__content {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  min-width: 100%;
  gap: var(--gap);
}
```

To get a better sense of what's happening, open up [this CodePen demo](https://codepen.io/hexagoncircle/pen/eYMrGwW){target="\_blank"}. Try turning each CSS rule off and on to see how it affects the marquee. Adjust the amount of items in the marquee's HTML. Watch how they spread out as the viewport widens or naturally overflow as it narrows.

Allow me to explain what this CSS is doing.

- A flexbox display is applied to both the `.marquee` parent and `.marquee__content` child containers. This places every item on a single row without any wrapping.
- There is a hidden overflow set on the parent. When the animation loops, the overflow conceals the elements snapping back to their start positions.
- `user-select: none` disables highlighting or selecting text inside the marquee.
- `flex-shrink: 0` prevents the child containers from shrinking, avoiding overlap of content.
- `min-width: 100%` stretches each child container to the parent width. With this rule, the first child container is visible while the duplicate container is hidden in the overflow.
- `justify-content: space-around` evenly distributes space between each child container item, then applies half of that as empty space before the first item and after the last.

As items begin to overflow, gaps can be set to create room between each item. Gap values for the parent and child containers will need to match; Well that's a perfect case for defining a new [CSS custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)! The `gap: var(--gap)` declaration supplies the space between each item when content overflows the parent plus space between the two child containers. This variable also comes in handy to offset the end position in the animation precisely:

```css
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
```

Without including `var(--gap)` in this calculation, there would be a visible misalignment when the animation loops. Try updating the value to `translateX(-100%)` to see the issue.

The appearance of an infinite loop happens by animating the first child container completely out into the overflow while simultaneously pulling the duplicate container all the way into view. When the animation restarts, the first container picks up where the last left off. The illusion is complete! Yet it's also neverending... 😮

## Important considerations

Really examine the use case for a marquee. They can be incredibly distracting and disorienting when implemented poorly.

- Use them sparingly. Overloading a page with a bunch of auto-scrolling areas is never a good time.
- Marquee content should be purely decorative. Leave out important page copy and focusable elements.
- Animation speeds should be slow. Content scrolling by super fast can be nauseating even for those that don't have reduced-motion enabled.
- Respect reduced-motion preferences. If set, best bet would be to completely disable auto-scrolling.

## Welcome to the demo zone

Here are a couple of CodePen ideas I had thrown together while experimenting with marquee animations. The [logo wall](https://codepen.io/hexagoncircle/full/wvmjomb) is especially fun, introducing reverse animations and the ability to toggle the axis for a vertical marquee.

- [CSS Marquee Logo Wall](https://codepen.io/hexagoncircle/full/wvmjomb)
- [The Dogs of Unsplash](https://codepen.io/hexagoncircle/full/jOzZPJw)
- [CSS Marquee Examples](https://codepen.io/hexagoncircle/full/eYMrGwW)

## Explore more resources

- [`<marquee>` elements are deprecated and must not be used](https://dequeuniversity.com/rules/axe/4.1/marquee)
- [CSS-Only Marquee Effect](https://tympanus.net/codrops/2020/03/31/css-only-marquee-effect/)
- [Modern and Accessible `<marquee>` with TailwindCSS](https://olavihaapala.fi/2021/02/23/modern-marquee.html)
