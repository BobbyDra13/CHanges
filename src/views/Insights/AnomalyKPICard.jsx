import React, { useState, useEffect } from 'react';
import KpiCard from './KpiCard/index';
import { GetAnomalies } from 'api';
import { useTheme, Skeleton, Card, Stack, Grid, Typography } from '@mui/material';

function AnomalyKPICard({ date }) {
  const theme = useTheme();

  const [anomalyData, setAnomalyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anomalyChipData, setAnomalyChipData] = useState('');
  const [capStatus, setCapStatus] = useState(true);
  const [anomalyPercentage, setAnomalyPercentage] = useState('0');
  const [status, setStatus] = useState([]);
  const [dates, setDates] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const dummyData = {
    data: [0, 0, 0, 0, 0, 0, 0],
    capture_status: [true, true, true, true, true, true, false],
    categories: ['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA']
  };

  useEffect(() => {
    async function getData() {
      const body = {
        date: date.toString(),
        user_id: '660a457638e022104c155c06'
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
        name: 'Anomalies',
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
              PoP Score
            </Typography>
          </Stack>
        </Card>
      ) : (
        <KpiCard
          isLoaded={true}
          chart={chartConfig}
          title="Exceptions Found"
          count={`${anomalyPercentage}`}
          percentage={isDataAvailable ? Math.abs(anomalyChipData) : 'NA'}
          chipColor={!capStatus ? '#9CA3AF' : anomalyChipData >= 0 ? '#FF6761' : '#10B981'}
          isLoss={anomalyChipData < 0}
          color={isDataAvailable ? theme.palette.error.main : '#9CA3AF'}
        />
      )}
    </>
  );
}

export default AnomalyKPICard;
