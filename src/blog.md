---
title: Blog Posts
layout: base
ogImage: /assets/social/blog-posts.png
---

<ul>
  {%- for post in collections.posts | reverse  -%}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <small style="display: block">{{ post.data.date | postDate }}</small>
    </li>
  {%- endfor -%}
</ul>
