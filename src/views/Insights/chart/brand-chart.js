// import value from 'assets/scss/_themes-vars.scss';
// eslint-disable-next-line
export default {
  height: 343,
  type: 'donut',
  options: {
    dataLabels: {
      enabled: false
    },
<<<<<<< HEAD
    labels: ['Zivame %', 'Clovia %', 'Amanté %', 'Jockey %'],
=======
    labels: [],
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
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
<<<<<<< HEAD
  series: [24, 16, 32, 28]
=======
  series: [0]
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
};
