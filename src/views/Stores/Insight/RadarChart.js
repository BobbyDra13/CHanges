import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { getStoreWiseRadarChart } from 'api';

const RadarChart = ({ storeId, date }) => {
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
    labels: ['Missing Tester', 'Empty Tray', 'Correct']
  };

  useEffect(() => {
    const fetchData = async () => {
      setRadarData(null);
      const body = {
        date: date.toString(),
        store_id: storeId
      };
      try {
        const response = await getStoreWiseRadarChart(body);
        const data = response.data[0];
        if (data) {
          setRadarData(data);
          const labels = ['Missing Tester', 'Empty Tray', 'Correct'];
          const seriesData = [data.missing_tester, data.empty_tray, data.correct];
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
  }, [date]);

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
