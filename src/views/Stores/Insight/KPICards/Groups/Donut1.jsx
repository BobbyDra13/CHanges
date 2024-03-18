import React from 'react';
import ReactApexChart from 'react-apexcharts';

const state = {
  series: [44, 55, 10],
  options: {
    colors: ['#52bf90', '#419873', '#317256'],
    chart: {
      type: 'donut'
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false // Hide all data labels
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 50
          },
          legend: {
            // enable: false,
            show: false
            // position: 'bottom'
          }
        }
      }
    ]
  }
};

export default function Donut1() {
  return (
    // <div>
    // <div id="chart">
    <ReactApexChart width={100} height={100} options={state.options} series={state.series} type="donut" style={{ margin: '0' }} />
    //     </div>
    //     <div id="html-dist"></div>
    //   </div>
  );
}
