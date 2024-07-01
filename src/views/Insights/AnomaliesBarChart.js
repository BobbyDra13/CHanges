import { React, useEffect, useState } from 'react';

// APIs
import {
  // GetAnomalies,
  seven_day_anomalies
} from 'api';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Skeleton } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// assets import
import NoDataImg from '../../assets/images/No_data-amico.svg';

// chart options
const columnChartOptions = {
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

// ==============================|| ANOMALIES BAR CHART ||============================== //

const AnomaliesBarChart = ({ selectedDate }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [chartData, setChartData] = useState(null);

  const todayDate = new Date().toString();
  const user_id = JSON.parse(localStorage.getItem('userData')).data._id;
  console.log('iooio', user_id);

  function getLastWeekDates(dateString) {
    // Try parsing the date string
    try {
      const date = new Date(dateString);

      // Ensure the parsed date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format. Please provide a valid date string.');
      }

      const lastWeekDates = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
        const year = day.getFullYear();
        const month = String(day.getMonth() + 1).padStart(2, '0'); // Pad with leading zero
        const dayStr = String(day.getDate()).padStart(2, '0');
        lastWeekDates.push(`${year}-${month}-${dayStr}`);
      }
      lastWeekDates.reverse();
      return lastWeekDates;
    } catch (error) {
      console.error('Error getting last week dates:', error.message);
      return []; // Return empty array on error
    }
  }

  useEffect(() => {
    async function fetchBarChartData() {
      const finalDate = selectedDate ? selectedDate : todayDate;
      const body = {
        date: finalDate,
        user_id: '66795cbe1d905892a4256692'
        // user_id: "666fef1bdbf527b634e95c0b"
      };

      try {
        const data = selectedDate && (await seven_day_anomalies(body));
        console.log('data from data', data);

        if (data) {
          if (data.data.length > 0) {
            const extractedDates = data.data.map((item) => item.date);
            const extractedFound = data.data.map((item) => parseInt(item.anomaly_count) || 0);
            const extractedResolved = data.data.map((item) => parseInt(item.resolved_anomaly_count) || 0);
            console.log(extractedDates);
            setChartData(data.data);
            // console.log('BarDATA', extractedFound);
            console.log(extractedDates);
            console.log(extractedResolved);
            console.log(extractedFound);
            console.log(chartData);
            setOptions({
              ...columnChartOptions,
              xaxis: {
                categories: getLastWeekDates(selectedDate)
              }
            });
            setSeries([
              {
                name: 'Anomalies Found',
                data: extractedFound
              },
              {
                name: 'Anomalies Resolved',
                data: extractedResolved
              }
              // {
              //   name: 'Capture Status',
              //   data: extractedFound
              // }
            ]);
          }
        }
      } catch (error) {
        console.log('error from seven day anomalies', error);
      }
    }

    fetchBarChartData();
    // return () => {
    //   setChartData(null);
    // };
    //eslint-disable-next-line
  }, [selectedDate]);
  console.log('chartData', chartData);
  return (
    <>
      {chartData && chartData.length > 0 ? (
        <div id="chart">
          <ReactApexChart options={options} series={series} type={options.chart.type} height={options.chart.height} />
        </div>
      ) : chartData === null ? (
        <div className="w-full h-full flex justify-center place-items-center">
          <img style={{ height: '344px' }} src={NoDataImg} alt="No data" />
        </div>
      ) : (
        <Skeleton sx={{ margin: -3, paddingRight: -3 }} animation="wave" variant="rounded" width={'120%'} height={392} />
      )}
    </>
  );
};

export default AnomaliesBarChart;
