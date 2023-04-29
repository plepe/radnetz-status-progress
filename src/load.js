const csvtojson = require('csvtojson')

const config = require('../config.json')

module.exports = function load (year, callback) {
  fetch(config.url.replace('{year}', year))
    .then(req => req.text())
    .then(body => {
      const data = []

      csvtojson({})
        .fromString(body)
        .subscribe(line => data.push(line))
        .on('done', () => callback(null, data))
    })
}
