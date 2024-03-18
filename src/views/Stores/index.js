import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Grid, Typography, Button } from '@mui/material';
// import Breadcrumb from 'component/Breadcrumb';
// import { gridSpacing } from 'config.js';
import { GetAllStores } from 'api';
// import StoreContent from 'views/Stores/Table';
// import AddStore from './Table/addStore';

const Stores = () => {
  const [storesData, setStoresData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllStores();
        setStoresData(response.data.data);
      } catch (error) {
        console.error('Error fetching stores data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('StoresData', storesData);

  return <></>;
};

export default Stores;
