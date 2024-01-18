---
layout: post
title: Using External Links as GitHub Issue Template Options
description: Customize the GitHub issue template chooser to handle new bug reports or feature requests in a team's preferred task management app.
ogimage: /social/external-links-issue-template-options.png
date: 2024-01-17
---

I've been down the road of [configuring custom issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository) on GitHub repos before. It even seems like there have been some nice improvements to help make creating them even easier. Thanks for giving me a nice bug report template to start from so I don't have to build my own. 🐛

However, many teams may rely on a variety of other tools—Jira, Linear, an Excel spreadsheet (Kidding! But maybe?)—to manage a backlog of tasks. I'd prefer folks not add new issues on the repo that would then need to be recreated in some other workflow. There is a solution for this! Since I had no idea, there may be others just like me. Here's a quick tip for us to share.

## Creating custom config

We can [configure the template chooser](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#configuring-the-template-chooser) with external links and even lock down the ability to create new issues on the repo. To make this happen, let's create a `config.yml` file in the repo's `.github/ISSUE_TEMPLATE` directory.

```yaml
blank_issues_enabled: false
contact_links:
  - name: 🐛 Bug Report
    url: [link to create bug report]
    about: Please file a bug report in our team's of choice.
  - name: 💡 Feature Request
    url: [link to create feature request]
    about: Have some great ideas to improve our site or this codebase? Open a new feature request in our team's app of choice.
```

The screenshot below shows how this will render on the "issue chooser" page. The code above explicitly sets only the two options, both linking to their respective places where new tasks can be created for the team.

{% image "./public/images/github-template-chooser-example.jpg", "Screenshot of custom external options added to the GitHub issue selection interface." %}

The first line in that code example, `blank_issues_enabled: false` removes the hyperlink that appears below these custom options. If this isn't set, folks would still have the ability to add a new blank issue.

With all of this in order, the repo can stay free from user-entered issues, reducing some friction and redundancy. As an aside: I'm not 100% sure, but I'd wager that automated bot issues would still appear in the repo's issue queue.
