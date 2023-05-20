import qs from 'query-string'
const csvtojson = require('csvtojson')

const config = require('../config.json')

module.exports = function load (param, callback) {
  const file = param.jahr ? 'bauprogramm.csv' : 'bauprogramm-ohne-aenderungen.csv'

  fetch(config.url + file + '?' + qs.stringify(param))
    .then(req => req.text())
    .then(body => {
      const data = []

      csvtojson({})
        .fromString(body)
        .subscribe(line => data.push(line))
        .on('done', () => callback(null, data))
    })
}
