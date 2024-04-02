import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsXrange from 'highcharts/modules/xrange';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { fetchTimelineData } from '../../../../api/sentinelAPI';
import { Box, CircularProgress } from '@mui/material';

// Initialize the additional Highcharts modules
HighchartsXrange(Highcharts);
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);

const Timeline = ({ date }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const body = {
        start_date: date,
        storeId: '65c5e26a0b5be5dc7af327dc'
      };
      try {
        const fetchedData = await fetchTimelineData(body);
        console.log('data', fetchedData);

        if (fetchedData.length > 0) {
          const transformedData = fetchedData.map((item, index) => {
            if (item && item.x && Array.isArray(item.y) && item.y.length >= 2) {
              const x = new Date(item.y[0]).getTime();
              const x2 = new Date(item.y[1]).getTime();
              const y2 = item.x;
              return {
                x,
                x2,
                y: index + 1,
                y2
              };
            } else {
              console.error('Invalid item structure:', item);
              return null;
            }
          });
          setData(transformedData.filter((item) => item !== null));
        } else {
          setData(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(true);
    getData();
  }, [date]);

  console.log('Transformed', data);

  useEffect(() => {
    if (!data) return;

    Highcharts.chart('container', {
      colors: ['#774D97'],
      chart: {
        type: 'xrange',
        scrollablePlotArea: {
          minHeight: data.length * 20,
          opacity: 1
        }
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      },
      title: {
        text: ''
      },
      accessibility: {
        point: {
          descriptionFormat: '{add index 1}. {yCategory}, {x:%A %e %B %Y} to {x2:%A %e %B %Y}.'
        }
      },
      xAxis: {
        type: 'datetime',
        gridLineWidth: 1,
        opacity: 1
      },
      yAxis: {
        type: 'category',
        visible: false,
        scrollbar: {
          enabled: true
        },
        tickLength: 0,
        categories: data.map((item) => item.y2),
        reversed: true
      },
      legend: {
        enabled: false,
        align: 'center',
        verticalAlign: 'top',
        itemStyle: {
          color: '#774D97'
        }
      },

      series: [
        {
          name: 'Customer',
          pointPadding: 0,
          groupPadding: 0,
          pointWidth: 7,
          data: data,
          legendColor: '#774D97',
          showInLegend: true
        }
      ]
    });
  }, [data]);

  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : data && data.length > 0 ? (
        <div className="highcharts-figure">
          <div id="container"></div>
          <div id="white-box"></div>
        </div>
      ) : (
        <div className="w-full h-[400px] flex justify-center place-items-center text-xl">No data</div>
      )}
      <div className="bg-white h-4 w-20 absolute right-1.5 bottom-0 z-20 "> </div>
    </Box>
  );
};

export default Timeline;
