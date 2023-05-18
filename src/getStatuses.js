const csvtojson = require('csvtojson')

const config = require('../config.json')

let cache = null

module.exports = function getStatuses (callback) {
  if (cache) {
    return callback(null, cache)
  }

  fetch(config.url + 'statuses.csv')
    .then(req => req.text())
    .then(body => {
      const data = []

      csvtojson({})
        .fromString(body)
        .subscribe(line => data.push(line))
        .on('done', () => {
          cache = data
          callback(null, data)
        })
    })
}
