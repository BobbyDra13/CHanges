// import {FilterAltIcon }from '@mui/icons-material';
// import { FaFilter } from "react-icons/fa";
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsSankey from 'highcharts/modules/sankey';
import { Box } from '@mui/material';
HighchartsSankey(Highcharts);
const legends = [
  {
    zone: 'Entry',
    color: '#00ac69'
  },
  {
    zone: 'Mobile',
    color: '#1f61cc'
  },
  {
    zone: 'Laptop',
    color: '#00cfd5'
  },
  {
    zone: 'Dolby',
    color: '#60696d'
  },
  {
    zone: 'Accosseries',
    color: '#fa7211'
  },
  {
    zone: 'TV & Home',
    color: '#9111fa'
  },
  {
    zone: 'Still in store',
    color: '#86efac'
  },
  {
    zone: 'Exit',
    color: '#ff413a'
  }
];

const options = {
  // Highcharts.chart('container', {

  title: {
    text: ''
    // enabled: false
  },
  accessibility: {
    point: {
      valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
    }
  },
  tooltip: {
    headerFormat: null,
    pointFormat: '{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight:.2f} Customers',
    nodeFormat: '{point.name}: {point.sum:.2f} Customers'
    // nodeFormat: undefined
  },

  series: [
    {
      keys: ['from', 'to', 'weight'],

      nodes: [
        {
          id: 'Entry',
          color: '#00ac69'
        },
        {
          id: 'Mobile-1',
          color: '#1f61cc'
        },
        {
          id: 'Laptop-1',
          color: '#00cfd5'
        },
        {
          id: 'Dolby-1',
          color: '#60696d'
        },
        {
          id: 'Accosseries-1',
          color: '#fa7211'
        },
        {
          id: 'TV & Home-1',
          color: '#9111fa'
        },
        {
          id: 'Exit-1',
          color: '#ff413a'
        },

        {
          id: 'Mobile-2',
          color: '#1f61cc'
        },
        {
          id: 'Laptop-2',
          color: '#00cfd5'
        },
        {
          id: 'Dolby-2',
          color: '#60696d'
        },
        {
          id: 'Accosseries-2',
          color: '#fa7211'
        },
        {
          id: 'TV & Home-2',
          color: '#9111fa'
        },
        {
          id: 'Exit-2',
          color: '#ff413a'
        },

        {
          id: 'Mobile-3',
          color: '#1f61cc'
        },
        {
          id: 'Laptop-3',
          color: '#00cfd5'
        },
        {
          id: 'Dolby-3',
          color: '#60696d'
        },
        {
          id: 'Accosseries-3',
          color: '#fa7211'
        },
        {
          id: 'TV & Home-3',
          color: '#9111fa'
        },
        {
          id: 'Exit-3',
          color: '#ff413a'
        },

        {
          id: 'Mobile-4',
          color: '#1f61cc'
        },
        {
          id: 'Laptop-4',
          color: '#00cfd5'
        },
        {
          id: 'Dolby-4',
          color: '#60696d'
        },
        {
          id: 'Accosseries-4',
          color: '#fa7211'
        },
        {
          id: 'TV & Home-4',
          color: '#9111fa'
        },
        {
          id: 'Exit-4',
          color: '#ff413a'
        },

        {
          id: 'Mobile-5',
          color: '#1f61cc'
        },
        {
          id: 'Laptop-5',
          color: '#00cfd5'
        },
        {
          id: 'Dolby-5',
          color: '#60696d'
        },
        {
          id: 'Accosseries-5',
          color: '#fa7211'
        },
        {
          id: 'TV & Home-5',
          color: '#9111fa'
        },
        {
          id: 'Exit-5',
          color: '#ff413a'
        },
        {
          id: 'Exit-6',
          color: '#ff413a'
        },
        {
          id: 'Still in store',
          color: '#86efac'
        }
      ],

      data: [
        ['Entry', 'Mobile-1', 15],
        ['Entry', 'Laptop-1', 8],
        ['Entry', 'Dolby-1', 6],
        ['Entry', 'Accosseries-1', 4],
        ['Entry', 'TV & Home-1', 5],
        ['Entry', 'Exit-1', 2],

        ['Laptop-1', 'Mobile-2', 0.5],
        ['Dolby-1', 'Mobile-2', 1],
        ['Accosseries-1', 'Mobile-2', 1],
        ['TV & Home-1', 'Mobile-2', 1],
        // [ 'Exit-1', 'Mobile-2', 1],

        ['Mobile-1', 'Laptop-2', 5],
        ['Dolby-1', 'Laptop-2', 1],
        ['Accosseries-1', 'Laptop-2', 1],
        ['TV & Home-1', 'Laptop-2', 1],
        // [ 'Exit-1', 'Laptop-2', 1],

        ['Mobile-1', 'Dolby-2', 3],
        ['Laptop-1', 'Dolby-2', 0.5],
        ['Accosseries-1', 'Dolby-2', 1],
        ['TV & Home-1', 'Dolby-2', 1],
        // [ 'Exit-1', 'Dolby-2', 1],

        ['Mobile-1', 'Accosseries-2', 7],
        ['Laptop-1', 'Accosseries-2', 0.5],
        ['Dolby-1', 'Accosseries-2', 1],
        ['TV & Home-1', 'Accosseries-2', 1],
        // [ 'Exit-1', 'Accosseries-2', 1],

        ['Mobile-1', 'TV & Home-2', 2],
        ['Laptop-1', 'TV & Home-2', 0.5],
        ['Dolby-1', 'TV & Home-2', 1],
        ['Accosseries-1', 'TV & Home-2', 1],
        // [ 'Exit-1', 'TV & Home-2', 1],

        ['Mobile-1', 'Exit-2', 3],
        ['Laptop-1', 'Exit-2', 0.5],
        ['Dolby-1', 'Exit-2', 1],
        ['Accosseries-1', 'Exit-2', 1],
        ['TV & Home-1', 'Exit-2', 1],

        //=======
        ['Laptop-2', 'Mobile-3', 1],
        ['Dolby-2', 'Mobile-3', 1],
        ['Accosseries-2', 'Mobile-3', 1],
        ['TV & Home-2', 'Mobile-3', 1],
        // [ 'Exit-2', 'Mobile-3', 1],

        ['Mobile-2', 'Laptop-3', 1],
        ['Dolby-2', 'Laptop-3', 1],
        ['Accosseries-2', 'Laptop-3', 1],
        ['TV & Home-2', 'Laptop-3', 1],
        // [ 'Exit-2', 'Laptop-3', 1],

        ['Mobile-2', 'Dolby-3', 1],
        ['Laptop-2', 'Dolby-3', 1],
        ['Accosseries-2', 'Dolby-3', 1],
        ['TV & Home-2', 'Dolby-3', 1],
        // [ 'Exit-2', 'Dolby-3', 1],

        ['Mobile-2', 'Accosseries-3', 1],
        ['Laptop-2', 'Accosseries-3', 1],
        ['Dolby-2', 'Accosseries-3', 1],
        ['TV & Home-2', 'Accosseries-3', 1],
        // [ 'Exit-2', 'Accosseries-3', 1],

        ['Mobile-2', 'TV & Home-3', 1],
        ['Laptop-2', 'TV & Home-3', 1],
        ['Dolby-2', 'TV & Home-3', 1],
        ['Accosseries-2', 'TV & Home-3', 1],
        // [ 'Exit-2', 'TV & Home-3', 1],

        ['Mobile-2', 'Exit-3', 1],
        ['Laptop-2', 'Exit-3', 1],
        ['Dolby-2', 'Exit-3', 1],
        ['Accosseries-2', 'Exit-3', 1],
        ['TV & Home-2', 'Exit-3', 1],

        //=======
        ['Laptop-3', 'Mobile-4', 1],
        ['Dolby-3', 'Mobile-4', 1],
        ['Accosseries-3', 'Mobile-4', 1],
        ['TV & Home-3', 'Mobile-4', 1],
        // [ 'Exit-3','Mobile-4', 1],

        ['Mobile-3', 'Laptop-4', 1],
        ['Dolby-3', 'Laptop-4', 1],
        ['Accosseries-3', 'Laptop-4', 1],
        ['TV & Home-3', 'Laptop-4', 1],
        // [ 'Exit-3','Laptop-4', 1],

        ['Mobile-3', 'Dolby-4', 1],
        ['Laptop-3', 'Dolby-4', 1],
        ['Accosseries-3', 'Dolby-4', 1],
        ['TV & Home-3', 'Dolby-4', 1],
        // [ 'Exit-3','Dolby-4', 1],

        ['Mobile-3', 'Accosseries-4', 1],
        ['Laptop-3', 'Accosseries-4', 1],
        ['Dolby-3', 'Accosseries-4', 1],
        ['TV & Home-3', 'Accosseries-4', 1],
        // [ 'Exit-3','Accosseries-4', 1],

        ['Mobile-3', 'TV & Home-4', 1],
        ['Laptop-3', 'TV & Home-4', 1],
        ['Dolby-3', 'TV & Home-4', 1],
        ['Accosseries-3', 'TV & Home-4', 1],
        // [ 'Exit-3','TV & Home-4', 1],

        ['Mobile-3', 'Exit-4', 1],
        ['Laptop-3', 'Exit-4', 1],
        ['Dolby-3', 'Exit-4', 1],
        ['Accosseries-3', 'Exit-4', 1],
        ['TV & Home-3', 'Exit-4', 1],

        //=======
        ['Laptop-4', 'Mobile-5', 1],
        ['Dolby-4', 'Mobile-5', 1],
        ['Accosseries-4', 'Mobile-5', 1],
        ['TV & Home-4', 'Mobile-5', 1],
        // [ 'Exit-4', 'Mobile-5' , 1],

        ['Mobile-4', 'Laptop-5', 1],
        ['Dolby-4', 'Laptop-5', 1],
        ['Accosseries-4', 'Laptop-5', 1],
        ['TV & Home-4', 'Laptop-5', 1],
        // [ 'Exit-4', 'Laptop-5' , 1],

        ['Mobile-4', 'Dolby-5', 1],
        ['Laptop-4', 'Dolby-5', 1],
        ['Accosseries-4', 'Dolby-5', 1],
        ['TV & Home-4', 'Dolby-5', 1],
        // [ 'Exit-4', 'Dolby-5' , 1],

        ['Mobile-4', 'Accosseries-5', 1],
        ['Laptop-4', 'Accosseries-5', 1],
        ['Dolby-4', 'Accosseries-5', 1],
        ['TV & Home-4', 'Accosseries-5', 1],
        // [ 'Exit-4', 'Accosseries-5' , 1],

        ['Mobile-4', 'TV & Home-5', 1],
        ['Laptop-4', 'TV & Home-5', 1],
        ['Dolby-4', 'TV & Home-5', 1],
        ['Accosseries-4', 'TV & Home-5', 1],
        // [ 'Exit-4', 'TV & Home-5' , 1],

        ['Mobile-4', 'Exit-5', 1],
        ['Laptop-4', 'Exit-5', 1],
        ['Dolby-4', 'Exit-5', 1],
        ['Accosseries-4', 'Exit-5', 1],
        ['TV & Home-4', 'Exit-5', 1],

        ['Mobile-5', 'Exit-6', 1],
        ['Laptop-5', 'Exit-6', 1],
        ['Dolby-5', 'Exit-6', 1],
        ['Accosseries-5', 'Exit-6', 1],
        ['TV & Home-5', 'Exit-6', 1],

        ['Mobile-5', 'Still in store', 1],
        ['Laptop-5', 'Still in store', 1],
        ['Dolby-5', 'Still in store', 1],
        ['Accosseries-5', 'Still in store', 1],
        ['TV & Home-5', 'Still in store', 1]
      ],

      type: 'sankey',
      name: 'Sankey demo series',
      dataLabels: {
        enabled: false // Disable data labels for nodes
      }
    }
  ],
  legend: {
    enabled: true // Enable legends
  }

  // });
};

const Sankey = () => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '0 15%' }}>
        {legends.map((leg, ind) => {
          return (
            <div className="flex justify-center align-middle" key={ind}>
              <div
                style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: `${leg.color}`, margin: '5px 10px 0 ' }}
              ></div>
              <div>{leg.zone}</div>
            </div>
          );
        })}
      </div>
      <Box sx={{ position: 'relative' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div style={{ background: 'white', width: '80px', height: '15px', position: 'absolute', right: '0', bottom: '0' }}></div>
      </Box>
    </>
  );
};

export default Sankey;
