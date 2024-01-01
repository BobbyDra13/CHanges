// import { chartsConfig } from '@/configs';
import chartsConfig from 'configs/charts-configs';
// import { useTheme } from "@mui/material";

// const theme = useTheme()

const websiteViewsChart = {
  type: 'bar',
  height: 220,
  width: '100%',
  series: [
    {
      name: 'Views',
      data: [50, 20, 10, 22, 50, 10, 40]
    }
  ],
  options: {
    ...chartsConfig,
    colors: '#fff',
    plotOptions: {
      bar: {
        columnWidth: '16%',
        borderRadius: 5
      }
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    }
  }
};

const dailySalesChart = {
  type: 'line',
  height: 100,
  series: [
    {
      name: 'Fullness %',
      data: [35, 78, 16, 81, 94, 21, 86]
    }
  ],
  options: {
    ...chartsConfig,
    colors: ['#10b981'],
    stroke: {
      lineCap: 'round',
      curve: 'smooth'
    },
    markers: {
      size: 4
    },
    grid: {
      show: false
    },
    xaxis: {
      ...chartsConfig.xaxis,
      labels: {
        show: false
      },
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yaxis: {
      labels: {
        show: false
      }
    }
  }
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: 'Compliance %',
      data: [67, 14, 52, 93, 30, 81, 45]
    }
  ]
};

const discountPromoChart = {
  ...dailySalesChart,
  series: [
    {
      name: 'Promo %',
      data: [50, 20, 10, 22, 50, 10, 40]
    }
  ]
};

const anomaliesChart = {
  ...dailySalesChart,
  series: [
    {
      name: 'Anomalies',
      data: [72, 41, 89, 63, 27, 54, 94]
    }
  ],
  options: {
    ...chartsConfig,
    colors: ['#ef4444'],
    stroke: {
      lineCap: 'round',
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      show: false
    },
    xaxis: {
      ...chartsConfig.xaxis,
      labels: {
        show: false
      },
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yaxis: {
      labels: {
        show: false
      }
    }
  }
};

export const statisticsChartsData = [
  {
    color: 'blue',
    title: 'Website View',
    description: 'Last Campaign Performance',
    footer: 'campaign sent 2 days ago',
    chart: websiteViewsChart
  },
  {
    color: 'pink',
    title: 'Daily Sales',
    description: '15% increase in today sales',
    footer: 'updated 4 min ago',
    chart: dailySalesChart
  },
  {
    color: 'green',
    title: 'Completed Tasks',
    description: 'Last Campaign Performance',
    footer: 'just updated',
    chart: completedTasksChart
  },
  {
    color: 'green',
    title: 'Completed Tasks',
    description: 'Last Campaign Performance',
    footer: 'just updated',
    chart: discountPromoChart
  },
  {
    color: 'green',
    title: 'Completed Tasks',
    description: 'Last Campaign Performance',
    footer: 'just updated',
    chart: anomaliesChart
  }
];

export default statisticsChartsData;
