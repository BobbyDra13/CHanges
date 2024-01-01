<<<<<<< HEAD
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
=======
import { React, useEffect, useState } from 'react';

// APIs
import { GetAnomaliesBarChartData } from 'api';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Skeleton } from '@mui/material';
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6

// third-party
import ReactApexChart from 'react-apexcharts';

<<<<<<< HEAD
=======
// assets import
import NoDataImg from '../../assets/images/No_data-amico.svg';

>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 329,
    toolbar: {
      show: false
    }
  },
<<<<<<< HEAD
=======
  colors: ['#ff413a', '#00ac69'],
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
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
<<<<<<< HEAD
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yaxis: {
   show: false,
=======
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
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
<<<<<<< HEAD
  tooltip: {
=======
  grid: {
    borderColor: grey[200]
  },
  tooltip: {
    theme: 'dark',
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
    y: {
      formatter(val) {
        return `${val}`;
      }
    }
  },
  legend: {
<<<<<<< HEAD
=======
    position: 'top',
    horizontalAlign: 'right',
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
    show: false,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
<<<<<<< HEAD
      useSeriesColors: false
=======
      useSeriesColors: false,
      colors: grey[400]
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2
    },
    itemMargin: {
      horizontal: 0,
      vertical: 0
    }
  },
  responsive: [
    {
      breakpoint: 3000,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

// ==============================|| ANOMALIES BAR CHART ||============================== //

<<<<<<< HEAD
const AnomaliesBarChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text.primary;
  const line = theme.palette.grey[200];

  const error = theme.palette.error.main;
  const primaryMain = theme.palette.primary.main;
  //   const successDark = theme.palette.success.dark;

  const [series] = useState([
    {
      name: 'Anomalies remaining',
      data: [180, 90, 135, 114, 120, 145]
    },
    {
      name: 'Anomalies resolved',
      data: [120, 45, 78, 150, 168, 99]
    }
  ]);

  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [error, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'dark'
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.400'
        }
      }
    }));
  }, [primary, secondary, line, error, primaryMain]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type={options.chart.type} height={options.chart.height} />
    </div>
=======
const AnomaliesBarChart = ({ date }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [chartData, setChartData] = useState(false);

  useEffect(() => {
    async function fetchBarChartData() {
      const body = {
        start_date: date.toString(),
        Store_IDs: ['6582be9ac5ed94d792a563b8']
      };
      setChartData(false);

      try {
        const data = await GetAnomaliesBarChartData(body);
        if (data) {
          // console.log('BarDATA', data);
          if (data.data.length > 0) {
            const extractedDates = data.data.map((item) => item.date);
            const extractedResolved = data.data.map((item) => item.resolveCounts.resolved ?? 0);
            const extractedUnresolved = data.data.map((item) => item.resolveCounts.unresolved ?? 0);
            setOptions({
              ...columnChartOptions,
              xaxis: {
                categories: extractedDates
              }
            });
            setSeries([
              {
                name: 'Anomalies remaining',
                data: extractedUnresolved
              },
              {
                name: 'Anomalies resolved',
                data: extractedResolved
              }
            ]);
          }
          setChartData(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBarChartData();
  }, [date]);

  // console.log('Dates', extractedDates);
  // console.log('Resolved', extractedResolved);
  // console.log('Unresolved', extractedUnresolved);
  // console.log('Options', options);
  // console.log('Series', series);
  return (
    <>
      {chartData.length > 0 ? (
        <div id="chart">
          <ReactApexChart options={options} series={series} type={options.chart.type} height={options.chart.height} />
        </div>
      ) : chartData.length === 0 ? (
        <div className="w-full h-full flex justify-center place-items-center">
          <img style={{ height: '344px' }} src={NoDataImg} alt="No data" />
        </div>
      ) : (
        <Skeleton sx={{ margin: -3, paddingRight: -3 }} animation="wave" variant="rounded" width={'120%'} height={392} />
      )}
    </>
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
  );
};

export default AnomaliesBarChart;
