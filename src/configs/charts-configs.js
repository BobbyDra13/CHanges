export const chartsConfig = {
  chart: {
    toolbar: {
      show: false
    }
  },
  
  title: {
    show: ''
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    labels: {
      style: {
        colors: '#fff',
        fontSize: '13px',
        fontFamily: 'inherit',
        fontWeight: 300
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#fff',
        fontSize: '13px',
        fontFamily: 'inherit',
        fontWeight: 300
      }
    }
  },
  grid: {
    show: false,
    borderColor: '#ffffff40',
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: false
      }
    },
    padding: {
      top: 5,
      right: 20
    }
  },
  fill: {
    opacity: 0.8
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (val) => (val === 0 ? 'NILL' : val)
    }
  }
};

export default chartsConfig;
