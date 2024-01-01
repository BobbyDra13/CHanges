const chartData = {
  type: 'bar',
  height: 300,
  options: {
    chart: {
      toolbar: {
        show: false
      }
    },
    colors: ['#fff'],
    tooltip: {
      theme: 'dark'
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      labels: {
        show: false
      },
      show: false,
      categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false
    }
  },
  series: [
    {
      name: 'Fullness %',
      data: [55, 35, 75, 25, 90, 50]
    }
  ]
};

export default chartData;
