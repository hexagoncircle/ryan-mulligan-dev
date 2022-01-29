---
layout: home.njk
templateEngineOverride: njk,md
---

## A bit about me

I'm a fun-loving front-end engineer that strives to bridge the gap between web design and develop&shy;ment, building user experiences with positive interactivity through thoughtful interfaces. I advocate for modern best practices on the web and love working with diverse, inclusive teams.

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

## Employment

<div class="employment-list">
  <dl>
    <div>
      <dt>Inspirato</dt>
      <dd class="employment-location">Denver, CO / Remote</dd>
    </div>
    <div>
      <dd class="employment-role">Manager, UI Engineering</dd>
      <dd class="employment-info">May 2021 – January 2022</dd>
      <dd class="employment-role">Senior UI Engineer</dd>
      <dd class="employment-info">August 2019 – May 2021</dd>
    </div>
  </dl>
  <dl>
    <div>
      <dt>Elevated Third</dt>
      <dd class="employment-location">Seattle, WA</dd>
    </div>
    <div>
      <dd class="employment-role">Senior Front-end Developer</dd>
      <dd class="employment-info">July 2018 – April 2019</dd>
    </div>
  </dl>
  <dl>
    <div>
      <dt>Expedia Group</dt>
      <dd class="employment-location">Bellevue, WA</dd>
    </div>
    <div>
      <dd class="employment-role">Software Dev Engineer II</dd>
      <dd class="employment-info">June 2017– May 2018</dd>
      <dd class="employment-role">Senior Design Engineer</dd>
      <dd class="employment-info">June 2016 – June 2017</dd>
    </div>
  </dl>
  <dl>
    <div>
      <dt>Elevated Third</dt>
      <dd class="employment-location">Denver, CO</dd>
    </div>
    <div>
      <dd class="employment-role">Senior Developer</dd>
      <dd class="employment-info">May 2012 – May 2016</dd>
    </div>
  </dl>
  <dl>
    <div>
      <dt>Entravision Communications</dt>
      <dd class="employment-location">Denver, CO</dd>
    </div>
    <div>
      <dd class="employment-role">Interactive Content Publisher</dd>
      <dd class="employment-info">January 2010 – January 2012</dd>
    </div>
  </dl>
</div>
