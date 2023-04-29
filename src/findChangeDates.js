module.exports = function findChangeDates (data) {
  const changeDates = {}
  data.forEach(entry => {
    entry.log.forEach(l => {
      changeDates[l.date] = true
    })
  })

  return Object.keys(changeDates).sort()
}
