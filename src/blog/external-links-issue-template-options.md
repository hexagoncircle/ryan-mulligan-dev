---
layout: post
title: Using External Links as GitHub Issue Template Options
description: Customize the GitHub issue template chooser to handle new bug reports or feature requests in a team's preferred task management app.
ogImage: /social/external-links-issue-template-options.png
date: 2024-01-18
---

I've been down the road of [configuring custom issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository) on GitHub repos before. It even seems like there have been some nice improvements to help make creating them even easier. Thanks for setting me up with a reasonable bug report template to start from so I don't have to build one from scratch. 🐛

However, teams may rely on a variety of other tools—Jira, Asana, Linear, an Excel spreadsheet (Kidding! But maybe?)—to manage a backlog of tasks. I'd prefer teammates not add new issues on the repo only to then recreate those items in some other workflow. It would be great if folks could be guided to the right place and avoid double entry.

There is a solution for this! It's new to me, so in the spirit of "today I learned", here's a quick tip for us to share.

## Creating custom config

We can [configure the template chooser](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#configuring-the-template-chooser) with external links and even lock down the ability to create new issues on the repo. Create a `config.yml` file in the repo's `.github/ISSUE_TEMPLATE` directory.

The `.github/ISSUE_TEMPLATE` directory may not exist yet if templates have not been configured for the repo. If it needs to be manually created, the path should start at the root of the project.
{.callout}

```yaml
blank_issues_enabled: false
contact_links:
  - name: 🐛 Bug Report
    url: [link to create bug report]
    about: Please file a bug report in our team's app of choice.
  - name: 💡 Feature Request
    url: [link to create feature request]
    about: Have some great ideas to improve our site or this codebase? Open a new feature request in our team's app of choice.
```

The screenshot below shows how these items will render on the "issue chooser" page. The config explicitly sets only the two options, both linking to their respective places where new tasks can be added to the team's backlog.

{% image "./public/images/github-template-chooser-example.jpg", "Screenshot of custom external options added to the GitHub issue selection interface." %}

The `blank_issues_enabled: false` line in the config code hides the "open a blank issue" hyperlink that normally appears below these custom options. Without this line, folks would still have the ability to add a new issue on the repo.

With all of this in order, the repo remains free of user-entered issues, reducing some friction and redundancy. As an aside: I'm not 100% certain, but I'd wager that automated bot issues would still appear in the repo's issue queue.
