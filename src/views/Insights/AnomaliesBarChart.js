import { React, useEffect, useState } from 'react';

// APIs
import { GetAnomalies } from 'api';
// , GetAnomaliesBarChartData

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
  colors: ['#00ac69', '#ff413a'],
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

  useEffect(() => {
    async function fetchBarChartData() {
      const finalDate = selectedDate ? selectedDate : todayDate;
      const body = {
        date: finalDate,
        store_id: '65c74d4112465588b7a4984c'
      };

      try {
        const data = await GetAnomalies(body);
        if (data) {
          console.log('BarDATA', data.data.response);
          if (data.data.response.length > 0) {
            const extractedDates = data.data.response.map((item) => item.Date);
            const extractedResolved = data.data.response.map((item) => item.anomalies_resolved);
            const extractedFound = data.data.response.map((item) => item.anomalies_found);
            setOptions({
              ...columnChartOptions,
              xaxis: {
                categories: extractedDates
              }
            });
            setSeries([
              {
                name: 'Anomalies Resolved',
                data: extractedResolved
              },
              {
                name: 'Anomalies Found',
                data: extractedFound
              }
            ]);
          }
          setChartData(data.data.response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBarChartData();
    return () => {
      setChartData(null);
    };
    //eslint-disable-next-line
  }, [selectedDate]);

  return (
    <>
      {chartData && chartData.length > 0 ? (
        <div id="chart">
          <ReactApexChart options={options} series={series} type={options.chart.type} height={options.chart.height} />
        </div>
      ) : chartData && chartData.length === 0 ? (
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
