function renderChart(i) {
    const ctx = document.getElementById('myChart');
    const stats = pokedex[i]['stats'];
    const stat = stats.map(stat => stat['base_stat']);
    const statNames = stats.map(stat => stat['stat']['name'])
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: statNames,
            datasets: [{
                data: stat,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            }
        }

    });
}