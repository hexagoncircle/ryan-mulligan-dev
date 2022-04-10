---
layout: home.njk
templateEngineOverride: njk,md
---

## A bit about me

I'm a fun-loving front-end engineer that strives to bridge the gap between web design and develop&shy;ment, building user experiences with positive interactivity through thoughtful interfaces. I advocate for modern best practices on the web and love working with diverse, inclusive teams. Currently, I build for the web with a lovely team at <a href="https://www.netlify.com/">Netlify</a>.

When I'm not coding, you can catch me [noodling on my acoustic guitar](https://twitter.com/hexagoncircle/status/1413526995376295941?s=20") or [blasting out rhythms](https://twitter.com/hexagoncircle/status/1285798846568767496?s=20) if there's a drum kit ready for a lefty nearby.

Want to know more? <a class="hello-link" href="{% mailToPath %}" target="_blank" rel="noopener">Say hello anytime!</a> <span class="himoji">👋</span>

## Blog posts

My own random thoughts, code snippets, and other web-related stuff I'd like to share out there. Still in the process of writing content but I have a few in the cooker!

<ul>
  {%- for post in collections.posts | reverse  -%}
    <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
  {%- endfor -%}
</ul>

## Articles & features

<ul>
  {%- for article in articles -%}
    <li>
      <a href="{{ article.url }}" target="_blank" rel="noopener">{{ article.title }}</a>
      <span class="source">{{ article.source }}</span>
    </li>
  {%- endfor -%}
</ul>

## Creative projects

- [Ryan & Aly](https://ryanandaly.com/)
- [mesend.love](https://mesend.love/)
- [Animated Verbs](https://animatedverbs.com/)
- [CSS CLI](https://stylestage.dev/styles/css-cli/)
- [SoundCloud Grid](https://hexagoncircle.github.io/soundcloud-grid/)
- [Vue Playlist](https://hexagoncircle.github.io/vue-playlist/)
- [Cocktails](https://hexagoncircle.github.io/cocktails/)
  {.multi-column }

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
