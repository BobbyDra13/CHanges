import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
// import { GetpopKPI } from 'api';

const RadarChart = ({ storeId, date }) => {
  const [radarData, setRadarData] = useState([]);
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
        data: [0, 0, 0, 0, 0, 0, 0, 0]
      }
    ],
    labels: ['W12001', 'W12002', 'W12003', 'W16002', 'W16003', 'W16004', 'W16005', 'W16006']
  };

  useEffect(() => {
    const fetchData = async () => {
      const body = {
        date: date.toString(),
        store_id: storeId
      };
      // const response = await GetpopKPI(body);
      const response = { data: [] };
      setRadarData(response.data);
      console.log('RadarData', response.data);
      const labels = response.data.length !== 0 ? response.data.map((item) => item.zone_id) : [];
      const seriesData = response.data.length !== 0 ? response.data.map((item) => parseFloat(item.data.FullnessPopPercent)) : [];
      setOptions({
        chart: {
          type: 'radar',
          toolbar: {
            show: false
          }
        },
        series: [
          {
            name: 'PoP percentage',
            data: seriesData
          }
        ],
        labels: labels
      });
    };
    fetchData();
    // eslint-disable-next-line
  }, [date]);

  return (
    <div className="h-full p-2 ">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-xl  ">Store Goodness Profile</p>
        {radarData.length !== 0 ? (
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
