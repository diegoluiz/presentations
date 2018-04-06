const fs = require('fs');
const Promise = require('bluebird')
const path = require('path')
const json2csv = require('json2csv');

const write = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, function (err) {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

module.exports = (outputDir, data) => {
  var fields = ['self', 'key', 'fields.summary', 'fields.description','fields.creator.key','fields.created','fields.assignee','fields.status.name'];
  var lines = json2csv({ data, fields });
  return write(path.join(outputDir, "report.csv"), lines)
}
