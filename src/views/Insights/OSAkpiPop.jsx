import React, { useState, useEffect } from 'react';
import KpiCard from './index';
import { getOSAScoreDataKPI } from 'api';
import { useTheme, Skeleton, Card, Stack, Grid, Typography } from '@mui/material';

function OSAkpiPop({ date }) {
  const theme = useTheme();

  const [popData, setPopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popChipData, setPopChipData] = useState('');
  const [capStatus, setCapStatus] = useState(true);
  const [popPercentage, setPopPercentage] = useState('0');
  // const [status, setStatus] = useState([]);
  const [dates, setDates] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const user_id = JSON.parse(localStorage.getItem('userData')).data._id;
  console.log('yyaa', user_id);

  const dummyData = {
    data: [0, 0, 0, 0, 0, 0, 0],
    capture_status: [false, false, false, false, false, false, false],
    categories: ['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA']
  };

  useEffect(() => {
    async function getData() {
      const body = {
        date: date.toString(),
        user_id: "666fef1bdbf527b634e95c0b" // hard coded to show sample data
        // user_id: user_id
      };

      try {
        setLoading(true);
        const data = await getOSAScoreDataKPI(body);
        console.log('fhk', data);
        if (data === undefined) {
          setIsDataAvailable(false);
          // setStatus(dummyData.capture_status);
          setDates(dummyData.categories);
          setPopData(dummyData.data);
          setPopChipData('NA%');
          setPopPercentage('NA');
          setCapStatus(false);
          setLoading(false);
        }
        const popScoreFullnessLine = data.data.averagedResults;
        setIsDataAvailable(true);
        const popScoreFullness = popScoreFullnessLine.map((item) => {
          // if (item && item.averageOSAScore != 'No data found') {
          if(item) {
            // const percentage = parseFloat(item.averageOSAScore.replace('%', ''));
            const percentage = item.averageOSAScore;
            return `${percentage.toFixed(2)}%`;
          } else {
            return '0%';
          }
        });
        setPopData(popScoreFullness);
        const lastElement = parseFloat(popScoreFullness[popScoreFullness.length - 1].replace('%', '')) || 0;
        const secondLastElement = parseFloat(popScoreFullness[popScoreFullness.length - 2].replace('%', '')) || 0;
        const difference = `${(lastElement - secondLastElement).toFixed(1)}`;
        setPopChipData(difference);

        const Dates = popScoreFullnessLine.map((item) => {
          // let date = item.capture_status ? item.date : ${item.date} (Data not captured);
          let date = item.date;
          return date;
        }).reverse();
        console.log('Dates', Dates);
        setDates(Dates);

        // const CaptureStatus = popScoreFullnessLine.map((i) => {
        //   return i.capture_status;
        // });
        // setStatus(CaptureStatus);

        if (data.data === null) {
          setPopPercentage('0');
        } else {
          let percentage = `${parseFloat(popScoreFullnessLine[6].averageOSAScore).toFixed(1)}%`;
          setPopPercentage(percentage);
          // setCapStatus(data.data[6].capture_status);
        }
        
    }

       catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
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
        name: 'OSA Score%',
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
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 0,
            fillColor: !isDataAvailable ? '#dadada' : status[0] ? '#10b981' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 1,
            fillColor: !isDataAvailable ? '#dadada' : status[1] ? '#10b981' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 2,
            fillColor: !isDataAvailable ? '#dadada' : status[2] ? '#10b981' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 3,
            fillColor: !isDataAvailable ? '#dadada' : status[3] ? '#10b981' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 4,
            fillColor: !isDataAvailable ? '#dadada' : status[4] ? '#10b981' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 5,
            fillColor: !isDataAvailable ? '#dadada' : status[5] ? '#10b981' : '#dadada',
            strokeColor: 'white',
            size: 7
          },
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: !isDataAvailable ? '#dadada' : status[6] ? '#10b981' : '#dadada',
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
              OSA Score
            </Typography>
          </Stack>
        </Card>
      ) : (
        <KpiCard
          isLoaded={true}
          chart={chartConfig}
          title="OSA Score"
          count={`${!isDataAvailable ? 'NA' : parseFloat(popPercentage) === 0 ? '0%' : popPercentage}`}
          percentage={`${isDataAvailable ? Math.abs(popChipData) : 'NA'}%`}
          // chipColor={!capStatus ? '#9CA3AF' : +popChipData < 0 ? '#FF6761' : '#10B981'}
          isLoss={+popChipData < 0}
          // color={!isDataAvailable ? '#9ca3af' : capStatus ? theme.palette.success.main : '#9ca3af'}
        />
      )}
    </>
  );
}

export default OSAkpiPop