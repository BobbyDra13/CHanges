import axios from 'axios';
import token from './authToken';

const lambUrlFashion = 'https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp';

// API FOR THE LAYOUT OF THE STORE
export const GetStoreLayout = async (data) => {
  try {
    const res = await axios.post(`${lambUrlFashion}/store/analysis`, data, {
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

//------------------------Team page API start ---------------------------
export const getOneUser = async (id) => {
  try {
    const res = await axios.get(`${lambUrlFashion}/team/get_one_user?userID=${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const res = await axios.post(`${lambUrlFashion}/team/update_user?userID=${id}`, user, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const checkId = async (user_id) => {
  try {
    const res = await axios.get(`${lambUrlFashion}/team/check_users?user_id=${user_id}`, {
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

//------------------------Team page API end ---------------------------

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
    return res;
  } catch (error) {
    console.log('Error while calling team api :', error);
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

export const GetStoreWiseInfo = async (date, store_id) => {
  try {
    const res = await axios.get(`${lambUrlFashion}/store/stores_wise_config?date=${date}&store_id=${store_id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    console.log('sad', res);
    return res;
  } catch (error) {
    console.log('Error calling store wise info', error);
  }
};

export const GetBayWiseDetails = async (date, store_id) => {
  try {
    const res = await axios.get(`${lambUrlFashion}/store/bay_wise_config?date=${date}&store_id=${store_id}`, {
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
    const res = await axios.get(`${lambUrlFashion}/store/shelf_wise_config?date=${date}&bay_id=${bay_id}`, {
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
    const res = await axios.get(`${lambUrlFashion}/store/parts_wise_config?date=${date}&shelf_id=${shelf_id}`, {
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

//--------------------------------- API for DISHA SMART ----------------------------------------------

const lambUrl = 'https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/';
// const lambUrl = 'https://m1xgkzhe9j.execute-api.ap-south-1.amazonaws.com/prod/web-app/';

export const GetFullnessPop = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/seven_day_pop_score`, data, {
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

export const GetSevenDayCapProgress = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/seven_day_capture_progress`, data, {
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

export const GetStoreData = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}stores/get-stores-details`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling GetStoreData API: ', error);
  }
};

export const UploadCSV = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/upload_csv`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    // console.log("csvv",res);
    return res;
  } catch (error) {
    console.log('Error Uploading CSV', error);
  }
};

export const GetAnomalies = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}dashboard/anomalie-bar-graph`, data, {
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

export const GetAnomaliesCount = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/anomalies-group `, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    console.log('lolo', res);
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetCapProg = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}dashboard/capture-progress-2`, data, {
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

export const GetCapProgStoreView = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/capture-progress`, data, {
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

export const GetDonutData = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}dashboard/doughnut-chart`, data, {
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

export const GetZonedetails = async (data) => {
  try {
    const response = await axios.post(`${lambUrl}store-view/get-zones`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    const res = response.data[0].zoneDetails.map((z) => ({ id: z._id, name: z.id }));
    return res;
  } catch (error) {
    console.log('Error Calling GetCaptureProgress API: ', error);
  }
};

export const GetShelvesData = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/get-shelves`, data, {
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

export const GetShelfData = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/get-one-shelf`, data, {
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

export const GetPopPercentage = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/pop-card`, data, {
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
    console.log(data);
    const res = await axios.post(`${lambUrl}pop_score_linechart`, data, {
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
    const res = await axios.post(
      `${lambUrl}dashboard/anomalies-group
    `,
      data,
      {
        headers: {
          Accept: 'application/json',
          Authorization: await token()
        }
      }
    );
    console.log('result', res);
    return res;
  } catch (error) {
    console.log('Error Calling GetRadarChartData API: ', error);
  }
};

export const GetDates = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}calender`, data, {
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
    const res = await axios.post(`${lambUrl}dashboard/histogram`, data, {
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
    const res = await axios.post(`${lambUrl}store-view/zone-wise-pop-score`, data, {
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

export const SendAlert = async (data, apiKey, apiUrl) => {
  console.log('SendAlert', data);
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    console.log('API Call Successful (Aisensy):', response.data);
    return true;
  } catch (error) {
    console.error('API Call Failed:', error.message);
    return false;
  }
};
export const getAnomalyForStore = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}stores/get-anomalies`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res.data[0];
  } catch (error) {
    console.log('Error Calling getAnomalyForStore API: ', error);
  }
};

export const getUpdatedStatus = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/update-status`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res.data[0];
  } catch (error) {
    console.log('Error Calling getAnomalyForStore API: ', error);
  }
};

export const getAssociateScoreData = async (data) => {
  try {
    const res = await axios.post(`${lambUrl}store-view/users-pop-score`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error Calling getAnomalyForStore API: ', error);
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get(`${lambUrl}team/getalluser`, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error while calling team API :', error);
  }
};

export const createUser = async (user) => {
  try {
    const res = await axios.post(`${lambUrl}team/create`, user, {
      headers: {
        Accept: 'application/json',
        Authorization: await token()
      }
    });
    return res;
  } catch (error) {
    console.log('Error while calling team api :', error);
  }
};

export const GetVerifiedUsers = async (phoneNumber) => {
  try {
    const res = await axios.get(`https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/mob_api/check_userid?number=${phoneNumber}`, {
      headers: {
        Accept: 'application/json'
      }
    });
    console.log('auth', res);
    return res;
  } catch (error) {
    console.log('Error Calling users API: ', error);
  }
};
