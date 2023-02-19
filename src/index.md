---
layout: home
subtitle: Passenger through space and time, front-end web builder & bittersweet songs enthusiast
---

## Most recent articles

Sometimes general thoughts and rambles, mostly code snippets and front-end development discoveries to share with the world wide web.

<ul>
  {%- for post in collections.posts | reverse | limit(6) -%}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <span class="source">{{ post.data.date | postDate }}</span>
    </li>
  {%- endfor -%}
</ul>

[Read more articles](/blog)
{.cta}

## The bit about myself

I'm a fun-loving front-end engineer that strives to bridge the gap between web design and development, building user experiences with positive interactivity through thoughtful interfaces. I advocate for modern best practices on the web and love working with diverse, inclusive teams. Currently, I build for the web with a lovely team at <a href="https://www.netlify.com/">Netlify</a>.

When I'm not coding, you can catch me [noodling on my acoustic guitar](https://twitter.com/hexagoncircle/status/1413526995376295941?s=20"){target="_blank" rel="me"} or [blasting out rhythms](https://twitter.com/hexagoncircle/status/1285798846568767496?s=20){target="_blank" rel="me"} if there's a drum kit ready for a lefty nearby.

{% renderTemplate "webc" %}
Want to know more? <rm-wave-hello webc:nokeep />
{% endrenderTemplate %}

## Features around the web

<ul>
  {%- for feature in features -%}
    <li>
      <a href="{{ feature.url }}" target="_blank" rel="noopener">{{ feature.title }}</a>
      <span class="source">{{ feature.source }}</span>
    </li>
  {%- endfor -%}
</ul>

## A few things I enjoy

- All things CSS
- Finding the perfect custom cubic Bézier curve
- Web accessibility
- CodePen
- Any beach, any ocean
- Early morning coffee
- Nick Drake's <em>Pink Moon</em> in its entirety
- Cool side of pillow
- Guitar noodling
- Trashing a drum kit
  {.multi-column }
