import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = () => {
  const chartOptions = {
    chart: {
      type: 'donut',
      width: 300,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      } // Set padding to zero to remove padding
    },
    labels: ['Category A', 'Category B', 'Category C'],
    series: [60, 25, 15], // Adjust the series values based on your data
    colors: ['#52bf90', '#419873', '#317256'], // Specify colors for each category
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
            padding: 0 // Set padding to zero for responsiveness
          },
          legend: {
            show: false // Hide legend
          }
        }
      }
    ],
    legend: {
      show: false // Hide legend
    },
    dataLabels: {
      enabled: false // Hide data labels
    }
  };

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="donut" height={100} />
    </div>
  );
};

export default DonutChart;
