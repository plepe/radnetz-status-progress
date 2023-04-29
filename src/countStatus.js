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
          if (entry.log[i].status !== 'verschwunden') {
            currentStatus = entry.log[i].status
          } else {
            currentStatus = null
          }
        }
        i++
      }

      if (currentStatus) {
        result[d].push(currentStatus)
      }
    })
  })

  const last = changeDates[changeDates.length - 1]
  if (result[last].filter(v => !['fertiggestellt', 'verschwunden', 'verschoben'].includes(v)).length > 0) {
    result[new Date().toISOString()] = result[last]
  }

  return result
}
