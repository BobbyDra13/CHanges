// import value from 'assets/scss/_themes-vars.scss';
// eslint-disable-next-line
export default {
  height: 343,
  type: 'donut',
  options: {
    dataLabels: {
      enabled: false
    },
    labels: ['Zivame %', 'Clovia %', 'Amanté %', 'Jockey %'],
    legend: {
      show: true,
      position: 'bottom',
      fontFamily: 'inherit',
      labels: {
        colors: 'inherit'
      }
    },
    itemMargin: {
      horizontal: 10,
      vertical: 10
    },
    colors: ['#002F01', '#7DFFCC', '#00C0A9', '#669C82'],
    responsive: [
      {
        breakpoint: 900,
        options: {
          legend: {
            show: true,
            position: 'right',
            fontFamily: 'inherit',
            labels: {
              colors: 'inherit'
            }
          }
        }
      },
      {
        breakpoint: 600,
        options: {
          legend: {
            show: true,
            position: 'bottom',
            fontFamily: 'inherit',
            labels: {
              colors: 'inherit'
            }
          }
        }
      }
    ]
  },
  series: [24, 16, 32, 28]
};
