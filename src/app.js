import async from 'async'
import Chart from 'chart.js/auto'
import getResult from './getResult'
import getStatuses from './getStatuses'

let statuses

window.onload = () => {
  async.parallel({
    statuses: (done) => getStatuses(done),
    result: (done) => getResult('2022', done)
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
    console.log(datasets)

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
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    })
}
