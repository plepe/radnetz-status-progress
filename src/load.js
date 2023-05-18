import qs from 'query-string'
const csvtojson = require('csvtojson')

const config = require('../config.json')

module.exports = function load (param, callback) {
  fetch(config.url + 'bauprogramm.csv?' + qs.stringify(param))
    .then(req => req.text())
    .then(body => {
      const data = []

      csvtojson({})
        .fromString(body)
        .subscribe(line => data.push(line))
        .on('done', () => callback(null, data))
    })
}
