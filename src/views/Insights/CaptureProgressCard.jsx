import React, { useState, useEffect } from 'react';
import KpiCard from './KpiCard/index';
// import { GetCaptureProgress } from 'api';
import { useTheme, Skeleton, Card, Stack, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function CaptureProgressCard({ date }) {
  const theme = useTheme();
  const [popData, setPopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popChipData, setPopChipData] = useState('');
  const [capStatus, setCapStatus] = useState(true);
  const [popPercentage, setPopPercentage] = useState('0');
  const [status, setStatus] = useState([]);
  const [dates, setDates] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const toLocalDateString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
    return localISOTime;
  };

  // const selectedDate = toLocalDateString(useSelector((state) => state.customization.selectedDate).start_date);
  const start_date = toLocalDateString(useSelector((state) => state.customization.selectedDate).start_date);
  const end_date = toLocalDateString(useSelector((state) => state.customization.selectedDate).end_date);

  const userId= JSON.parse( localStorage.getItem('userData'))?.data[0]?._id;
  console.log('User ID:', userId);

  const dummyData = {
    data: [0, 0, 0, 0, 0, 0, 0],
    captureStatus: [true, true, true, true, true, true, true],
    categories: ['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA']
  };

  useEffect(() => {
    async function getData() {
      const body = {
        // date: date.toString(),
        start_date: start_date,
        end_date: end_date,
        user_id: userId
      };

      try {
        setLoading(true);
        const data = await GetCaptureProgress(body);
        console.log('Capture Progress:', data);

        if (!data) {
          setIsDataAvailable(false);
          setStatus(dummyData.captureStatus);
          setDates(dummyData.categories);
          setPopData(dummyData.data);
          setPopChipData('NA%');
          setPopPercentage('NA');
          setCapStatus(false);
          setLoading(false);
          return;
        }

        const popScoreFullnessLine = data.data;
        setIsDataAvailable(true);

        const popScoreFullness = popScoreFullnessLine.map((item) => {
          return item && item.average_CP !== 'No data found' ? `${parseFloat(item.average_CP).toFixed(2)}%` : '0%';
        });
        setPopData(popScoreFullness);

        const lastElement = parseFloat(popScoreFullness[popScoreFullness.length - 1]) || 0;
        const secondLastElement = parseFloat(popScoreFullness[popScoreFullness.length - 2]) || 0;
        const difference = `${(lastElement - secondLastElement).toFixed(1)}`;
        console.log('Difference:', difference);

        setPopChipData(difference);

        const formattedDates = popScoreFullnessLine.map((item) => {
          return item.average_CP ? item.timestamp : `${item.timestamp} (Data not captured)`;
        });
        console.log('Dates:', formattedDates);
        setDates(formattedDates);

        const captureStatus = popScoreFullnessLine.map(() => true);
        setStatus(captureStatus);

        if (!data.data) {
          setPopPercentage('0');
        } else {
          const percentage = `${parseFloat(data.data[6].average_CP).toFixed(1)}%`;
          setPopPercentage(percentage);
          setCapStatus(true);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching capture progress:', error);
        setIsDataAvailable(false);
        setStatus(dummyData.captureStatus);
        setDates(dummyData.categories);
        setPopData(dummyData.data);
        setPopChipData('NA%');
        setPopPercentage('NA');
        f;
        setCapStatus(false);
        setLoading(false);
      }
    }

    getData();
    // eslint-disable-next-line
  }, [date, userId]);

  const chartConfig = {
    type: 'line',
    height: 100,
    series: [
      {
        name: 'Capture Progress %',
        data: popData
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      colors: [isDataAvailable ? '#10b981' : '#dadada'],
      markers: {
        discrete: status.map((stat, index) => ({
          seriesIndex: 0,
          dataPointIndex: index,
          fillColor: !isDataAvailable ? '#dadada' : stat ? '#10b981' : '#dadada',
          strokeColor: 'white',
          size: 7
        }))
      },
      title: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'category',
        categories: dates,
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
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false,
          style: {
            colors: '#fff',
            fontSize: '13px',
            fontFamily: 'inherit',
            fontWeight: 300
          }
        },
        max: 100
      },
      stroke: {
        lineCap: 'round',
        curve: 'smooth',
        width: 5
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
    }
  };

  return (
    <>
      {loading ? (
        <Card sx={{ paddingTop: 0, paddingBottom: 2.25 }}>
          <Stack spacing={0.5}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height={133} />
            <Grid container alignItems="center">
              <Grid item>
                <Skeleton
                  sx={{ marginLeft: 2.25, marginTop: 0.75, marginRight: 2.25 }}
                  animation="wave"
                  variant="rounded"
                  width={82}
                  height={35}
                />
              </Grid>
              <Skeleton sx={{ marginTop: 1.75 }} animation="wave" variant="rounded" width={55} height={26} />
            </Grid>
            <Typography sx={{ paddingLeft: 2.25, paddingRight: 2.25 }} variant="h5" color="textSecondary">
              Capture Progress
            </Typography>
          </Stack>
        </Card>
      ) : (
        <KpiCard
          isLoaded
          chart={chartConfig}
          title="Capture Progress"
          count={`${!isDataAvailable ? 'NA' : parseFloat(popPercentage) === 0 ? '0' : popPercentage}`}
          percentage={`${isDataAvailable ? Math.abs(popChipData) : 'NA'}%`}
          chipColor={!capStatus ? '#9CA3AF' : +popChipData < 0 ? '#FF6761' : '#10B981'}
          isLoss={+popChipData < 0}
          color={!isDataAvailable ? '#9ca3af' : capStatus ? theme.palette.success.main : '#9ca3af'}
        />
      )}
    </>
  );
}

export default CaptureProgressCard;
