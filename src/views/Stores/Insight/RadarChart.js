import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { GetRadarChartData } from 'api';

const RadarChart = ({ date }) => {
  const [radarData, setRadarData] = useState([
    {
      group_id: 'W1600',
      data: {
        total_pop_detected: 71,
        total_anomalies_in_pop_detected: 26,
        correct_pop_detected: 45,
        total_expected_articles_in_group: 310,
        FullnessPopPercentOfGroup: '29.5161%'
      }
    },
    {
      group_id: 'W1900',
      data: {
        total_pop_detected: 71,
        total_anomalies_in_pop_detected: 26,
        correct_pop_detected: 45,
        total_expected_articles_in_group: 310,
        FullnessPopPercentOfGroup: '40.5161%'
      }
    },
    {
      group_id: 'W1700',
      data: {
        total_pop_detected: 71,
        total_anomalies_in_pop_detected: 26,
        correct_pop_detected: 45,
        total_expected_articles_in_group: 310,
        FullnessPopPercentOfGroup: '90.5161%'
      }
    },
    {
      group_id: 'W1200',
      data: {
        total_pop_detected: 33,
        total_anomalies_in_pop_detected: 14,
        correct_pop_detected: 19,
        total_expected_articles_in_group: 76,
        FullnessPopPercentOfGroup: '25.0000%'
      }
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const body = {
        date: date.toString(),
        store_id: '65c74d4112465588b7a4984c'
      };
      const response = await GetRadarChartData(body);
      setRadarData(response.data);
      console.log('RadarData', response.data);
    };
    fetchData();
  }, [date]);

  const labels = radarData.map((item) => item.group_id);
  const seriesData = radarData.map((item) => parseFloat(item.data.FullnessPopPercentOfGroup));

  const options = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false
      }
    },
    series: [
      {
        name: 'Series 1',
        data: seriesData
      }
    ],
    labels: labels
  };

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden scrollbar">
      <Chart options={options} series={options.series} type="radar" height={180} />
    </div>
  );
};

export default RadarChart;
