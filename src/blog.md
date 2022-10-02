---
title: Blog Posts
layout: base
---

<ul>
  {%- for post in collections.posts | reverse  -%}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <small style="display: block">{{ post.data.date | postDate }}</small>
    </li>
  {%- endfor -%}
</ul>
