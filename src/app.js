import Chart from 'chart.js/auto'
import getResult from './getResult'

window.onload = () => {
  getResult('2022', (err, result) => {
    console.log(result)

    const ctx = document.getElementById('chart')
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(result),
        datasets: [{
          label: 'Anzahl Bauprojekte gesamt',
          data: Object.values(result).map(l => l.length),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  })
}
