---
layout: post
title: Web Components for Password Input Enhancements
description: A set of custom elements for rule checking and toggling the value visibility of an HTML password input.
ogImage: /social/password-input-components.png
date: 2024-09-20
---

So there I was, experimenting with HTML password inputs and Web Components. I'm not sure why the idea even came up but it quickly snowballed into a curious expedition. The result from the journey was a set of custom elements that provide extra functionality and information about the text being typed into a password input field. I shared my [CodePen demo](https://codepen.io/hexagoncircle/pen/LYKKjmj) in a [Mastodon post](https://fosstodon.org/@hexagoncircle/113164872411660242) and soon after decided to push these scripts up to a [GitHub repo](https://github.com/hexagoncircle/password-input-components).

{% codepen "https://codepen.io/hexagoncircle/pen/LYKKjmj" 450 %}

## Get started

The repo includes two Web Component scripts. They operate independent of one another. I recommend reading through [the repo documentation](https://github.com/hexagoncircle/password-input-components/blob/main/README.md) but here's a rundown of what's included.

- `<password-rules>` adds an `input` event listener to capture when a list of rules (password length, includes an uppercase letter, etc.) are matched as the user is typing in their new password.
- `<password-toggle>` shows and hides the password input value on click.

To get started, add the scripts to a project and include them on the page.

```html
<script type="module" src="path/to/password-rules.js"></script>
<script type="module" src="path/to/password-toggle.js"></script>
```

Below is an example of using both custom elements with a password input.

```html
<label for="new-password">Password</label>
<input type="password" id="new-password" />
<div id="status" aria-live="polite"></div>

<password-toggle data-input-id="new-password" data-status-id="status">
  <button type="button">Toggle password visibility</button>
</password-toggle>

<password-rules data-input-id="new-password" data-rules=".{9}, [A-Z], .*\d">
  <ul>
    <li data-rule-index="0">Longer than 8 characters</li>
    <li data-rule-index="1">Includes an uppercase letter</li>
    <li data-rule-index="2">Includes a number</li>
  </ul>
</password-rules>
```

## Password toggle

`password-toggle` expects a `button` element to be inside it. This button will be augmented with the ability to toggle the visibility of the input field's value.

When the toggle button is clicked, the "status" element containing the [`aria-live`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) attribute will send a notification to screen readers that the password value is currently visible or hidden. For instance, when clicking for the first time, the string "Password is visible" is inserted into the container and announced by a screen reader.

We can also style the toggle button when it enters its _pressed_ or "visible password" state. In the [CodePen demo](https://codepen.io/hexagoncircle/pen/LYKKjmj), this is how the eye icon (aye aye!) is being swapped.

```scss
button svg:last-of-type {
  display: none;
}

button[aria-pressed="true"] {
  svg:first-of-type {
    display: none;
  }
  svg:last-of-type {
    display: block;
  }
}
```

Targeting the `[aria-pressed]` attribute selector ensures that our styles stay in sync with their accessibility counterpart. It also means that we don't need to manage a semantic attribute value as well as some generic class selector like "is-active". Ben Myers shares great knowledge on this subject in [Style with stateful, semantic selectors](https://benmyers.dev/blog/semantic-selectors/). A must-have in the bookmarks 🏆
{.callout}

## Password rules

The `password-rules` element is passed a comma-separated list of [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) strings, each related to a specific rule. We also have the option to connect any child element to a rule by passing the index of that string to a `data-rule-index` attribute. The placement or type of element doesn't matter as long as it's contained within the `password-rules`.

Here's an alternate version to drive that point home:

```html
<password-rules data-input-id="new-password" data-rules=".{8}, [A-Z], .*\d">
  <div class="one-column" data-rule-index="0">
    Longer than 8 characters
  </div>
  <div class="two-columns">
    <span data-rule-index="2">Includes a number</span>
    <span data-rule-index="1">Includes an uppercase letter</span>
  </div>
</password-rules>
```

### Check it off

When a rule is met that matches the `data-rule-index` value on an element, an `is-match` class gets added to the element. The [demo](https://codepen.io/hexagoncircle/pen/LYKKjmj) styles use this selector to add a checkmark emoji when present.

```scss
.password-rules__checklist .is-match::before {
  content: "✅";
}
```

### score/total

The current password "score" and rules "total" are passed to the custom element as data attributes and CSS variables. The score value updates as rules are met. This allows us to do some fancy things like change the colors in a score meter and present the current tally. All of it done with CSS.

```scss
/** Incrementally adjust background colors */
password-rules[data-score="1"] .password-rules__meter :first-child,
password-rules[data-score="2"] .password-rules__meter :nth-child(-n + 2),
password-rules[data-score="3"] .password-rules__meter :nth-child(-n + 3),
password-rules[data-score="4"] .password-rules__meter :nth-child(-n + 4) {
  background-color: dodgerblue;
}

/** When all rules are met, swap to a new color for each meter element */
password-rules[data-score="5"] .password-rules__meter :nth-child(-n + 5) {
  background-color: mediumseagreen;
}
```

CSS variables are passed into a [CSS `counter()`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters) to render the current score and total.

```scss
.password-rules__score::before {
  counter-reset: score var(--score, 0) total var(--total, 5);
  content: counter(score) "/" counter(total);
}
```

I added fallback values to the CSS variables when I realized that the `--total` value, specifically, renders as `0` on page load and doesn't update until we begin typing in the input field. I did discover that we could skip the fallback by registering the custom property. This ensures the total is correctly reflected when the component initializes. But, to be honest, this feels unnecessary when the fallback here will suffice.

```scss
@property --total {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}
```

If this @property stuff is unfamiliar, Stephanie Eckles has got you covered in [Providing Type Definitions for CSS with @property](https://moderncss.dev/providing-type-definitions-for-css-with-at-property/). Another one to bookmark! I've also recently spent time with this newly supported at-rule in [CSS @property and the New Style](/blog/css-property-new-style/).
{.callout}


## Progressively enhanced for the win

I believe this tells a fairly nice progressive enhancement story. Without JavaScript, the password input still works as expected. But when these scripts run, users get additional feedback and interactivity. Developers get access to extra selectors that can be useful for styling state changes. And listen, I get it–there are better ways to handle client-side form validation, but this was a fun exploration nonetheless.