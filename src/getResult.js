const parseChanges = require('./parseChanges')
const findChangeDates = require('./findChangeDates')
const countStatus = require('./countStatus')
const load = require('./load')

module.exports = function getResult (year, callback) {
  load('2022', (err, data) => {
    console.log(data)
    if (err) { return callback(err) }

    data = parseChanges(data)
    const changeDates = findChangeDates(data)
    const result = countStatus(data, changeDates)

    callback(null, result)
  })
}
