---
title: Starting Exploration of Scroll-driven Animations in CSS
description: An initial collection of demos and some early learnings about CSS scroll-driven animations.
ogImage: /assets/social/scroll-driven-animations.png
date: 2023-08-21
---

CSS Scroll-driven Animations has recently made its debut on the main stage in the latest versions of Chrome and Edge. Before this module became available, linking an element's animation to a scroll position was only possible through JavaScript. I've been (and still am) a huge fan of [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/) as one way to achieve such an effect. I never imagined it would become a reality in CSS, but this new API lets us hook right into CSS animation `@keyframes` and scrub through the animation progress as we scroll the page.

My article will share demos and some early learnings about scroll-driven animations. If it's all new to you as well, I urge you to read [Animate elements on scroll with Scroll-driven animations](https://developer.chrome.com/articles/scroll-driven-animations/) by Bramus and Michelle Barker's [Scroll progress animations in CSS](https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/). They are both excellent deep dives into this new spec and helped me get a handle on how it works.
{.callout}

I had the chance to noodle around with both timeline types introduced in the [Scroll-driven Animations spec](https://drafts.csswg.org/scroll-animations-1/):

- [Scroll Progress Timeline](https://developer.chrome.com/articles/scroll-driven-animations/#scroll-progress-timeline) is connected to the scroll position of a scroll container along an axis.
- [View Progress Timeline](https://developer.chrome.com/articles/scroll-driven-animations/#view-progress-timeline) links a timeline to the relative position of an element within a scroll container.

When getting started, these [progress visualizer tools](https://scroll-driven-animations.style/#tools) were immensely helpful. They were frequently referenced while I tinkered on scroll timeline animation ideas.

## Experiment #1: Photo figures

I turned to a recent [CodePen Challenge](https://codepen.io/challenges) to begin my exploration, which leans into View Progress Timeline features.  When scrolling the page in the [Photo figures CodePen demo](https://codepen.io/hexagoncircle/full/PoxMPzM), notice that the heading text follows down as it fades out, the first three Polaroid-style photos have a "develop" effect, and the last stack of photos shuffle between themselves.

{% video "/assets/videos/scroll-driven-animations-1", "Scrolling through the <a href='https://codepen.io/hexagoncircle/full/PoxMPzM'>Photo figures CodePen demo</a>" %}

To make this happen, the way we write animation `@keyframes` hasn't changed. Instead, when applying that animation to an element, we introduce two new properties: [`animation-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) and [`animation-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range). Here's the simplified HTML for each "developing" photo as an example:

```html
<figure>
  <div>
    <img class="develop-photo" />
  </div>
  <figcaption></figcaption>
</figure>
```

And the CSS for its scroll-driven animation:

```css
figure {
	view-timeline-name: --photo;
}

.develop-photo {
	animation: linear develop both;
	animation-timeline: --photo;
	animation-range: entry 30% cover 40%;
}

@keyframes develop {
	from {
		filter: blur(30px);
		scale: 1.1;
		opacity: 0;
	}
	to {
		filter: blur(0);
		scale: 1;
		opacity: 1;
	}
}
```

When applying animations to the heading and shuffling photos, declaring `animation-timeline: view()` with an `animation-range` were the magic ingredients to enable scrubbing through animation progress on scroll. The [`view()`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view) function binds the animation to the element as it appears in the viewport on the block axis. This function takes two parameters:

- The [`<axis>`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-timeline-axis) on which the timeline progresses.
- A [`<view-timeline-inset>`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-timeline-inset) that adjusts the position of the box where the element is considered visible.

Since the default values are `block` and `auto` respectively, they can be omitted here.

Back to the example code above, I initially attemped to use the `view()` function on the "developing" photos but had no success. It seems that wrapping the `img` inside a `div` may be the reason—I believe that the `overflow: hidden` rule on the `div` now makes it the nearest scroll container for the `img` element. To get this photo animation working, setting `view-timeline-name` on the parent `figure` and then referencing it via `animation-timeline` ended up being the solution.

As for my chosen `animation-range` values? That was the result of much experimentation, playing with different combinations. I'm still getting the hang of it, but the [Ranges and Progress Animation Visualizer Tool](https://scroll-driven-animations.style/tools/view-timeline/ranges/) proved to be a crucial guide on my journey.

### Additional notes

When working with these new animation properties, there are a few important bits to keep in mind:

- `animation-timeline` is not part of the `animation` shorthand, so it must be declared separately. Also, be sure to have it appear _after_ the `animation` declaration because that shorthand will reset any animation longhand value, including `animation-timeline`.
- An `animation-duration` value in seconds won't affect a scroll progress timeline at all—always set it to `auto`. Since `auto` is the default value for this property, it can be omitted.
- The `both` value represents the `animation-fill-mode`. This ensures the animation follows the `@keyframes` rules fowards and backwards, animating in both directions on the timeline.

## Experiment #2: Weather app prototype

What excites me the most about scroll-driven animations is that it provides us the power to pull off some native-specific animation techniques directly in CSS. For example: the iOS weather app has been part of my daily ritual for quite some time. A lot of the app's animations are perfect for Scroll Progress Timeline! Check out my [Weather app prototype](https://codepen.io/hexagoncircle/full/OJrJZqR) on CodePen.

{% video "/assets/videos/scroll-driven-animations-2", "Scrolling through the <a href='https://codepen.io/hexagoncircle/full/OJrJZqR'>Weather app prototype</a> on CodePen" %}

As explained in the previous demo, the `animation-range` property seems to be very versatile. I've only just scratched the surface of what it can do. In my first attempt to set an `animation-range` on the intro text fades, I used percentage values. Unfortunately, those animations would become slightly misaligned as the scroll container changed in height. In retrospect, that makes sense but, at the time, I had not realized that any [`<length-percentage>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length-percentage) is a valid `animation-range` value. Once I switched from percentages to `rem` units, my animations lined up as expected, regardless of the scroll container height.


## Scroll-driven for more

Something that I dig about both of these demos? The scroll timeline magic acts as a progressive enhancement. That won't always be the case, but it's awesome to see that both demos work as expected without it.

It has been such a thrill being introduced to the delight that is CSS Scroll-driven Animations. With this and [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions/) on the horizon, it seems that simulating native app animation behaviors on the web is upon us. Maybe we'll soon see the end of companies constantly nudging us to download their native apps while we're browing their web app? Maybe they'll let us navigate around their home on the web as we intended without interruption?

Dream big.

## Helpful resources

- [Animate elements on scroll with Scroll-driven animations](https://developer.chrome.com/articles/scroll-driven-animations/)
- [Scroll progress animations in CSS](https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/)
- [scroll-driven-animations.style](https://scroll-driven-animations.style/)
- [CSS scroll-driven animations on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)