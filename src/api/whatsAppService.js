import axios from 'axios';
import React, { useEffect } from 'react';

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWY2MmE5Yzk4Nzk3MGFlZWM1ZTg0MCIsIm5hbWUiOiJOZW9QaHl0ZSIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NTVmNjJhOGM5ODc5NzBhZWVjNWU4M2IiLCJhY3RpdmVQbGFuIjoiQkFTSUNfTU9OVEhMWSIsImlhdCI6MTcwMDc0OTk5M30.8-SugzKOaRlF3BFhgTn944znZnsydeoUPudFEIZdNWs'; // Replace with your actual API key
const API_URL = 'https://backend.aisensy.com/campaign/t1/api/v2';

const processAndMakeAPICalls = (data, campaignName) => {
  const formattedData = formatDataForAPI(data, campaignName);
  makeAPICall(formattedData);
};

const formatDataForAPI = (data, campaignName) => {
  return {
    apiKey: API_KEY,
    campaignName: campaignName,
    destination: '91' + data.user_number,
    userName: data.user_name,
    templateParams: ['$AgentName', '$BayId', '$ShelfId', '$AnomaliesTypes', '$BayId', '$ShelfId', '$CustomMessage'],
    tags: ['AgentName', 'BayId', 'ShelfId', 'AnomaliesTypes', 'BayId', 'ShelfId', 'CustomMessage'],
    attributes: {
      AgentName: data.user_name,
      BayId: data.zone_id,
      ShelfId: data.shelf_id,
      AnomaliesTypes: data.anomaly_type,
      // eslint-disable-next-line
      BayId: data.zone_id,
      // eslint-disable-next-line
      ShelfId: data.shelf_id,
      CustomMessage: data.message
    }
  };
};
const makeAPICall = (data) => {
  axios
    .post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    })
    .then((response) => {
      console.log('API Call Successful (Aisensy):', response.data);
    })
    .catch((error) => {
      console.error('API Call Failed:', error.message);
    });
};

const WhatsappApiService = () => {
  useEffect(() => {
    // Assuming you have data and campaignName available in the component's state
    const data = {
      /* your data here */
    };
    const campaignName = 'Your Campaign Name';

    processAndMakeAPICalls(data, campaignName);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return <div>{/* Your component JSX */}</div>;
};

export default YourComponent;
