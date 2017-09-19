const api = require('./lib/api')(`Basic ${process.env.JIRA_AUTHENTICATION}`)
const exporters = require('./lib/exporters')
const Promise = require('bluebird')
const _ = require('lodash')

console.log('Starting proces...')

const LAST_30_DAYS_LINK = 'http://server.diegoluiz.com:8080/rest/api/2/search?filter=10003&startAt='

api.get(LAST_30_DAYS_LINK)
  .then(r => {
    return {
      totalPages: parseInt(r.body.total / r.body.maxResults) + 1,
      maxResults: r.body.maxResults
    }
  })
  .then(r => {
    return Promise.map([...Array(r.totalPages).keys()].slice(1), page => {
      const startingAt = r.maxResults * page
      return api.get(LAST_30_DAYS_LINK + startingAt)
    }, { concurrency: 10 })
  })
  .then(r => {
    return _.flatten(r.filter(i => i.body && i.body.issues).map(i => i.body.issues))
  })
  .then(r =>{
    return r.filter(i => i.fields.issuetype.name == "Task")
  })
  .then(r => {
    return Promise.all([
      exporters.excel(__dirname, r),
      exporters.csv(__dirname, r)
    ])
  })
  .then(() => {
    console.log('Process finished')
  })
