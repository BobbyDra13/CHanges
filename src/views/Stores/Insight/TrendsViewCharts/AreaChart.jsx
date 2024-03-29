import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// import { footfallGraph } from 'api/sentinelAPI';
import { GetFullnessPop } from 'api';
// import Bubbledxaxis from './Bubbledx-axis';
// import {footfallGraph} from "api/sentinelAPI";
// const footfalldata=footfallGraph();

const Areachart = ({ date }) => {
  const [category, setCategory] = useState([]);
  const [custCount, setCustCount] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      // console.log(date);
      const body = {
        // start_date: date,
        // storeId: '65c5e26a0b5be5dc7af327dc'
        date: date,
        store_id: '65c74d4112465588b7a4984c'
      };
      try {
        setLoading(true);
        const data = await GetFullnessPop(body);
        // console.log(data);
        if (data) {
          const catagorydata = data.data.map((d) => d._id);
          console.log(catagorydata);
          const custdata = data.data.map((d) => (d.data != 'Data not found for this date' ? d.data.FullnessPopPercent : 0));
          console.log(custdata);
          setCategory(catagorydata);
          setCustCount(custdata);
          setLoading(false);
        }
        // return data;
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [date]);

  //graph options start

  const state = {
    series: [
      {
        name: 'Pop Score',
        data: custCount
        // [4, 7, 4, 20, 18, 80, 100,40, 60,30, 20, 33, 15,9, 4 ]
      }
      //     , {
      //       name: 'Male',
      //       data: [3, 6, 2, 12, 10, 52, 41,80,40, 85, 56,18,20,9,4]
      //     },
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
        customLegendItems: ['Pop Score'],
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
      colors: ['#37c6fa']
      // , '#9887fa', '#9C27B0'],
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
          <ReactApexChart options={state.options} series={state.series} type="area" width="100%" height={400} />
        </Box>
      ) : (
        <div className="w-full h-full flex justify-center place-items-center text-xl">No data</div>
      )}
    </>
  );
};

export default Areachart;
