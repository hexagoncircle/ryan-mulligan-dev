---
title: Animating with the Flip Plugin for GSAP
description: Initial experimentation with the FLIP animation technique provided by the GreenSock Animation Platform for add-to-cart transitions.
subtitle: Initial experimentation with the FLIP technique to create fun add-to-cart transitions.
ogImage: /assets/social/animating-with-the-flip-plugin-for-gsap.png
date: 2022-01-07
---

## What the flip is it?

Every time a new [GSAP plugin](https://greensock.com/gsap-plugins/) is introduced, I'm close to bursting from excitement. The simplicity of the GreenSock API makes learning and applying these tools in projects such a dream. I had the pleasure of beta testing the [ScrollTrigger plugin](https://greensock.com/scrolltrigger/) and was blown away by how easily I was able to dive in and start creating.

The [Flip plugin](https://greensock.com/docs/v3/Plugins/Flip) is no different. And how about this? As of the [3.9 release](https://greensock.com/3-9/) (Dec 2021), it's no longer a members-only plugin. T'was a [Merry Christmas](https://codepen.io/GreenSock/pen/NWadxaR) indeed!

Before I continue, let's take a moment to celebrate the amazing GreenSock team for the incredible animation tools they provide for our web community. 🙏

## The technique

FLIP, coined by [Paul Lewis](https://aerotwist.com/blog/flip-your-animations/), is an acronym for First, Last, Invert, and Play. The Flip plugin harnesses this technique so that web developers can effortlessly and smoothly transition elements between states. Take it straight from [the plugin's introduction](https://greensock.com/docs/v3/Plugins/Flip):

> Flip records the current position/<wbr>size/<wbr>rotation of your elements, then you make whatever changes you want, and then Flip applies offsets to make them LOOK like they never moved/<wbr>resized/<wbr>rotated and then animates the removal of those offsets! UI transitions become remarkably simple to code. Flip does all the heavy lifting.

I recommend reading [the docs](https://greensock.com/docs/v3/Plugins/Flip) (always!), and watching that intro tutorial video (or jump straight down to their code examples if that's your fancy) to find out how you, too, can produce super sizzlin' layout animations with a minimal amount of code.

## The challenge

The final week's prompt for the [December 2021 CodePen Challenge](https://codepen.io/challenges/2021/december/4) involved using the FLIP technique. This couldn't have lined up more perfectly. The holidays had arrived. The office was quiet. I filled my coffee mug to its very top and, after a few hours of learning and experimentation, came up with this animation prototype:

{% codepen "https://codepen.io/hexagoncircle/pen/RwLQLop" %}

In the above CodePen embed, click on a product item square and it will magically slingshot towards the cart button. Once the element reaches the end of its transition, it will be inserted into the cart alongside other selected products. Click on the cart button to pull its container into view with those selections. Inside this container, clicking items sends them back to their initial positions in the grid.

Building this functionality without the Flip plugin would take quite a bit of time and strategy. GSAP just handles all of that critical code; the rest is left up to our wild imaginations!

Let's get into some of the key features that bring this animation to life.

## How it works

The "Usage" section of the [Flip plugin docs](https://greensock.com/docs/v3/Plugins/Flip) breaks this down into three steps that are followed to execute this add-to-cart animation:

1. Get the current state
2. Make your state changes
3. Call `Flip.from(state, options)`

### Step 1: Capture the state

When an item is selected, Flip's `getState` method is called to collect data about the item's current size, position, rotation, and skew. This gets stored in a variable before applying other DOM edits, style changes, and so on.

```js
const state = Flip.getState(item);
```

The Flip plugin by default only records the following CSS properties: transforms (x, y, scaleX, scaleY, rotation, skewX), width, height, and opacity. However, it can be configured to affect others by adding a `props` property with a comma-delimited list of values in the `options` object. Learn more under the "Usage" section in [the docs](https://greensock.com/docs/v3/Plugins/Flip)!
{.callout}

### Step 2: Make the changes

After capturing the initial state data, the item gets appended as a child of the cart button.

```js
cartBtnWrapper.appendChild(item);
```

### Step 3: FLIP it!

The selected item is ready to animate from its current grid position over to the cart button. Time for the Flip plugin to dazzle us all with its magic. ✨

```js
Flip.from(state, {
  duration: reducedMotion ? 0 : 0.5,
  ease: "back.in(0.8)",
});
```

Flip checks out the stored `state` object, compares it to the item's current state data, and immediately sets the position and size so that the item appears to still exist in its grid placement. Then the item transitions to its _actual_ placement inside the button by animating the removal of these position and size offset values.

I did nearly nothing here. This is all GSAP Flip sorcery. My goodness it's good.

You might be wondering about the `reducedMotion` variable; review its value in the full version of the JavaScript code (click the JS tab in the CodePen embed above). It detects if a user has requested less movement on screen. If true, the item will be instantly added to the cart instead of animating across the page. Learn more about `prefers-reduced-motion` in [this web.dev article](https://web.dev/prefers-reduced-motion/).
{.callout}

In order to get the item to move into the cart once the animation has finished, the `onComplete` callback is used to append the item as a child.

```js
Flip.from(state, {
  duration: reducedMotion ? 0 : 0.5,
  ease: "back.in(0.8)",
  onComplete: () => {
    cartItems.appendChild(item);
  },
});
```

After that, other animations are run such as sliding the item into place and the acrobatic front flip of the count badge. This project is _all_ about the flips. Be sure to jump into the [full JS code](#codepen-demo) for those implementation details.

## Wrapping up

This experiment seems like it only just begins to harness the superpower supplied by the GSAP Flip plugin. I'm looking forward to seeing how you all utilize this in projects. As always, with this great power comes a lot of responsibility. Consider folks that prefer reduced motion or how larger layout animations could affect the overall experience.

Friendly feedback forever welcome. Share with me on [Twitter](https://twitter.com/hexagoncircle/status/1479564224347066368).

### Helpful resources

- [GSAP Flip plugin docs](https://greensock.com/docs/v3/Plugins/Flip)
- [Flip showcase](https://codepen.io/collection/AEkJmd)
- [Flip how-to demos](https://codepen.io/collection/nqvwmG)
- [prefers-reduced-motion: Sometimes less movement is more](https://web.dev/prefers-reduced-motion/)
