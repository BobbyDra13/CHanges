import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, Select, MenuItem, Grid, Box } from '@mui/material';

const HistogramChart = ({ seriesData, dropdown, setDropdown, handleclickOnOsa, handleclickontester }) => {
  const histogramOptions = useMemo(
    () => ({
      options: {
        chart: {
          type: 'bar',
          height: 297,
          toolbar: { show: false }
        },
        colors: ['#fff'],
        plotOptions: {
          bar: {
            columnWidth: '65%',
            borderRadius: 4
          }
        },
        dataLabels: { enabled: false },
        xaxis: {
          type: 'numeric',
          min: 0,
          max: 100,
          tickAmount: 10,
          categories: [0, 0, 0, 0, 0, 0, 0],
          labels: {
            show: true,
            formatter: (x) => x + '%',
            style: { colors: '#fff', fontWeight: 'bold' }
          },
          show: false,
          axisBorder: { show: false },
          axisTicks: { show: false }
        },
        yaxis: {
          labels: {
            show: true,
            style: { colors: '#fff', fontWeight: 'bold' },
            formatter: (value) => Math.round(value)
          },
          title: {
            text: 'Number of Bays',
            style: { color: '#fff', fontSize: '12px' }
          },
          min: 0,
          max: Math.max(...seriesData),
          forceNiceScale: true
        },
        tooltip: {
          theme: 'dark',
          x: {
            formatter: (x) => `Range: ${x - 5}-${x + 5} %`
          }
        },
        grid: { show: true }
      }
    }),
    [seriesData]
  );

  const series = [
    {
      name: 'Bays',
      data: seriesData.map((value, i) => ({
        x: 5 + i * 10,
        y: value
      }))
    }
  ];

  const allZeroHistogram = seriesData.every((value) => value === 0);

  return (
    <Card style={{ position: 'relative' }}>
      <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
        <Box color="#fff" bgcolor="primary.main" p={3}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography paddingBottom={0.6} className="self-end" variant="h5" color="inherit">
                Goodness Histogram
              </Typography>
            </Grid>
            <Grid item>
              <Select
                style={{
                  background: '#fff',
                  height: '40px',
                  outline: 'hidden'
                }}
                value={dropdown}
                onChange={(e) => setDropdown(e.target.value)}
              >
                <MenuItem onClick={handleclickOnOsa} value="Osa Score">
                  Osa Score
                </MenuItem>
                <MenuItem onClick={handleclickontester} value="Tester Score">
                  Tester Score
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid className="relative" item>
            <Chart options={histogramOptions.options} series={series} type="bar" height={297} />
            {allZeroHistogram && (
              <div className="w-full h-full flex justify-center items-center text-xl absolute z-40 -mt-80 text-white">
                No data available
              </div>
            )}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HistogramChart;
