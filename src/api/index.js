import axios from 'axios';

const lambUrl = 'https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp';
// const lambUrl = 'https://wfsajq7upd.execute-api.ap-south-1.amazonaws.com/prod/neodisha-fashion-webapp';

export const GetCaptureProgress = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard_capture_progress`, data, {
      headers: {
        Accept: 'application/json'
        //   Authorization: await token(),
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetBrandDonutData = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard/doughtnut/brand_wise_fullness`, data, {
      headers: {
        Accept: 'application/json'
        //   Authorization: await token(),
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetBrandDonutData API: ', error);
  }
};

export const GetFullnessKpi = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard_card_fullness`, data, {
      headers: {
        Accept: 'application/json'
        //   Authorization: await token(),
      }
    });
    console.log('fullness res', res);
    return res;
  } catch (error) {
    console.log('Error Calling GetFullnessKpi API: ', error);
  }
};

export const GetAnomaliesKpi = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard/card_anomalies`, data, {
      headers: {
        Accept: 'application/json'
        //   Authorization: await token(),
      }
    });
    console.log('anomaliesData', res);
    return res;
  } catch (error) {
    console.log('Error Calling GetAnomaliesKpi API: ', error);
  }
};

export const GetAnomaliesBarChartData = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard/anomalies_barchart`, data, {
      headers: {
        Accept: 'application/json'
        //   Authorization: await token(),
      }
    });
    console.log('anomalies chart', res);
    return res;
  } catch (error) {
    console.log('Error Calling GetAnomaliesKpi API: ', error);
  }
};

// export const GetAnomaliesBarChartData = async (data) => {
//   try {
//     const res = await axios.post(`http://localhost:8080/anomalies/anomalies_bar_chart`, data, {
//       headers: {
//         Accept: 'application/json'
//         //   Authorization: await token(),
//       }
//     });
//     console.log("anomalies chart", res);
//     return res;
//   } catch (error) {
//     console.log('Error Calling GetAnomaliesKpi API: ', error);
//   }
// };


// API FOR THE LAYOUT OF THE STORE
export const GetStoreLayout = async (data) => {
  try {
    const res = await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/store/analysis`,
      data,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    // console.log("api response", res);
    return res;
  } catch (error) {
    console.log('Error Calling all Store API: ', error);
  }
};
// API FOR THE LAYOUT OF THE STORE
export const GetImagesFromSignedUrl = async (data) => {
  try {
    const res = await axios.post(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-app/signed_image`, data, {
      headers: {
        Accept: 'application/json'
      }
    });
    // console.log("api image response", res);
    return res;
  } catch (error) {
    console.log('Error Calling all Store API: ', error);
  }
};

export const getUsers = async () => {
  try {
    return await axios.get(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/getalluser`);
  } catch (error) {
    console.log('Error while calling team API :', error);
  }
};

export const getOneUser = async (id) => {
  try {
    return await axios.get(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/get_one_user?userID=${id}`
    );
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const deleteUser = async (id) => {
  try {
    return await axios.get(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/delete_user?userID=${id}`
    );
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const updateUser = async (id, user) => {
  try {
    return await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/update_user?userID=${id}`,
      user
    );
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const createUser = async (user) => {
  try {
    return await axios.post(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/create`, user);
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const GetVerifiedUsers = async (phoneNumber) => {
  try {
    const res = await axios.get(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-app/user/auth_user_cred?numbers=${phoneNumber}`,
      {
        headers: {
          Accept: 'application/json'
          // Authorization: await token(),
        }
      }
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log('Error Calling users API: ', error);
  }
};

export const GetVMCompliance = async (data) => {
  try {
    const res = await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/dashboard/vmc_fullness`,
      data,
      {
        headers: {
          Accept: 'application/json'
          //   Authorization: await token(),
        }
      }
    );
    return res;
  } catch (error) {
    console.log('Error Calling GetVMCompliance API: ', error);
  }
};

export const GetVMComplianceForOneWeek = async (data) => {
  try {
    const res = await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/dashboard/timeseries_vmc`,
      data,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    console.log('result', res);
    return res;
  } catch (error) {
    console.log('Error calling vm compliance for a week api', error);
  }
};

export const GetFullnessForOneWeek = async (data) => {
  try {
    const res = await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/dashboard/timeseries_fullness`,
      data,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    return res;
  } catch (error) {
    console.log('Error calling fullness for a week api', error);
  }
};

export const GetAnomalyDetails = async (data) => {
  try {
    const res = await axios.get(`${lambUrl}/store/get_analysis_data?analysisID=${data}`, {
      headers: {
        Accept: 'application/json'
        //   Authorization: await token(),
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetAnomalyDetails API: ', error);
  }
};

export const GetAnomaliesForOneWeek = async (data) => {
  try {
    const res = await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/dashboard/timeseries_anomalies`,
      data,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    return res;
  } catch (error) {
    console.log('Error calling anomalies for a week api', error);
  }
};

export const checkId = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:8081/data/user/checkUserId?user_id=${user_id}`);
    return response.data;
  } catch (error) {
    console.log('Error');
    throw error;
  }
};

export const allStoresId = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/data/user/allStoresId`);
    return response.data.storesId;
  } catch (error) {
    console.log('Error occured');
    throw error;
  }
};

// export const GetBarChartData = async (data) => {
//   try {
//     const res = await axios.post(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/dashboard/bay_wise_fullness`, data, {
//       headers: {
//         Accept: 'application/json'
//       }
//     });
//     console.log("bar chart data", res);
//     return res;
//   } catch(error) {
//     console.log("Error calling bar chart api", error);
//   }
// };

export const GetBarChartData = async (data) => {
  try {
    const res = await axios.post(`http://localhost:8080/anomalies/bayData`, data, {
      headers: {
        Accept: 'application/json'
      }
    });
    console.log("bar chart data", res);
    return res;
  } catch(error) {
    console.log("Error calling bar chart api", error);
  }
};