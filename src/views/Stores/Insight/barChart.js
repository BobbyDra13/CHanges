import { Grid, Paper } from '@mui/material';
import Chart from 'react-apexcharts';
import { grey } from '@mui/material/colors';

const BarChart = () => {
  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 329,
      toolbar: {
        show: false
      }
    },
    colors: ['#ff413a', '#00ac69'],
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 8,
      colors: ['transparent']
    },
    xaxis: {
      labels: {
        style: {
          colors: ['#1b212c']
        }
      },
      categories: []
    },
    yaxis: {
      show: false,
      labels: {
        style: {
          colors: ['#1b212c']
        }
      },
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    grid: {
      borderColor: grey[200]
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter(val) {
          return `${val}`;
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      show: true,
      fontFamily: `'Public Sans', sans-serif`,
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: true,
        colors: grey[400]
      },
      markers: {
        width: 16,
        height: 16,
        radius: '50%',
        offsexX: 2,
        offsexY: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0
      }
    },
    responsive: [
      {
        breakpoint: 3000,
        options: {
          yaxis: {
            show: true
          }
        }
      }
    ]
  };
  const barChartSeries = [
    {
      name: 'Bar 1',
      data: [
        44, 55, 41, 67, 22, 44, 55, 41, 67, 22, 44, 55, 41, 67, 22, 44, 55, 41, 67, 22, 44, 55, 41, 67, 22, 44, 55, 41, 67, 22, 44, 55, 41,
        67, 22
      ]
    },
    {
      name: 'Bar 2',
      data: [
        13, 23, 20, 8, 13, 13, 23, 20, 8, 13, 13, 23, 20, 8, 13, 13, 23, 20, 8, 13, 13, 23, 20, 8, 13, 13, 23, 20, 8, 13, 13, 23, 20, 8, 13,
        13, 23, 20, 8, 13
      ]
    }
  ];

  return (
    <Grid item sx={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: 'auto',
          padding: '20px',
          marginBottom: '20px',
          position: 'relative',
          left: 'auto',
          borderRadius: '15px'
        }}
      >
        <Chart options={barChartOptions} series={barChartSeries} type="bar" height={300} />
      </Paper>
    </Grid>
  );
};

export default BarChart;
