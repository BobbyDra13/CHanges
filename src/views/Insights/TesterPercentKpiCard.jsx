import React, { useState, useEffect } from 'react';
import KpiCard from './KpiCard/index';
import { GetAnomalies, testerPercentSevenDayMultistore } from 'api';
import { useTheme, Skeleton, Card, Stack, Grid, Typography } from '@mui/material';

function TesterPercentKpiCard({ date }) {
  const theme = useTheme();

  const [anomalyData, setAnomalyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anomalyChipData, setAnomalyChipData] = useState('');
  const [capStatus, setCapStatus] = useState(true);
  const [anomalyPercentage, setAnomalyPercentage] = useState('0');
  const [status, setStatus] = useState([]);
  const [dates, setDates] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
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

  const getsevendaysdata = async () => {
    const data = {
      start_date: date,
      //  user_id : "666fef1bdbf527b634e95c0b"
      user_id: '66795cbe1d905892a4256692'
    };
    console.log('Request data:', data);
    try {
      const res = date && (await testerPercentSevenDayMultistore(data));
      console.log('lodu', res);
      const anomaly =
        res && res.data && res.data.TesterScore.length > 0 && res.data.TesterScore.map((item) => (item ? item.toFixed(2) : 0));
      if (res.data.TesterScore.length > 0) setIsDataAvailable(true);
      const stat = [];
      //eslint-disable-next-line
      const anomaly1 =
        res &&
        res.data &&
        res.data.TesterScore.length > 0 &&
        res.data.TesterScore.map((item, index) => (item > 0 ? (stat[index] = true) : (stat[index] = false)));

      setStatus(stat);

      console.log('animalt from anamoly', anomaly);
      setAnomalyData(anomaly);
      const lastdaypercent = anomaly.length > 0 ? anomaly[anomaly.length - 1] : 0;
      setAnomalyPercentage(lastdaypercent);
    } catch (e) {
      console.log('error in getsevendays', e);
    }
  };
  useEffect(() => {
    getsevendaysdata();
    //eslint-disable-next-line
  }, [date]);
  const dummyData = {
    data: [0, 0, 0, 0, 0, 0, 0],
    capture_status: [true, true, true, true, true, true, false],
    categories: getLastWeekDates(date)
  };

  useEffect(() => {
    async function getData() {
      const body = {
        date: date.toString(),
        user_id: '66795cbe1d905892a4256692'
      };

      try {
        setLoading(true);
        const data = await GetAnomalies(body);
        if (data === undefined) {
          setIsDataAvailable(false);
          setStatus(dummyData.capture_status);
          setDates(dummyData.categories);
          setAnomalyData(dummyData.data);
          setAnomalyChipData('NA');
          setAnomalyPercentage('NA');
          setCapStatus(false);
          setLoading(false);
        }
        const popScoreFullnessLine = data.data;
        setIsDataAvailable(true);
        const anomaliesDetectedLine = popScoreFullnessLine.map((item) => {
          if (item.anomaliesFound) {
            const percentage = item.anomaliesFound;
            return percentage;
          } else {
            return 0;
          }
        });
        setAnomalyData(anomaliesDetectedLine);
        const lastElement = anomaliesDetectedLine[anomaliesDetectedLine.length - 1] || 0;
        const secondLastElement = anomaliesDetectedLine[anomaliesDetectedLine.length - 2] || 0;
        const difference = lastElement - secondLastElement;
        console.log('difference', difference);
        setAnomalyChipData(difference);

        const Dates = popScoreFullnessLine.map((item) => {
          let date = item.capture_status ? item.date : `${item.date} (Data not captured)`;
          return date;
        });
        console.log('Dates', Dates);
        setDates(Dates);

        const CaptureStatus = popScoreFullnessLine.map((i) => {
          return i.capture_status;
        });
        setStatus(CaptureStatus);

        if (data.data === null) {
          setAnomalyPercentage('0%');
        } else {
          setAnomalyPercentage(anomaliesDetectedLine[anomaliesDetectedLine.length - 1]);
          setCapStatus(data.data[6].capture_status);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
    //eslint-disable-next-line
  }, [date]);

  const chartConfig = {
    type: 'line',
    height: 100,
    series: [
      {
        name: 'Tester Percent',
        data: anomalyData
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      colors: [isDataAvailable ? '#ff413a' : '#dadada'],
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 0,
            fillColor: !isDataAvailable ? '#dadada' : status[0] ? '#ff413a' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 1,
            fillColor: !isDataAvailable ? '#dadada' : status[1] ? '#ff413a' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 2,
            fillColor: !isDataAvailable ? '#dadada' : status[2] ? '#ff413a' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 3,
            fillColor: !isDataAvailable ? '#dadada' : status[3] ? '#ff413a' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 4,
            fillColor: !isDataAvailable ? '#dadada' : status[4] ? '#ff413a' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 5,
            fillColor: !isDataAvailable ? '#dadada' : status[5] ? '#ff413a' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: !isDataAvailable ? '#dadada' : status[6] ? '#ff413a' : '#dadada',
            strokeColor: 'white',
            size: 7
          }
        ]
      },

      title: {
        show: ''
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
            <Skeleton animation="wave" variant="rectangular" width={'100%'} height={133} />
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
              Tester Score
            </Typography>
          </Stack>
        </Card>
      ) : (
        <KpiCard
          isLoaded={true}
          chart={chartConfig}
          title="Tester Score"
          count={isDataAvailable ? anomalyPercentage : 'N/A'}
          percentage={isDataAvailable ? Math.abs(anomalyChipData) : 'NA'}
          chipColor={!capStatus ? '#9CA3AF' : anomalyChipData >= 0 ? '#FF6761' : '#10B981'}
          isLoss={anomalyChipData < 0}
          color={isDataAvailable ? theme.palette.error.main : '#9CA3AF'}
        />
      )}
    </>
  );
}

export default TesterPercentKpiCard;
