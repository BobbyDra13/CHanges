import OrionImg from '../assets/images/MapImages/orion.png';
import SeawoodsImg from '../assets/images/MapImages/seawoods.png';
import InorbitImg from '../assets/images/MapImages/inorbit.png';
import Img1 from '../assets/images/AnomalyImages/img1.jpg';
import Img2 from '../assets/images/AnomalyImages/img2.jpg';
import Img3 from '../assets/images/AnomalyImages/img3.jpg';
import Img4 from '../assets/images/AnomalyImages/img4.jpg';
import Img5 from '../assets/images/AnomalyImages/img5.jpg';
import Img6 from '../assets/images/AnomalyImages/img6.jpg';
import Img7 from '../assets/images/AnomalyImages/img7.jpg';
import Img8 from '../assets/images/AnomalyImages/img8.jpg';

export const storesData = [
  {
    active: true,
    disabled: false,
    storeId: '0001 - Orion',
    mapData: {
      address: 'Plot no: 311, Orion Mall, near ST Bus Depot, Forest Colony, Panvel, Navi Mumbai, Maharashtra 410206',
      imgUrl: OrionImg
    },
    kpiValues: {
      capture: 62,
      upKeep: 78,
      vm: 47,
      pop: 85
    },
    anomalies: {
      total: 10,
      resolved: 5,
      images: [
        {
          type: 'upKeep',
          agent: 'Rajkishore Pradhan',
          url: Img1
        },
        {
          type: 'vm',
          agent: 'Paresh Kumar Barik',
          url: Img2
        },
        {
          type: 'pop',
          agent: 'Rajkishore Pradhan',
          url: Img3
        },
        {
          type: 'upKeep',
          agent: 'Paresh Kumar Barik',
          url: Img4
        },
        {
          type: 'vm',
          agent: 'Rajkishore Pradhan',
          url: Img5
        },
        {
          type: 'pop',
          agent: 'Paresh Kumar Barik',
          url: Img6
        },
        {
          type: 'upKeep',
          agent: 'Rajkishore Pradhan',
          url: Img7
        },
        {
          type: 'vm',
          agent: 'Paresh Kumar Barik',
          url: Img8
        },
        {
          type: 'pop',
          agent: 'Rajkishore Pradhan',
          url: Img1
        },
        {
          type: 'upKeep',
          agent: 'Paresh Kumar Barik',
          url: Img2
        }
      ]
    },
    agents: [
      {
        name: 'Rajkishore Pradhan',
        number: '7467838653'
      },
      {
        name: 'Paresh Kumar Barik',
        number: '9654865377'
      }
    ]
  },
  {
    active: true,
    disabled: true,
    storeId: '0002 - Nexus',
    mapData: {
      address: '1, Seawoods Station Rd, Nerul East, Sector 40, Nerul, Navi Mumbai, Maharashtra 400706',
      imgUrl: SeawoodsImg
    },
    kpiValues: {
      capture: 79,
      upKeep: 19,
      vm: 62,
      pop: 94
    },
    anomalies: {
      total: 9,
      resolved: 3,
      images: [
        {
          type: 'vm',
          agent: 'Mayur Pawar',
          url: Img8
        },
        {
          type: 'pop',
          agent: 'Gourav Atre',
          url: Img7
        },
        {
          type: 'upKeep',
          agent: 'Mayur Pawar',
          url: Img6
        },
        {
          type: 'vm',
          agent: 'Gourav Atre',
          url: Img5
        },
        {
          type: 'pop',
          agent: 'Mayur Pawar',
          url: Img4
        },
        {
          type: 'upKeep',
          agent: 'Gourav Atre',
          url: Img3
        },
        {
          type: 'vm',
          agent: 'Mayur Pawar',
          url: Img2
        },
        {
          type: 'pop',
          agent: 'Gourav Atre',
          url: Img1
        },
        {
          type: 'upKeep',
          agent: 'Mayur Pawar',
          url: Img8
        }
      ]
    },
    agents: [
      {
        name: 'Mayur Pawar',
        number: '6759078346'
      },
      {
        name: 'Gourav Atre',
        number: '9865344436'
      }
    ]
  },
  {
    active: false,
    disabled: true,
    storeId: '0003 - Inorbit',
    mapData: {
      address: 'Palm Beach Rd, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400705',
      imgUrl: InorbitImg
    },
    kpiValues: {
      capture: 56,
      upKeep: 15,
      vm: 91,
      pop: 41
    },
    anomalies: {
      total: 11,
      resolved: 0,
      images: [
        {
          type: 'vm',
          agent: 'Abhijeet Dalai',
          url: Img5
        },
        {
          type: 'pop',
          agent: 'Ashis Sasmal',
          url: Img3
        },
        {
          type: 'upKeep',
          agent: 'Abhijeet Dalai',
          url: Img6
        },
        {
          type: 'vm',
          agent: 'Ashis Sasmal',
          url: Img1
        },
        {
          type: 'pop',
          agent: 'Abhijeet Dalai',
          url: Img4
        },
        {
          type: 'upKeep',
          agent: 'Ashis Sasmal',
          url: Img8
        },
        {
          type: 'vm',
          agent: 'Abhijeet Dalai',
          url: Img2
        },
        {
          type: 'pop',
          agent: 'Ashis Sasmal',
          url: Img7
        },
        {
          type: 'upKeep',
          agent: 'Abhijeet Dalai',
          url: Img5
        },
        {
          type: 'vm',
          agent: 'Ashis Sasmal',
          url: Img4
        },
        {
          type: 'pop',
          agent: 'Abhijeet Dalai',
          url: Img1
        }
      ]
    },
    agents: [
      {
        name: 'Ashis Sasmal',
        number: '5474846490'
      },
      {
        name: 'Abhijeet Dalai',
        number: '7724476358'
      }
    ]
  }
];

export default storesData;
