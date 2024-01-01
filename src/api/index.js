import axios from 'axios';

const lambUrl = 'https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp';

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
    return res;
  } catch (error) {
    console.log('Error Calling GetAnomaliesKpi API: ', error);
  }
};
