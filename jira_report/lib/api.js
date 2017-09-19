const request = require('request')
const Promise = require('bluebird')

const get = (url) => {
  var options = {
    method: 'get',
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
      resolve({ headers: res.headers, body })
    })
  })
}

module.exports = (auth) => {
  return {
    get: (url) => {
      var options = {
        method: 'get',
        json: true,
        headers: {
          'User-Agent': 'Request-Promise',
          'Authorization': auth
        },
        url
      }

      return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
          if (err) {
            reject(err)
          }
          resolve({ headers: res.headers, body })
        })
      })
    }
  }
}
