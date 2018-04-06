const request = require('request')
const Promise = require('bluebird')
const _ = require('lodash')

const GITHUB_URL = 'https://api.github.com/repos/dotnet/core/issues?state=all&page='
const JIRA_URL = 'http://server.diegoluiz.com:8080/rest/api/2/issue'
const JIRA_PROJECT_NAME = 'PROJ'
const JIRA_PROJECT_ID = 10000

const get = (url) => {
  var options = {
    uri: url,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    },
    json: true
  }
  return new Promise((resolve, reject) => {
    request.get(options, (err, response, body) => {
      if (err) {
        reject(err)
      }
      resolve({ headers: response.headers, body })
    })
  })
}

const post = (url, body) => {
  var options = {
    method: 'post',
    body,
    json: true,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `Basic ${process.env.JIRA_AUTHENTICATION}`
    },
    url
  }

  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (err) {
        reject(err)
      }
      resolve({ headers: res.headers, statusCode: res.statusCode })
    })
  })
}

const nextLink = (x) => {
  return x.split('>')[0].split('<')[1]
}

const countPages = (x) => {
  return parseInt(x.split('>')[1].split('<')[1].split("&page=")[1]) + 1
}

get(GITHUB_URL).then(result => {
  const totalPages = countPages(result.headers.link)
  console.log(`${totalPages} pages`)
  const pages = [...Array(totalPages).keys()].slice(1)
  // const pages = [1]
  return Promise.map(pages, page => {
    console.log(`Downloading page ${page} - URL ${GITHUB_URL + page}`)
    return get(GITHUB_URL + page)
  })
    .then(result => {
      return Promise.map(result, x => {
        if (x && x.body) {
          return x.body
        }
      })
    })
    .then(result => {
      return _.flatten(result)
    })
    .then(result => {
      return result.map(issue => {
        return {
          fields: {
            project:
            {
              key: JIRA_PROJECT_NAME
            },
            summary: issue.title,
            description: issue.body,
            issuetype: {
              name: "Task"
            }
          }
        }
      })
    })
    .then(result => {
      console.log(`Posting ${result.length} issues`)
      return Promise.map(result, issue => {
        return post(JIRA_URL, issue)
      }, { concurrency: 10 })
    })
    .then(result => {
      console.log('Done')
    })
    .catch(err => console.log(err))
})
