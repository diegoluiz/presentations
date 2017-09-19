

# Dotnet core

## Github
*Project url*
https://api.github.com/orgs/dotnet

*Repos urls*
https://api.github.com/orgs/dotnet/repos

*All issues url*
https://api.github.com/repos/dotnet/core/issues?state=all
*response*
{
    "id": 1242561416,
    "url": "https://api.github.com/repos/dotnet/core/issues/events/1242561416",
    "actor": {
      "login": "chintan3100",
      "id": 1373832,
      "avatar_url": "https://avatars3.githubusercontent.com/u/1373832?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/chintan3100",
      "html_url": "https://github.com/chintan3100",
      "followers_url": "https://api.github.com/users/chintan3100/followers",
      "following_url": "https://api.github.com/users/chintan3100/following{/other_user}",
      "gists_url": "https://api.github.com/users/chintan3100/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/chintan3100/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/chintan3100/subscriptions",
      "organizations_url": "https://api.github.com/users/chintan3100/orgs",
      "repos_url": "https://api.github.com/users/chintan3100/repos",
      "events_url": "https://api.github.com/users/chintan3100/events{/privacy}",
      "received_events_url": "https://api.github.com/users/chintan3100/received_events",
      "type": "User",
      "site_admin": false
    },
    "event": "mentioned",
    "commit_id": null,
    "commit_url": null,
    "created_at": "2017-09-11T04:52:05Z",
    "issue": {
      "url": "https://api.github.com/repos/dotnet/core/issues/935",
      "repository_url": "https://api.github.com/repos/dotnet/core",
      "labels_url": "https://api.github.com/repos/dotnet/core/issues/935/labels{/name}",
      "comments_url": "https://api.github.com/repos/dotnet/core/issues/935/comments",
      "events_url": "https://api.github.com/repos/dotnet/core/issues/935/events",
      "html_url": "https://github.com/dotnet/core/issues/935",
      "id": 254868444,
      "number": 935,
      "title": ".net core 1.1 Performance issue with Load: Azure PAAS",
      "user": {
        "login": "chintan3100",
        "id": 1373832,
        "avatar_url": "https://avatars3.githubusercontent.com/u/1373832?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/chintan3100",
        "html_url": "https://github.com/chintan3100",
        "followers_url": "https://api.github.com/users/chintan3100/followers",
        "following_url": "https://api.github.com/users/chintan3100/following{/other_user}",
        "gists_url": "https://api.github.com/users/chintan3100/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/chintan3100/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/chintan3100/subscriptions",
        "organizations_url": "https://api.github.com/users/chintan3100/orgs",
        "repos_url": "https://api.github.com/users/chintan3100/repos",
        "events_url": "https://api.github.com/users/chintan3100/events{/privacy}",
        "received_events_url": "https://api.github.com/users/chintan3100/received_events",
        "type": "User",
        "site_admin": false
      },
      "labels": [],
      "state": "open",
      "locked": false,
      "assignee": null,
      "assignees": [],
      "milestone": null,
      "comments": 5,
      "created_at": "2017-09-03T11:18:04Z",
      "updated_at": "2017-09-11T04:52:05Z",
      "closed_at": null,
      "author_association": "NONE",
      "body": "I have hosted my api on Azure with Web app S1 to S3 plan.\r\n\r\nAPI taking a long time to respond. This issue will get when I have tried to run load test script with multiple users.\r\n\r\nAny setting Should we consider for multiple users or when load increase for 1.1\r\nhttp://weblogs.thinktecture.com/pawel/2017/03/aspnet-core-webapi-performance.html\r\n\r\nlike\r\nKestrel ThreadPool \r\nOr\r\n```xml\r\n  <system.net>\r\n    <connectionManagement>\r\n      <add address=\"*\" maxconnection=\"1000\" />\r\n    </connectionManagement>\r\n  </system.net>\r\n```"
    }
  }


## JIRA
*Documentation*
https://developer.atlassian.com/jiradev/jira-apis/jira-rest-apis/jira-rest-api-tutorials/jira-rest-api-example-create-issue
https://docs.atlassian.com/jira/REST/cloud/?_ga=2.151471806.660418878.1505671165-1883268737.1504550710#api/2/issue-createIssues


http://server.diegoluiz.com:8080/browse/PROJ-946?filter=-5&jql=order%20by%20priority%20DESC%2Cupdated%20DESC
http://server.diegoluiz.com:8080/rest/api/2/search?filter=-5&jql=order%20by%20priority%20DESC%2Cupdated%20DESC

