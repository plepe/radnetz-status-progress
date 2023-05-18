const parseChanges = require('./parseChanges')
const findChangeDates = require('./findChangeDates')
const countStatus = require('./countStatus')
const load = require('./load')

module.exports = function getResult (data) {
  data = parseChanges(data)
  const changeDates = findChangeDates(data)
  const result = countStatus(data, changeDates)

  return result
}
