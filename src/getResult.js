const parseChanges = require('./parseChanges')
const findChangeDates = require('./findChangeDates')
const countStatus = require('./countStatus')
const load = require('./load')

module.exports = function getResult (param, callback) {
  load(param, (err, data) => {
    if (err) { return callback(err) }

    data = parseChanges(data)
    const changeDates = findChangeDates(data)
    const result = countStatus(data, changeDates)

    callback(null, result)
  })
}
