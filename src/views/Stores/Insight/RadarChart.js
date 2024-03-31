import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { GetpopKPI } from 'api';

const RadarChart = ({ date }) => {
  const [radarData, setRadarData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const body = {
        date: date.toString(),
        store_id: '65c74d4112465588b7a4984c'
      };
      const response = await GetpopKPI(body);
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
  }, [date]);

  return (
    <div className="h-full p-2 ">
      {radarData.length !== 0 ? (
        <div className="flex flex-col items-center">
          <p className="font-semibold text-xl  ">Store Goodness Profile</p>
          <Chart options={options} series={options.series} type="radar" height={240} />
        </div>
      ) : (
        <div className="text-2xl text-center h-full bg-slate-100 p-5 rounded-lg">No data available</div>
      )}
    </div>
  );
};

export default RadarChart;
