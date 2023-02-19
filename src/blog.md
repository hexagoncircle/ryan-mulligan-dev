---
title: Articles
layout: base
ogImage: /assets/social/blog-posts.png
---

Sometimes general thoughts and rambles, mostly code snippets and front-end development discoveries to share with the world wide web. Below is the whole collection, starting with the most recent stuff. Follow my [RSS feed](/blog/feed.xml) to stay in the loop for future publications.

<ul class="articles-list" role="list">
  {%- for post in collections.posts | reverse  -%}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <small style="display: block">{{ post.data.date | postDate }}</small>
    </li>
  {%- endfor -%}
</ul>
