---
layout: post
title: The pixel canvas shimmer effect
description: The one about a Web Component that reveals a shimmering pixel background when its parent element is hovered.
ogImage: pixel-canvas.png
date: 2024-12-03
---

I recently stumbled on a super cool, well-executed hover effect from the [clerk.com](https://clerk.com/) website where a bloom of tiny pixels light up, their glow staggering from the center to the edges of its container. With some available free time over this Thanksgiving break, I hacked together my own version of a pixel canvas background shimmer. It quickly evolved into a `pixel-canvas` Web Component that can be enjoyed in the demo below. The component script and demo code have also been pushed up to a [GitHub repo](https://github.com/hexagoncircle/pixel-canvas).

{% codepen "https://codepen.io/hexagoncircle/pen/KwPpdBZ" %}

## Usage

Include the component script and then insert a `pixel-canvas` custom element inside the container it should fill.

```html
<script type="module" src="pixel-canvas.js"></script>

<div class="container">
  <pixel-canvas></pixel-canvas>
  <!-- other elements -->
</div>
```

The `pixel-canvas` stretches to the edges of the parent container. When the parent is hovered, glimmering pixel fun ensues.

## Options

The custom element has a few optional attributes available to customize the effect. Check out the CodePen demo's html panel to see how each variation is made.

- `data-colors` takes a comma separated set of color values.
- `data-gap` sets the amount of space between each pixel.
- `data-speed` controls the general duration of the shimmer. This value is slightly randomized on each pixel to make give it, in my opinion, a little more character.

There's likely more testing and tweaking necessary before I'd consider using this anywhere, but my goal was to run with this inspiration simply for the joy of coding. What a mesmerizing concept. I tip my hat to the creative engineers over at Clerk.