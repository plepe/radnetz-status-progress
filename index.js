const parseChanges = require('./src/parseChanges')
const findChangeDates = require('./src/findChangeDates')
const countStatus = require('./src/countStatus')
const load = require('./src/load')

load('2022', (err, data) => {
  if (err) { return console.error(err) }

  data = parseChanges(data)
  const changeDates = findChangeDates(data)
  const result = countStatus(data, changeDates)
  console.log(result)
})
