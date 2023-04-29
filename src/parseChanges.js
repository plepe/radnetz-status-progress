module.exports = function parseChanges (data) {
  return data.map(entry => {
    entry.log = entry['Statusänderungen Protokoll']
      .split(';')
      .map(l => {
        const m = l.match(/(vor |)([0-9-]*)(?:| (.*))$/)
        if (!m) {
          console.log("Can't parse", l)
        }

        return {
          date: m[2],
          status: m[3]
        }
      })

    return entry
  })
}
