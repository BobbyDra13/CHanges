import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
// import { getStoreWiseRadarChart } from 'api';

const RadarChart = ({ date, data }) => {
  const [radarData, setRadarData] = useState(null);
  const [options, setOptions] = useState({});

  const defaultOption = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false
      }
    },
    series: [
      {
        name: 'No data available',
        data: [0, 0, 0]
      }
    ],
    labels: ['Correct', 'Empty Shelf', 'Missing Tester']
  };

  useEffect(() => {
    const fetchData = async () => {
      setRadarData(null);
      // const body = {
      //   date: date.toString(),
      //   store_id: storeId
      // };
      try {
        // const response = await getStoreWiseRadarChart(body);
        // const data2 = response.data[0];
        if (data) {
          setRadarData(data);
          console.log('data is...', data);
          // const labels = ['Correct', 'Empty Shelf', 'Missing Tester'];
          // const seriesData = [data.correct, data.empty_tray, data.missing_tester];
          const labels = data.map((item) => item._id);
          const seriesData = data.map((item) => item.OSA_Score);
          setOptions({
            chart: {
              type: 'radar',
              toolbar: {
                show: false
              }
            },
            series: [
              {
                name: 'Count',
                data: seriesData
              }
            ],
            labels: labels
          });
        } else {
          setOptions(defaultOption);
        }
      } catch (error) {
        console.log('error fetching radar chart data', error);
        setOptions(defaultOption);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [date, data]);

  return (
    <div className="h-full p-2">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-xl">Store Goodness Profile</p>
        {radarData !== null ? (
          <Chart options={options} series={options.series} type="radar" height={240} />
        ) : (
          <div className="flex-grow relative">
            <Chart className="relative" options={defaultOption} series={defaultOption.series} type="radar" height={240} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RadarChart;
