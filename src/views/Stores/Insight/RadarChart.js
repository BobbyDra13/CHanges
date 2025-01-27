import { Button, Card } from '@mui/material';
import { get_Top_Brands } from 'api';
// import { ca } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
// import Chart from 'react-apexcharts';
// import { getStoreWiseRadarChart } from 'api';

const RadarChart = ({ date, data }) => {
  const selectedCategory = useSelector((state) => state.category?.selectedCategory) || 'All';
  const [showWorst, setShowWorst] = useState(false);
  const [bestBrands, setBestBrands] = useState([]);
  const [worstBrands, setWorstBrands] = useState([]);
  // const [options, setOptions] = useState({});
  const { store } = useParams();

  // const defaultOption = {
  //   chart: {
  //     type: 'radar',
  //     toolbar: {
  //       show: false
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'No data available',
  //       data: [0, 0, 0]
  //     }
  //   ],
  //   labels: ['Correct', 'Empty Shelf', 'Missing Tester']
  // };

  // console.log("response top brand", date);

  useEffect(() => {
    const fetchData = async () => {
      console.log('response top brand ajshuasghd', date, store, selectedCategory);
      // setRadarData(null);
      const body = {
        date: date,
        store_id: store,
        category: selectedCategory.toLowerCase()
      };
      // console.log('response top brand',body);
      try {
        const response = await get_Top_Brands(body);
        //  console.log('response top brand',response.data.reverse());
        const reverseData = [...response.data].reverse();
        setBestBrands(response.data);
        setWorstBrands(reverseData);
      } catch (error) {
        console.log('error fetching radar chart data', error);
        // setOptions(defaultOption);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [date, data, showWorst,selectedCategory]);

  const BrandCard = () => {
    console.log('response top brand best', bestBrands);
    console.log('response top brand worst', worstBrands);

    // Hardcoded brand data
    // const bestBrands = [
    //   { name: 'Brand A', osa: 95, tester: 90 },
    //   { name: 'Brand B', osa: 92, tester: 89 },
    //   { name: 'Brand C', osa: 90, tester: 88 },
    // ];
    // const worstBrands = [
    //   { name: 'Brand X', osa: 55, tester: 50 },
    //   { name: 'Brand Y', osa: 50, tester: 48 },
    //   { name: 'Brand Z', osa: 45, tester: 42 },
    // ];

    return (
      <Card
        className=" rounded-lg border border-gray-200 p-4 bg-gradient-to-br from-blue-50 to-white"
        // style={{ width: '350px' }}
      >
        {/* Header Section */}

        {/* Table Headings */}
        <div className="flex justify-between items-center mb-2 px-2">
          <span className="text-gray-600 font-medium w-1/2">Brand</span>
          <span className="text-gray-600 font-medium w-1/4">OSA</span>
          <span className="text-gray-600 font-medium w-1/4">Tester</span>
        </div>

        {/* Brand List */}
        <div className="flex flex-col space-y-2 overflow-y-scroll overflow-x-hidden scrollbar h-40">
          {(showWorst ? worstBrands : bestBrands).map((brand, index) => (
            <div key={index} className="flex justify-between gap-2 items-center bg-gray-100 hover:bg-gray-200 p-2 rounded-md shadow-sm">
              <span className="font-semibold text-gray-800 w-1/2">{brand?.brand}</span>
              <span className="text-blue-700 font-bold w-1/4">{brand?.avg_osa_score.toFixed(2)}</span>
              <span className="text-green-600 font-bold w-1/4">{brand?.avg_tester_score.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div className="h-full p-2">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-800 text-lg font-bold">Top Brands</span>
        <span className="text-gray-400 text-sm font-bold">last 7 days Avg.</span>
        <Button
          variant="contained"
          size="small"
          onClick={() => setShowWorst(!showWorst)}
          className={`${
            showWorst ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white text-sm font-semibold px-3 py-1 rounded-md shadow`}
          disableRipple
        >
          {showWorst ? 'Worst' : 'Best'}
        </Button>
      </div>
      {/* <div className="flex flex-col items-center">
        <p className="font-semibold text-xl">Store Goodness Profile</p>
        {radarData !== null ? (
          <Chart options={options} series={options.series} type="radar" height={240} />
        ) : (
          <div className="flex-grow relative">
            <Chart className="relative" options={defaultOption} series={defaultOption.series} type="radar" height={240} />
          </div>
        )}
      </div> */}
      <BrandCard />
    </div>
  );
};

export default RadarChart;
