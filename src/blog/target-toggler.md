---
title: <target-toggler> Web Component
description: A web component to toggle the appearance of page elements.
ogImage: /social/target-toggler.png
date: 2023-12-21
---

There are very rare occasions that I want `<details>` element disclosure widget-style funtionality but would like to have the `<summary>` element detached or live outside of it's related `<details>` container. Typically it's related to design constraints and layout styles: A `<summary>` element appears inline with other controls or content.

- [Source code](https://github.com/hexagoncircle/target-toggler)
- [Demo](https://hexagoncircle.github.io/target-toggler/demo.html)

The gist of this Web Component is to enhance an HTML `<button>` with the ability to toggle an element's visibility anywhere on a page. Simply wrap a button element with this component and supply a `target-id` attribute that matches the `id` of any page element.

```html
<script type="module" src="target-toggler.js"></script>

<target-toggler target-id="more-info">
  <button>Show more info</button>
</target-toggler>

<section>A special announcement</section>

<section id="more-info">
  <!-- some good extra info -->
</section>
```

A `hidden` attribute will be added to the targeted `more-info` element. Now the button toggle can control the visibility of that piece of content. Want that content to be visible by default? Add a `target-visible` attribute.

```html
<target-toggler target-id="more-info" target-visible>
  <button>Show more info</button>
</target-toggler>
```

Be sure to check out [the repo demo page](https://hexagoncircle.github.io/target-toggler/demo.html) for examples of this component in action.

## Improvements

Want to weigh in? [Add a new issue](https://github.com/hexagoncircle/target-toggler/issues/new) to the repo and share your ideas! I highly value any community feedback on how to improve this implementation.