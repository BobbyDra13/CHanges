import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// import { footfallGraph } from 'api/sentinelAPI';
// import { GetFullnessPop, GetSevenDayCapProgress } from 'api';
// import Bubbledxaxis from './Bubbledx-axis';
// import {footfallGraph} from "api/sentinelAPI";
// const footfalldata=footfallGraph();

const Areachart = ({ storeId, date }) => {
  const [category, setCategory] = useState([]);
  const [custCount, setCustCount] = useState([]);
  const [capProgress, setCapProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    async function getData() {
      console.log(date);
      const body = {
        date: date,
        store_id: storeId
      };
      try {
        setLoading(true);
        // const data = await GetFullnessPop(body);
        const data = { data: [] };
        // console.log("data", data);
        if (data) {
          const catagorydata = data.data.map((d) => d.date);
          // console.log("catagorydata", catagorydata);
          const custdata = data.data.map((d) => (d.data != 'Data not found' ? parseFloat(d.pop_percentage).toFixed(1) : 0));
          // console.log("custdata", custdata);
          setCategory(catagorydata);
          setCustCount(custdata);
          setLoading(false);
        }
        // return data;
      } catch (error) {
        console.log(error);
      }
    }

    async function getCaptureData() {
      console.log('date', date);
      const captureBody = {
        date: date,
        store_id: storeId
      };
      try {
        setLoading(true);
        // const capData = await GetSevenDayCapProgress(captureBody);
        const capData = { data: [] };
        console.log('capture_data', capData);
        if (capData) {
          const capturedata = capData.data.map((d) => d.date);
          // console.log("capturedata", capturedata);
          const capture = capData.data.map((d) => (d.data != 'Data not found' ? parseFloat(d.capture_percentage).toFixed(1) : 0));
          // console.log("capture", capture);
          const statusArray = capData.data.map((d) => d.capture_status);
          // console.log('statusArray', statusArray);
          setCategory(capturedata);
          setCapProgress(capture);
          setLoading(false);
          setStatus(statusArray);
        }
        // return data;
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    getCaptureData();
    // eslint-disable-next-line
  }, [date]);
  // console.log("capturesss", capProgress);
  // console.log("pop", custCount);
  //graph options start

  const state = {
    series: [
      {
        name: 'Capture Progress',
        data: capProgress
      },
      {
        name: 'Pop Score',
        data: custCount
        // [4, 7, 4, 20, 18, 80, 100,40, 60,30, 20, 33, 15,9, 4 ]
      }
      // {

      //         name: 'Female',
      //         data: [2, 4, 3, 10, 9, 62, 51,40, 20 ,18, 15,10,6,4,2]

      // }
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
        type: 'datetime',
        tickAmount: 15,
        categories: category,
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
          format: 'dd/MM/yy HH:mm'
        }
      },
      // toolbar: {
      //   show: false, // Set to false to hide the toolbar/menu items above the chart
      // },
      yaxis: {
        type: 'Number'
        // categories:['0','5','10','15','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95','100']
      },
      colors: ['#10b981', '#06b6d4']
    }
  };

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
      ) : custCount.length > 0 ? (
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
