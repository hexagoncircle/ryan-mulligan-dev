---
title: Click Spark
description: A Web Component that adds sparks of joy when clicking or tapping on the page.
ogImage: /social/click-spark.png
date: 2024-01-02
---

Last week I had made this fun little experiment. When clicking or tapping on the page, sparks (of joy) fly out from the mouse cursor/tap position. It started with me just messing around a bit in CodePen, but after sharing and getting a few friendly nudges on [my Mastodon post](https://mastodon.social/@hexagoncircle@fosstodon.org/111659424760546483), this fun little experiment evolved into the `<click-spark>` Web Component which is now available in a [GitHub repo](https://github.com/hexagoncircle/click-spark).

Try it out in the CodePen demo below.

{% codepen "https://codepen.io/hexagoncircle/pen/bGZdWyw", 350 %}

The spark color can be modified by setting a color value to the `--click-spark-color` custom property:

```html
<click-spark style="--click-spark-color: hotpink"></click-spark>
```

**Updated on July 26th, 2024** — The update below was a bit silly of me in retrospect. I'm going to leave it for the sake of keeping a rich history. I've pushed a _new_ release that will instead contain the click sparks to the parent element. I believe this is a much cleaner implementation than what I initially attempted. Check out [pull request #3](https://github.com/hexagoncircle/click-spark/pull/3) if you'd like to dig into the details.

**Updated on January 5th, 2023** — I had been thinking about a case where I'd like to have click sparks, but only when clicking on particular elements. I've updated the [code](https://github.com/hexagoncircle/click-spark) so that an `active-on` attribute can be set on the custom element to target a comma-separated list of selectors. If any of the selectors match, let the sparks fly. Here's a [CodePen demo](https://codepen.io/hexagoncircle/pen/rNReOPd) of the following example.

```html
<click-spark active-on=".send-sparks, #i-love-sparks, [data-sparks]"></click-spark>
```

Have your sparks your way. ✨


