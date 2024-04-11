import axios from 'axios';
import token from './authToken';


// export const GetAnomaliesAndAnomalyRatio = async (data) => {
//   try {
//     const res = await axios.post(``, data, {
//       headers: {
//         Accept: 'application/json',
//         Authorization: await token()
//       }
//     });
//     return res;
//   } catch (error) {
//     console.log('Error Calling GetAnomaliesAndAnomalyRatio API: ', error);
//   }
// };


export const GetAnomaliesAndAnomalyRatio = async (body) => {
  const url = 'https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/store-view/anomalies-article';
  const body1 = {
    date: "2024-03-21",
    store_id: "65c74d4112465588b7a4984c"
  }
  // console.log(body);
  try {
    const response = await axios.post(url, body1, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });

    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error Calling GetAnomaliesAndAnomalyRatio API: ', error);
    throw error; // Rethrow the error to be handled by the calling code if needed
  }
};


export const footfallGraph = async (body) => {
  const url = 'https://i6zcdr9gb5.execute-api.eu-west-2.amazonaws.com/test/store/footfall_graph';
  // const body = {
  //   start_date: '2024-02-11',
  //   storeId: '65c5e26a0b5be5dc7af327dc'
  // };
  // console.log(body);
  try {
    const response = await axios.post(url, body, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error Calling fetchTimelineData API: ', error);
    throw error; // Rethrow the error to be handled by the calling code if needed
  }
};

export const avgDwelTime = async (body) => {
  const url = 'https://i6zcdr9gb5.execute-api.eu-west-2.amazonaws.com/test/store/avg_dwell_time';
  // console.log(body);
  // const body = {
  //   start_date: '2024-02-11',
  //   storeId: '65c5e26a0b5be5dc7af327dc'
  // };
  try {
    const response = await axios.post(url, body, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });

    const data = response.data;
    //   console.log(data);
    return data;
  } catch (error) {
    console.log('Error Calling fetchTimelineData API: ', error);
    throw error; // Rethrow the error to be handled by the calling code if needed
  }
};

export const uniqueJourney = async (body) => {
  const url = 'https://i6zcdr9gb5.execute-api.eu-west-2.amazonaws.com/test/store/unique_journy';
  // const body = {
  //   "date":"2024-02-11"
  // };
  try {
    const response = await axios.post(url, body, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error Calling fetchTimelineData API: ', error);
    throw error; // Rethrow the error to be handled by the calling code if needed
  }
};

export const footfallCard = async (body) => {
  const url = 'https://i6zcdr9gb5.execute-api.eu-west-2.amazonaws.com/test/store/footfall_card';
  // const body = {
  //   start_date: '2024-02-11',
  //   storeId: '65c5e26a0b5be5dc7af327dc'
  // };
  // console.log(body);
  try {
    const response = await axios.post(url, body, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error Calling fetchTimelineData API: ', error);
    throw error; // Rethrow the error to be handled by the calling code if needed
  }
};

export const getVideoData = async () => {
  const url = 'https://i6zcdr9gb5.execute-api.eu-west-2.amazonaws.com/test/store/signedVideo';

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error Calling getVideoData API: ', error);
    throw error;
  }
};

export const fetchTimelineData = async (body) => {
  // const body = {
  //   start_date: _body.date,
  //   storeId: _body.id
  // };
  try {
    const lambUrl = 'https://i6zcdr9gb5.execute-api.eu-west-2.amazonaws.com/test';
    const res = await axios.post(`${lambUrl}/store/regional_chart`, body, {
      headers: {
        Accept: 'application/json',
        Authorization: await token() // assuming token() function exists to retrieve authorization token
      }
    });
    // console.log('api response', res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('Error Calling fetchTimelineData API: ', error);
    throw error; // Rethrow the error to be handled by the calling code if needed
  }
};

export const getRatio = async (body) => {
  const url = 'https://i6zcdr9gb5.execute-api.eu-west-2.amazonaws.com/test/store/asso_cust_ratio';
  // const body = {
  //   start_date: '2024-02-11',
  //   storeId: '65c5e26a0b5be5dc7af327dc'
  // };
  // console.log(body);
  try {
    const response = await axios.post(url, body, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error Calling fetchTimelineData API: ', error);
    throw error; // Rethrow the error to be handled by the calling code if needed
  }
};
