import axios from 'axios';
import token from './authToken';

const lambUrl = 'https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp';
// const lambUrl = 'https://wfsajq7upd.execute-api.ap-south-1.amazonaws.com/prod/neodisha-fashion-webapp';

export const GetCaptureProgress = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard_capture_progress`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const dates = async () => {
  try {
    const res = await axios.get(`${lambUrl}/store/calender`);
    return res;
  } catch (error) {
    console.log('Error Calling Event dates API: ', error);
  }
};

export const GetBrandDonutData = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard/doughtnut/brand_wise_fullness`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
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
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log('fullness res', res);
    return res;
  } catch (error) {
    console.log('Error Calling GetFullnessKpi API: ', error);
  }
};

export const GetAnomaliesKpi = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard/card_anomalies`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log('anomaliesData', res);
    return res;
  } catch (error) {
    console.log('Error Calling GetAnomaliesKpi API: ', error);
  }
};

export const GetAnomaliesBarChartData = async (data) => {
  try {
    const res = await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/dashboard/anomalies_barchart`,
      data,
      {
        headers: {
          Accept: 'application/json',
          Authorization: await token()
        }
      }
    );
    return res;
  } catch (error) {
    console.log('Error Calling GetAnomaliesKpi API: ', error);
  }
};

// API FOR THE LAYOUT OF THE STORE
export const GetStoreLayout = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/store/analysis`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log('api response', res);
    return res;
  } catch (error) {
    console.log('Error Calling all Store API: ', error);
  }
};
// API FOR THE LAYOUT OF THE STORE
export const GetImagesFromSignedUrl = async (data) => {
  try {
    const res = await axios.post(`https://wfsajq7upd.execute-api.ap-south-1.amazonaws.com/prod/neodisha-fashion-app/signed_image`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    // //console.log("api image response", res);
    return res;
  } catch (error) {
    console.log('Error Calling all Store API: ', error);
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/getalluser`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    // //console.log("api image response", res);
    return res;
  } catch (error) {
    console.log('Error while calling team API :', error);
  }
};

export const getOneUser = async (id) => {
  try {
    const res = await axios.get(`${lambUrl}/team/get_one_user?userID=${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    // //console.log("api image response", res);
    return res;
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.get(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/delete_user?userID=${id}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: await token()
        }
      }
    );
    // //console.log("api image response", res);
    return res;
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const res = await axios.post(`${lambUrl}/team/update_user?userID=${id}`, user, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    // //console.log("api image response", res);
    return res;
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const createUser = async (user) => {
  try {
    const res = await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/create`,
      user,
      {
        headers: {
          Accept: 'application/json',
          Authorization: await token()
        }
      }
    );
    // //console.log("api image response", res);
    return res;
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
        }
      }
    );
    // //console.log(res.data);
    return res;
  } catch (error) {
    console.log('Error Calling users API: ', error);
  }
};

export const GetVMCompliance = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard/vmc_fullness`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetVMCompliance API: ', error);
  }
};

export const GetVMComplianceForOneWeek = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard/timeseries_vmc`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log('result', res);
    return res;
  } catch (error) {
    console.log('Error calling vm compliance for a week api', error);
  }
};

export const GetFullnessForOneWeek = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard/timeseries_fullness`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error calling fullness for a week api', error);
  }
};

export const GetAnomalyDetails = async (data) => {
  try {
    const res = await axios.get(`${lambUrl}/store/get_analysis_data?analysisID=${data}`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetAnomalyDetails API: ', error);
  }
};

export const GetAnomaliesForOneWeek = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}/dashboard/timeseries_anomalies`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error calling anomalies for a week api', error);
  }
};

export const checkId = async (user_id) => {
  try {
    const res = await axios.get(`${lambUrl}/team/check_users?user_id=${user_id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res.data;
  } catch (error) {
    console.log('Error');
    throw error;
  }
};

export const allStoresId = async () => {
  try {
    const res = await axios.get(
      `https://wfsajq7upd.execute-api.ap-south-1.amazonaws.com/prod/neodisha-fashion-webapp/store/get_all_store`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: await token()
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log('Error occured');
    throw error;
  }
};

export const GetBarChartData = async (data) => {
  try {
    const res = await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/dashboard/bay_wise_fullness`,
      data,
      {
        headers: {
          Accept: 'application/json',
          Authorization: await token()
        }
      }
    );
    //console.log('bar chart data', res);
    return res;
  } catch (error) {
    console.log('Error calling bar chart api', error);
  }
};

export const GetVMscoreBar = async (data) => {
  try {
    const res = await axios.post(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/dashboard/vmc-barchart`,
      data,
      {
        headers: {
          Accept: 'application/json',
          Authorization: await token()
        }
      }
    );
    //console.log('vmc data', res);
    return res;
  } catch (error) {
    console.log('Error calling bar chart api', error);
  }
};

export const GetStoreWiseInfo = async (date, store_id) => {
  try {
    const res = await axios.get(`${lambUrl}/store/stores_wise_config?date=${date}&store_id=${store_id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log(res);
    return res;
  } catch (error) {
    console.log('Error calling store wise info', error);
  }
};
export const GetBayWiseDetails = async (date) => {
  try {
    const res = await axios.get(`${lambUrl}/store/bay_wise_config?date=${date}&store_id=6582be9ac5ed94d792a563b8`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling bay wise details API: ', error);
  }
};

export const GetShelfWiseDetails = async (date, bay_id) => {
  try {
    const res = await axios.get(`${lambUrl}/store/shelf_wise_config?date=${date}&bay_id=${bay_id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error calling shelf-wise details', error);
  }
};

export const GetPartsWiseDetails = async (date, shelf_id) => {
  try {
    const res = await axios.get(`${lambUrl}/store/parts_wise_config?date=${date}&shelf_id=${shelf_id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error calling parts-wise details', error);
  }
};

export const GetFullnessPop = async (data) => {
  try {
    const res = await axios.post(`https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/store-view/linechart`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log(res);
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetStoreData = async (data) => {
  try {
    const res = await axios.post(`https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/stores/get-config-stores`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log(res);
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetAnomalies = async (data) => {
  try {
    const res = await axios.post(`https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/dashboard/anomalies-graph`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log(res);
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetCapProg = async (data) => {
  try {
    const res = await axios.post(`https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/dashboard/capture-progress`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log(res);
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetDonutData = async (data) => {
  try {
    const res = await axios.post(`https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/dashboard/doughnut-chart`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log(res);
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetZonedetails = async (data) => {
  try {
    const response = await axios.post(`https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/store-view/get-zones`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    // console.log("ZoneNameAPI",response);
    const res = response.data[0].zoneDetails.map((z) => ({ id: z._id, name: z.id }));
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetShelvesData = async (data) => {
  try {
    const res = await axios.post(`https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/store-view/get-shelves`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    //console.log(res);
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetShelfData = async (data) => {
  try {
    const res = await axios.post(`https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/store-view/get-one-shelf`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetPopPercentage = async (data) => {
  try {
    const res = await axios.post('https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/dashboard/pop-score', data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetPopPercentage API: ', error);
  }
};

export const GetPopWeekLineData = async (data) => {
  try {
    const res = await axios.post('https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/store-view/linechart', data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetPopWeekLineData API: ', error);
  }
};

export const GetRadarChartData = async (data) => {
  try {
    const res = await axios.post('https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/dashboard/doughnut-chart', data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetRadarChartData API: ', error);
  }
};

export const GetDates = async (data) => {
  try {
    const res = await axios.post('https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/calender', data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetDates API: ', error);
  }
};

export const GetPopHistogramData = async (data) => {
  try {
    const res = await axios.post('https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/dashboard/histogram', data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetPopHistogramData API: ', error);
  }
};

export const GetpopKPI = async (data) => {
  try {
    const res = await axios.post('https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/store-view/pop-card', data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetDates API: ', error);
  }
};
