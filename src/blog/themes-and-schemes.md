---
title: Website Themes and Color Schemes
description: In this post I share how I created theme variants based on light and dark mode preferences.
subtitle: Tailoring site themes based on light and dark mode preferences
ogImage: /social/website-themes-and-color-schemes.png
date: 2022-02-01
---

## Getting into the mode

Before we begin, I'd like to preface this article with the following resources that were helpful guides on my theming quest. They explain a lot of the intricacies of setting up dark mode and I recommend reading them before my own.

- [A Complete Guide to Dark Mode on the Web](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)
- [Quick and Easy Dark Mode with CSS Custom Properties](https://css-irl.info/quick-and-easy-dark-mode-with-css-custom-properties/)
- [Create a user controlled dark or light mode](https://piccalil.li/tutorial/create-a-user-controlled-dark-or-light-mode/)

Read those already? Skimmed them a fair amount at least? Fantastic. Let's jump into the theming details for this website.

## Range of styles

My first go-around with theme switching was handled with an HTML range input (dubbed _theme slider_). Each input value correlated to a CSS ruleset. Interacting with the theme slider did a couple things:

1. Set a `data-theme` attribute on the `<html>` element.
2. Saved the theme value to the browser's local storage to be referenced on subsequent site visits.

Each theme changed the site colors set in CSS custom properties. I've simplified the code in these examples for the sake of brevity.

```css
[data-theme="1"] {
  /* dark theme */
  --color-text: papayawhip;
  --color-bg: midnightblue;
}

/* ...rulesets for themes 2 through 4... */

[data-theme="5"] {
  /* light theme */
  --color-text: darkslategray;
  --color-bg: lightsalmon;
}
```

The `min` and `max` attributes on the theme slider were set to 1 and 5 respectively, allowing five different themes. If the slider had not yet been moved, a theme was applied to the site based on color scheme preferences in a user's system settings. By default, color values were set to CSS custom properties. These values were then updated for dark mode within a `prefers-color-scheme` media query.

::: callout
Worth pointing out that it's totally possible to approach this the other way, starting with dark mode styles and overriding them with `light` or `no-preference` rulesets as Michelle explains in [her article](https://css-irl.info/quick-and-easy-dark-mode-with-css-custom-properties/).
:::

In the following example, you'll notice that the base default colors are the same values in `data-theme="5"` and then get updated to match `data-theme="1"` for the dark color scheme preference.

```css
:root {
  /* same values used in theme 5 */
  --color-text: darkslategray;
  --color-bg: lightsalmon;
}

@media (prefers-color-scheme: dark) {
  /* same values used in theme 1 */
  :root {
    --color-text: papayawhip;
    --color-bg: midnightblue;
  }
}
```

::: callout
For visual history, I shared my site refresh and demonstrated the original theme slider implementation in [this tweet](https://twitter.com/hexagoncircle/status/1338885523658555394?s=20&t=WebRdkKmXfB5ntsYPFwNwA). _Small note:_ this was tweeted before I decided to ditch the old domain in favor of the one you're on now.
:::

This first iteration felt limited. Preferred color scheme values were tied to specific themes (1 for dark, 5 for light/no-preference) and disconnected from the values sandwiched in between. It was a fine start but left me wondering about other ways to handle these preference settings.

## Decoupling scheme and theme

When I first [migrated over to 11ty](/blog/migrating-to-11ty) and added more pages to this site, the theme switcher was still only accessible on the homepage. While moving this component into a global layout, I was hit with some swell brain activity:

> Instead of relating light and dark mode settings to specific theme values on the slider, they could alter each theme as variants.

🤯

Here's what I came up with. The theme slider works the same as before but now has a new neighbor: a color scheme toggle button. This button sets a light or dark version of the current theme. My selection of colors may be somewhat arbitrary and subjective, but I tried pairing palettes that complement one another.

{% codepen "https://codepen.io/hexagoncircle/pen/zYPrjNd", "css,result", "300" %}

What I like about this theming model is that it welcomes future variants based on other user preferences and system settings. For instance, introducing high and low contrast styles for each theme using the `prefers-contrast` media query.

::: callout
At the time of writing, `prefers-contrast` is still considered an experimental feature according to the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast). This behavior may possibly change in the future.
:::

## Redundant rulesets

One minor issue is that the same set of styles need to be declared twice for an initial theme to handle dark mode as both a system setting and user-selected preference. Since I'm using Sass, I've abstracted the values into a mixin to avoid the repetition. Below is a reduced example; Review the SCSS tab in the CodePen above for the full code.

```scss
@mixin color-scheme-dark {
  --color-text: papayawhip;
  --color-bg: midnightblue;
}

:root {
  --color-text: darkslategray;
  --color-bg: lightsalmon;

  @media (prefers-color-scheme: dark) {
    &:not([data-color-scheme]) {
      @include color-scheme-dark;
    }
  }

  &[data-color-scheme="dark"] {
    @include color-scheme-dark;
  }
}
```

A hefty thanks to [Andy Bell's article](https://piccalil.li/tutorial/create-a-user-controlled-dark-or-light-mode/) for its usage of the `:not` selector. This ensures that the system settings do not override the user-selected color scheme. It also helped reduce some of the redundant code.

## Keyboard combo control

Keyboard navigation and interaction for these two elements works as one might suspect. The button toggles between dark and light mode. The range input updates the theme value. It's debatable that they are best left like that. However, I wanted to explore a version that combined these element interactions; A way to cycle through themes and toggle their light/dark variants as a single control.

- `tabindex="-1"` is set on the theme slider so it's no longer focusable in the keyboard tab sequence.
- When the color scheme toggle button is focused, left and right arrow keys cycle through the theme slider values.
- The space bar and enter key toggle light and dark mode.
- Visually, the toggle button has a focus outline with a left/right arrow icon beside it.
- A screen reader informs us that we can press the left and right arrow keys to change the theme in addition to our default button control.

## Theme status

One last feature is the usage of the status role, another gem from [Andy's article](https://piccalil.li/tutorial/create-a-user-controlled-dark-or-light-mode/). An HTML element with a `role="status"` attribute is grouped next to each control. Although visually hidden, when the content inside these containers changes, assistive technology will relay that update back to us.

- Clicking the color scheme toggle button announces the change to light or dark mode.
- Changing the value in the theme slider announces the new theme being displayed.

Something I enjoy about the latter bullet point is that it reveals the actual theme names which are based on ice cream flavors. Without inspecting code, it's currently the only path to this discovery. What's cooler than being cool? Ice cream.

## Ending theme

Thanks for joining while I recounted the tale of my website's first theming trial and its follow-up adventure. Some of the patterns here may change over time but this has been a blast putting together. I'm no champion of color, but I think these are some good lookin' themes.

If you have your own unique implementation or favorites out there on the wild web, [please share](https://twitter.com/hexagoncircle/status/1488589211577946114?s=20&t=EldD8DIkTHYUdsKTsxJslQ)! Max Böck and Josh Comeau have beautiful theme switchers and wrote detailed articles about their journeys. Definitely worth the read:

- [Color Theme Switcher](https://mxb.dev/blog/color-theme-switcher/)
- [The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/)
