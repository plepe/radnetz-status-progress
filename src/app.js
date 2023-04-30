import qs from 'query-string'
import async from 'async'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-moment';
import getResult from './getResult'
import getStatuses from './getStatuses'

let statuses

const args = qs.parse(location.search)
const year = args.year ?? new Date().toISOString().substr(0, 4)

window.onload = () => {
  async.parallel({
    statuses: (done) => getStatuses(done),
    result: (done) => getResult(year, done)
  }, (err, data) => {
    if (err) { return console.error(err) }
    show(data)
  })
}

function show ({ statuses, result }) {
    const datasets = statuses.map(status => {
      return {
        label: status.Status,
        backgroundColor: status.Farbe,
        borderColor: status.Farbe,
        stepped: true,
        fill: true,
        data: Object.entries(result).map(l => {
          return {
            x: l[0],
            y: l[1].filter(v => v === status.Status).length
          }
        }),
        borderWidth: 1
      }
    })

    let lastDate = Object.keys(result).concat().pop()
    if (lastDate < (parseInt(year) + 1) + '-03-30') {
      lastDate = (parseInt(year) + 1) + '-03-30'
    }

    const ctx = document.getElementById('chart')
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(result),
        datasets
      },
      options: {
        scales: {
          x: {
            type: 'time',
            min: year < 2023 ? year + '-04-01' : null,
            max: lastDate
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    })
}
