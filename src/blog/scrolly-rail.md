---
layout: post
title: Scrolling Rails and Button Controls
description: A horizontal snap scroll custom element enhanced with button controls that pull the previous or next set of items into view.
ogImage: /social/scrolling-rails-and-button-controls.png
date: 2024-12-23
---

Once again, here I am, hackin' away on horizontal scroll ideas. This iteration starts with a custom HTML tag. All the necessities for scroll overflow, scroll snapping, and row layout are handled with CSS. Then, as a little progressive enhancement treat, `button` elements are connected that scroll the previous or next set of items into view when clicked.

Behold! The holy grail of scrolling rails... the `scrolly-rail`!

- [CodePen demo](https://codepen.io/hexagoncircle/full/yyBMGrL)
- [GitHub repo](https://github.com/hexagoncircle/scrolly-rail)

{% codepen "https://codepen.io/hexagoncircle/pen/yyBMGrL" %}

I'm being quite facetious about the "holy grail" part, if that's not clear. 😅 This is an initial try on an idea I'll likely experiment more with. I've shared some thoughts on potential [future improvements](#future-improvements) at the end of the post. With that out of the way, let's explore!

## The HTML

Wrap any collection of items with the custom tag:

```html
<scrolly-rail>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <!-- and so on-->
  </ul>
</scrolly-rail>
```

While it is possible to have items without a wrapper element, if the custom element script runs and button controls are connected, _sentinel_ elements are inserted at the start and end bounds of the scroll container. Wrapping the items makes controlling spacing between them much easier, avoiding any undesired gaps appearing due to these sentinels. We'll discover [what the sentinels are for](#observing-inline-scroll-bounds) later in the post.
{.callout}

## The CSS

Here are the main styles for the component:

```scss
scrolly-rail {
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;

  @media (prefers-reduced-motion: no-preference) {
    scroll-behavior: smooth;
  }
}
```

- When JavaScript is enabled, sentinel elements are inserted before and after the unordered list (`ul`) element in the HTML example above. Flexbox ensures that the sentinels are positioned on either side of the element. We'll find out why later in this post.
- Containing the [overscroll behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior#contain) will prevent us accidentally triggering browser navigation when scrolling beyond either edge of the `scrolly-rail` container.
- [`scroll-snap-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) enforces mandatory scroll snapping.
- Smooth scrolling behavior applies when items scroll into view on button click, or if interactive elements (links, buttons, etc.) inside items overflowing the visible scroll area are focused.

Any wrapper element, such as the example `ul`, will need a flex display to position items in a single row and introduce gap spacing if desired. Then [`scroll-snap-align: start`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align) is applied to each item. This aligns the targeted snap item to the inline start of the component's scroll snap area. In the HTML example, this would apply to the `li` elements.

```scss
scrolly-rail ul {
  display: flex;
  gap: 1rem;
}

scrolly-rail li {
  scroll-snap-align: start;
}
```

As mentioned earlier, this is everything our component needs for layout, inline scrolling, and scroll snapping. Note that the [CodePen demo](https://codepen.io/hexagoncircle/pen/yyBMGrL) takes it a step further with some additional padding and margin styles (check out the demo CSS panel). If we'd like to wire up previous/next controls, we'll need to include the custom element script in our HTML.

## The custom element script

Add the script file on the page.

```html
<script type="module" src="scrolly-rail.js"></script>
```

To connect the previous/next `button` elements, give each an `id` value and add these values to the `data-control-*` attributes on the custom tag.

```html
<scrolly-rail
  data-control-previous="btn-previous"
  data-control-next="btn-next"
>
  <!-- ... -->
</scrolly-rail>

<button id="btn-previous" class="btn-scrolly-rail">Previous</button>
<button id="btn-next" class="btn-scrolly-rail">Next</button>
```

Now clicking these buttons will pull the previous or next set of items into view. The amount of items to scroll by is based on how many are fully visible in the scroll container. For example, if we see three visible items, clicking the "next" button will scroll the subsequent three items into view.

### Observing inline scroll bounds

Let's review the demo's top component. As we begin to scroll to the right, the "previous" button appears. Scrolling to the component's end causes the "next" button to disappear. Similarly we can see the bottom component's buttons fade when their respective scroll bound is reached.

Recall the sentinels discussed earlier in this post? With a little help from the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), the component watches for either sentinel intersecting the visible scroll area, indicating that we've reached a boundary. When this happens, a `data-bound` attribute is toggled on the corresponding `button` element. This presents an opportunity to alter styles and provide additional visual feedback.

```scss
.btn-scrolly-rail {
  /** default styles */
}

.btn-scrolly-rail[data-bound] {
  /* styles to apply to button at boundary */
}
```

## Future improvements

I'd love to hear from the community most specifically on improving the accessibility story here. Here are some general notes:

- I debated if button clicks should pass feedback to screen readers such as "Scrolled next three items into view" or "Reached scroll boundary" but felt unsure if that created unforeseen confusion.
- For items that contain interactive elements: If a new set of items scroll into view and a user tabs into the item list, should the initial focusable element start at the snap target? This could pair well with [navigating the list using keyboard arrow keys](https://codepen.io/hexagoncircle/pen/LYawJVP).
- Is it worth authoring intersecting sentinel "enter/leave" events that we can listen for? Something like: Scroll bound reached? Do a thing. Leaving scroll bound? Revert the thing we just did or do another thing. _Side note:_ prevent these events from firing when the component script initializes.
- How might this code get refactored once [scroll snap events](https://developer.chrome.com/blog/scroll-snap-events) are widely available? I imagine we could check for when the first or last element becomes the snap target to handle toggling `data-bound` attributes. Then we can remove Intersection Observer functionality.

And if any folks have other scroll component solutions to share, please reach out or [open an issue](https://github.com/hexagoncircle/scrolly-rail/issues) on the repo.