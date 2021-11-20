---
title: Blog Posts
subtitle: My own random thoughts, code snippets, and other web-related stuff I'd like to share out there
layout: base.njk
templateEngineOverride: njk,md
---

<ul>
  {%- for post in collections.posts | reverse  -%}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <small style="display: block">{{ post.data.date | postDate }}</small>
    </li>
  {%- endfor -%}
</ul>
