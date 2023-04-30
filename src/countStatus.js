import config from '../config.json'

module.exports = function countStatus (data, changeDates) {
  const result = {}
  changeDates.forEach(d => {
    result[d] = []
  })

  data.forEach(entry => {
    let i = 0
    let currentStatus = null

    changeDates.forEach(d => {
      if (i < entry.log.length && entry.log[i].date === d) {
        if (entry.log[i].status) {
          currentStatus = entry.log[i].status
        }
        i++
      }

      if (currentStatus) {
        result[d].push(currentStatus)
      }
    })
  })

  const last = changeDates[changeDates.length - 1]
  if (result[last].filter(v => !config.finalStatuses.includes(v)).length > 0) {
    result[new Date().toISOString()] = result[last]
  }

  return result
}
