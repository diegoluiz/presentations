const Promise = require('bluebird')
const path = require('path')
const Excel = require('exceljs');
const fs = require('fs');

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
  const workbook = new Excel.Workbook();
  workbook.creator = 'Diego Luiz';
  workbook.lastModifiedBy = 'Diego Luiz';
  workbook.created = new Date();
  workbook.modified = new Date();

  const reportSheet = workbook.addWorksheet('Report', { properties: { tabColor: { argb: 'FFC0000' } } });
  reportSheet.columns = [
    { header: 'Key', key: 'key', width: 10 },
    { header: 'Summary', key: 'summary', width: 32 },
    { header: 'Description', key: 'description', width: 50 },
    { header: 'Creator', key: 'creator', width: 20 },
    { header: 'Created on', key: 'createdon', width: 32 },
    { header: 'Assignee', key: 'assignee', width: 20 },
    { header: 'Status', key: 'status' }
  ];

  const rows = data.map(row => {
    return {
      key: row.key,
      summary: row.fields.summary,
      description: row.fields.description,
      creator: row.fields.creator.key,
      createdon: row.fields.created,
      status: row.fields.status.name
    }
  })
  reportSheet.addRows(rows)

  return workbook.xlsx.writeFile(path.join(outputDir, "report.xlsx"))
    // .then(() => {
    //   console.log('exported')
    // })
    // .catch(err => console.log(err))
}
