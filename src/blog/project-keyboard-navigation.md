---
title: A Horizontal Scroll List and Custom Keyboard Navigation
description: An exploration of component keyboard control and interactions with large sections of focusable content.
subtitle: An exploration of component keyboard control and interactions with large sections of focusable content.
date: 2021-11-15
---

## Getting started

It was time for a personal site refresh. I didn't plan much for this next iteration, but I knew I wanted to include a showcase of [my CodePen projects](https://codepen.io/hexagoncircle). With so many to choose from, it was tough deciding on how I'd ultimately like to visibly display project content. To kick things off, a list of linked cards presented in a horizontal scroll container felt worthy of exploring.

The argument against a carousel-style UX popped in my head, naturally, and maybe I [should not use a carousel](https://shouldiuseacarousel.com/). However, I wanted to try this aesthetic with the following scope in mind:

- An inline overflow of multiple cards provides context for scrolling the x-axis of this section. _Although_, I do recognize some edge case viewport widths where this may not seem overtly obvious.
- When hovering this project section, a scroll bar will appear as another indication that content is horizontally scrollable.
- This layout can be achieved with just HTML and CSS, even utilize [scroll snap properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap).
- It creates a similar experience across all modern input devices and screen sizes.
- We can quickly scan down to the next article on the page without scrolling through a list of 40+ cards, e.g. displayed in a layout such as a traditional responsive grid.

Below is a stripped-down CodePen demo focused on layout and keyboard navigation criteria:
{#codepen-demo}

<p class="codepen" data-height="590" data-default-tab="result" data-slug-hash="QWMZBve" data-user="hexagoncircle">
  <span>See the Pen <a href="https://codepen.io/hexagoncircle/pen/QWMZBve">
  Section keyboard navigation with arrow keys</a> by Ryan Mulligan (<a href="https://codepen.io/hexagoncircle">@hexagoncircle</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Overall, I'd consider this a horizontal scroll container. Not _really_ a carousel. If you're shaking your head, disagree, and have feedback already, I'm looking forward to it! For the sake of getting to the real purpose of this article, let's read on.

## User flow on a keyboard

After building out the page structure, I tried navigating [the site homepage](/) using my keyboard. I quickly noticed how tedious it was tabbing through every single one of those CodePen project links. Perhaps there's a way to make this interaction and page flow feel more seamless.

Experts in the accessibility community may have some really helpful feedback and guidance on these ideas. If you're one of them, I'd love to get your thoughts and update this article accordingly! You can [message me on Twitter](https://twitter.com/hexagoncircle) or <a href="{% mailToPath title %}" target="_blank" rel="noopener">email me</a>.
{.callout}

Let's jump into some solutions. The following is what I had tried with the latter option being the path forward.

### Skip links

My first solution was to introduce a "skip to next section" anchor element that would be focused prior to entering the project list. It's similar to [skip navigation links](https://www.a11ymatters.com/pattern/skip-link/), a common pattern for keyboard navigation and screen readers that allow us to jump directly to the site's main content area.

While inactive, this anchor element is visually hidden on the page. Once focused, the link appears on screen. We can then press the `enter` key and skip over these projects to the next page section containing the `id` used in the `href` attribute.

Using `shift + tab` to navigate back up the page will surface the same issue in reverse. At this point, I debated appending a skip link to the end of the project list. Doing so would lead to something like this:

```html
<section id="above-section">
  <!-- section content -->
</section>

<a href="#below-section">Skip project section</a>
<ul class="projects">
  <!-- 40+ links -->
</ul>
<a href="#above-section">Skip project section</a>

<section id="below-section">
  <!-- section content -->
</section>
```

Hmm. This seems somewhat restrictive and may be confusing. Let's explore a different way to handle this navigation instead of sandwiching the component with these skip elements.

### Custom keyboard control

This iteration explores setting focus on the project list element with [tabindex](https://www.a11yproject.com/posts/2021-01-28-how-to-use-the-tabindex-attribute/). By customizing the `tabindex` on this component, we now have the choice of interacting with this list of links or jumping to the next focusable element on the page.

Here's how it works:

- The script is initialized, and `tabindex="0"` is applied to the project list. This adds it as a focusable element in the document's source order.
- `tabindex="-1"` is set on every project link making them unreachable through sequential keyboard navigation.
- When the list element is focused, the left and right arrow keys become activated to traverse its links.
- The right arrow jumps to the next project link in sequence until it reaches the end, then loops back to the beginning of the list.
- The left arrow focuses the previous project link until it reaches the first item, then it jumps to the end of the list and continues working backwards.

In an effort to better surface this interaction, helper text is inserted into the <abbr title="Document Object Model">DOM</abbr> when the container focus is visible. My screen reader testing has been limited to Voiceover on macOS at the time of writing this article, but it's good to note that with Voiceover enabled, we are given feedback on how to traverse the list using built-in keyboard shortcuts.

{% image "./src/images/projects-list-focus-voiceover-text.png", "A screenshot of the projects list focused and the Voiceover notification", "(min-width: 640px) 50vw, 100vw", "An example of the voiceover notification that reads, 'You are currently on a list. To move between items in this list, press Control-Option-Right Arrow or Control-Option-Left Arrow.'" %}

One final tweak: Elements now scroll completely into view when focused. Without this bit of code, it was possible to focus an element overflowing the boundary of the viewport but it did not pull it all the way on screen. Combining the `scrollIntoView` method with a programmatic focus improves this flow:

```js
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
//...
selected.scrollIntoView({
  block: "nearest",
  inline: "start",
  behavior: reducedMotion.matches ? "auto" : "smooth",
});

selected.focus({ preventScroll: true });
```

Notice that a `prefers-reduced-motion` conditional is applied to the `behavior` option. This will respect our reduced motion settings and disable smooth scrolling of the list.

To review all the code used in setting up these custom keyboard interactions, scroll back up to the embedded [CodePen example](#codepen-demo) from earlier in this article and select the JS tab.
{.callout}

## When JavaScript is disabled

This layout works as intended without JavaScript. The level of control I've added attempts to make it easier to interact with this component, but content is still navigable without it. You can give it a shot by disabling JavaScript in your browser settings. Navigating with your keyboard still works; You'll just have to tab through every project in the list. Mouse and touch scrolling are no different.

## What's your take?

I've made quite a few assumptions here. Does this feel intuitive when navigating using a keyboard? Or is it possible that this may diminish the default flow? Your feedback will help me improve this experience or think about this component behavior differently. [Reach out on Twitter](https://twitter.com/hexagoncircle) or <a href="{% mailToPath title %}" target="_blank" rel="noopener">send me an email</a>.

### Helpful resources

Special thanks to my good friends that gave initial feedback in a draft of this article. Your help is very appreciated! Here are some other supportive resources:

- [Use the tabindex attribute - The A11Y Project](https://www.a11yproject.com/posts/2021-01-28-how-to-use-the-tabindex-attribute/)
- [Optimizing keyboard navigation using tabindex and ARIA](https://www.sarasoueidan.com/blog/keyboard-friendlier-article-listings/)
- [tabindex - HTML: HyperText Markup Language – MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
