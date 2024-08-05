import { Box, CircularProgress } from '@mui/material';
// import { getsevendaydata } from 'api';

import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// import { useParams } from 'react-router';f
// import { footfallGraph } from 'api/sentinelAPI';
// import { GetFullnessPop, GetSevenDayCapProgress } from 'api';
// import Bubbledxaxis from './Bubbledx-axis';
// import {footfallGraph} from "api/sentinelAPI";
// const footfalldata=footfallGraph();

const Areachart = ({
  //  storeId,f
  date,
  capture7days,
  Osa7days,
  testfullness7days
}) => {
  // const { store } = useParams();
  //eslint-disable-next-line
  const [category, setCategory] = useState([]);
  //eslint-disable-next-line
  const [custCount, setCustCount] = useState([]);
  //eslint-disable-next-line
  const [capProgress, setCapProgress] = useState([]);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [
    status
    // , setStatus
  ] = useState([]);
  // const [capture7days, setcapture7days] = useState(null);
  // const [fullness7days, setfullness7days] = useState(null);
  // const [Osa7days, setOsa7days] = useState(null);
  // function getLastSevenDaysDates() {
  //   const today = new Date();
  //   const dates = [];

  //   // Loop through the last seven days
  //   for (let i = 0; i < 7; i++) {
  //     const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
  //     const formattedDate = day.toLocaleDateString('en-US'); // Format as YYYY-MM-DD
  //     dates.push(formattedDate);
  //   }

  //   return dates.reverse(); // Reverse to show most recent day first
  // }

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

  // const get7daysdata = async (date) => {
  //   try {
  //     const result = (store && date) && await getsevendaydata(date, store);
  //     console.log('result from get7daysdata', result);
  //     result && setcapture7days(result.capture7days);
  //     result && setfullness7days(result.testerFullness7days);
  //     result && setOsa7days(result.OSA7days);
  //   } catch (error) {
  //     console.log('error in get7daysdata', error);
  //   }
  // };

  // useEffect(() => {
  //   get7daysdata(date);
  // }, []);
  // useEffect(() => {
  //   get7daysdata(date);
  // }, [date, store]);

  // console.log("capturesss", capProgress);
  // console.log("pop", custCount);
  //graph options start

  const [state, setstate] = useState({
    series: [
      {
        name: 'Capture Progress',
        data: capture7days && capture7days
        //  data: [90, 7, 4, 20, 18, 80, 100, 40, 60, 30, 20]
        //data: [90, 7, 4, 20, 18, 80, 100, 40, 60, 30, 20, 33, 15, 9, 4]
      },
      {
        name: 'Tester Fulless',
        data: testfullness7days && testfullness7days
        //data: [480, 7, 4, 20, 18, 80, 100, 40, 60, 30, 20]
      },
      {
        name: 'OSA Score',
        data: Osa7days && Osa7days
      }
    ],

    options: {
      chart: {
        type: 'area',
        toolbar: {
          show: false
        }
      },
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 0,
            fillColor: status[0] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 0,
            dataPointIndex: 1,
            fillColor: status[1] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 0,
            dataPointIndex: 2,
            fillColor: status[2] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 0,
            dataPointIndex: 3,
            fillColor: status[3] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 0,
            dataPointIndex: 4,
            fillColor: status[4] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 0,
            dataPointIndex: 5,
            fillColor: status[5] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: status[6] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 1,
            dataPointIndex: 0,
            fillColor: status[0] ? '#2BC0DA' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 1,
            dataPointIndex: 1,
            fillColor: status[1] ? '#2BC0DA' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 1,
            dataPointIndex: 2,
            fillColor: status[2] ? '#2BC0DA' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 1,
            dataPointIndex: 3,
            fillColor: status[3] ? '#2BC0DA' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 1,
            dataPointIndex: 4,
            fillColor: status[4] ? '#2BC0DA' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 1,
            dataPointIndex: 5,
            fillColor: status[5] ? '#2BC0DA' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 1,
            dataPointIndex: 6,
            fillColor: status[6] ? '#2BC0DA' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 2,
            dataPointIndex: 0,
            fillColor: status[0] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 2,
            dataPointIndex: 1,
            fillColor: status[1] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 2,
            dataPointIndex: 2,
            fillColor: status[2] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 2,
            dataPointIndex: 3,
            fillColor: status[3] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 2,
            dataPointIndex: 4,
            fillColor: status[4] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 2,
            dataPointIndex: 5,
            fillColor: status[5] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          },
          {
            seriesIndex: 2,
            dataPointIndex: 6,
            fillColor: status[6] ? '#33C393' : '#dadada',
            strokeColor: 'white',
            size: 12
          }
        ]
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      legend: {
        show: true, // Ensure legend is visible
        position: 'top', // Set position to 'top'
        horizontalAlign: 'center',
        // customLegendItems: ['Pop Score'],
        showForSingleSeries: true
        // ... other legend options
      },
      xaxis: {
        //  type: 'day',
        //  tickAmount: 15,

        // categories : [
        //   'mon' , 'tue' , 'wed' , 'thur', 'fri', 'sat' , 'sun'
        // ],
        categories: date && getLastWeekDates(date),
        // categories: [
        //   '2018-09-19T15:30:00.000Z',
        //   '2018-09-19T16:00:00.000Z',
        //   '2018-09-19T16:30:00.000Z',
        //   '2018-09-19T17:00:00.000Z',
        //   '2018-09-19T17:30:00.000Z',
        //   '2018-09-19T18:00:00.000Z',
        //   '2018-09-19T18:30:00.000Z'
        // ],
        // ["2018-09-19T15:30:00.000Z", "2018-09-19T16:00:00.000Z", "2018-09-19T16:30:00.000Z", "2018-09-19T17:00:00.000Z", "2018-09-19T17:30:00.000Z", "2018-09-19T18:00:00.000Z", "2018-09-19T18:30:00.000Z",  "2018-09-19T19:00:00.000Z",  "2018-09-19T19:30:00.000Z",  "2018-09-19T20:00:00.000Z",  "2018-09-19T20:30:00.000Z",  "2018-09-19T21:00:00.000Z",  "2018-09-19T21:30:00.000Z",  "2018-09-19T22:00:00.000Z",  "2018-09-19T22:30:00.000Z"],
        labels: {
          show: true // Display all labels on the X-axis
          // rotate: -45, // Rotate labels to 0 degrees
          // showDuplicates: true,
        }
      },
      tooltip: {
        // enabled:false,
        x: {
          // format: 'dd/MM/yy HH:mm'
        }
      },
      // toolbar: {
      //   show: false, // Set to false to hide the toolbar/menu items above the chart
      // },
      yaxis: {
        type: 'Number'
        // categories:['0','5','10','15','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95','100']
      },
      colors: ['#06b6d4', '#9887fa', '#e97451']
    }
  });
  useEffect(() => {
    const newSeries = [
      // Update data for each series based on your logic
      { name: 'Capture Progress', data: capture7days && capture7days },
      { name: 'Tester Fulless', data: testfullness7days && testfullness7days },
      { name: 'OSA Score', data: Osa7days && Osa7days }
    ];

    const newCategories = date && getLastWeekDates(date); // Replace with your date logic

    setstate((prevState) => ({
      ...prevState,
      series: newSeries,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: newCategories
        }
      }
    }));
    //eslint-disable-next-line
  }, [date, Osa7days, testfullness7days, capture7days]);
  //graph options end

  // console.log(footfalldata);
  return (
    <>
      {/* {custCount.length > 0 ? (
        <Box sx={{ overflow: 'hidden' }}>
          <ReactApexChart options={state.options} series={state.series} type="area" width="100%" height={400} />
        </Box>
      ) : (
        
      )} */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : Osa7days.length > 0 ? (
        <Box sx={{ overflow: 'hidden' }}>
          <ReactApexChart options={state.options} series={state.series} type="line" width="100%" height={400} />
        </Box>
      ) : (
        <div className="w-full h-full flex justify-center place-items-center text-xl">No data</div>
      )}
    </>
  );
};

export default Areachart;
