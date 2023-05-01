import qs from 'query-string'
import async from 'async'
import Chart from 'chart.js/auto'
import moment from 'moment'
import 'moment/locale/de'
import 'chartjs-adapter-moment';
import getResult from './getResult'
import getStatuses from './getStatuses'
import config from '../config.json'

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
    const datasets = statuses
      .filter(status => !config.hideStatuses.includes(status.Status))
      .map(status => {
        let data = Object.entries(result).map(l => {
          return {
            x: l[0],
            y: l[1].filter(v => v === status.Status).length
          }
        })
        data = data.filter((v, i) => v.y > 0 || (i > 0 && data[i - 1].y > 0))

        return {
          label: status.Status,
          backgroundColor: status.Farbe,
          borderColor: status.Farbe,
          stepped: true,
          fill: true,
          data: data,
          borderWidth: 1
        }
      })

    let lastDate = Object.keys(result).concat().pop()
    if (lastDate < (parseInt(year) + 1) + '-03-30') {
      lastDate = (parseInt(year) + 1) + '-03-30'
    }

    let firstDate = Object.keys(result)[0]
    if (firstDate === '2023-01-08') {
      datasets.push({
        stepped: true,
        fill: false,
        label: 'keine Daten vorhanden',
        borderColor: '#afafaf',
        data: [
          {
            x: year + '-04-01',
            y: result[firstDate].length
          },
          {
            x: '2023-01-07',
            y: result[firstDate].length
          }
        ]
      })
    }

    const ctx = document.getElementById('chart')
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(result),
        datasets
      },
      options: {
        locale: 'de-AT',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Entwicklung des Bauprogramms ' + year
          },
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            },
            min: year < 2023 ? year + '-04-01' : null,
            max: lastDate
          },
          y: {
            title: {
              display: true,
              text: 'Anzahl Bauprojekte',
            },
            stacked: true,
            beginAtZero: true
          }
        }
      }
    })
}
