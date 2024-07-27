---
layout: post
title: Notes on handling events in Web Components
description: Sharing my learnings after receiving solid feedback on some web component code.
ogImage: /social/handling-events-web-components.png
date: 2024-07-27
---

My [`click-spark` web component](/blog/click-spark/) was a fun, silly project at best. Yet I've seen it's had some love since being shared. So why not publish it as an [npm package](https://www.npmjs.com/package/click-spark)? No better time than the present, some say.

I had done a major refactor before publishing, the most notable was that the spark would now be contained to the custom element's parent node. After announcing the updates in a [Mastodon post](https://fosstodon.org/@hexagoncircle/112855152216537788), I soon received a [PR](https://github.com/hexagoncircle/click-spark/pull/7#discussion_r1693933865) with some quality feedback that shared a more advantageous way to handle the parent click event using the `handleEvent()` method.

## The click-spark click

Let's dive into a "before and after" for handling the click event on this component.

In both examples, notice that the parent node is being stored in a variable when `connectedCallback` runs. This ensures that the click event is properly removed from the parent since it's not available by the time `disconnectedCallback` is invoked as [FND's comment](https://github.com/hexagoncircle/click-spark/pull/7#discussion_r1693936577) explains.
{.callout}

In the "before" approach, the event callback function is stored in a variable so that it's cleared from the parent node whenever the `click-spark` element is removed from the DOM.

```js
constructor() {
  this.clickEvent = this.handleClick.bind(this);
}

connectedCallback() {
  this._parent = this.parentNode;
  this._parent.addEventListener("click", this.clickEvent);
}

disconnectedCallback() {
  this._parent.removeEventListener("click", this.clickEvent);
  delete this._parent;
}

handleClick() {
  // Run code on click
}
```

Switching to `handleEvent()` removes the need to store the event callback function. Passing `this` into the event listener will run the component's `handleEvent()` method every time we click.

```js
constructor() {
  // No longer need to store the callback
}

connectedCallback() {
  this._parent = this.parentNode;
  this._parent.addEventListener("click", this);
}

disconnectedCallback() {
  this._parent.removeEventListener("click", this);
  delete this._parent;
}

handleEvent(e) {
  // Run code on click
}
```

## Helpful resources

Chris Ferdinandi's article, [The handleEvent() method is the absolute best way to handle events in Web Components](https://gomakethings.com/the-handleevent-method-is-the-absolute-best-way-to-handle-events-in-web-components/) is an excellent read on why `handleEvent()` is a top choice for architecting event listeners in Web Components. He also shares insight from Andrea Giammarchi's [DOM handleEvent: a cross-platform standard since year 2000](https://webreflection.medium.com/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38) article which contains solid techniques for handling multiple event types.

Rather than me regurgitating, I recommend jumping into both of those articles to get a proper grasp on `handleEvent()`.
