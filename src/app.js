import Chart from 'chart.js/auto'
import getResult from './getResult'

window.onload = () => {
  getResult('2022', (err, result) => {
    console.log(result)
  })

  const ctx = document.getElementById('chart')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
}
