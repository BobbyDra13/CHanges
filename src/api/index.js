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


// export const GetAllStores = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/store/allStores`, {
//         headers: {
//           Accept: "application/json",
//         },
//       });
//       return res;
//     } catch (error) {
//       console.log("Error Calling Stores API: ", error);
//     }
//   };

  // API FOR THE LAYOUT OF THE STORE
export const GetStoreLayout = async (data) => {
  try {
    const res = await axios.post(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/store/analysis`, data, {
      headers: {
        Accept: "application/json",
      },
    });
    // console.log("api response", res);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
}
// API FOR THE LAYOUT OF THE STORE
export const GetImagesFromSignedUrl = async (data) => {
  try {
    const res = await axios.post(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-app/signed_image`, data, {
      headers: {
        Accept: "application/json",
      },
    });
    // console.log("api image response", res);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
}

export const getUsers = async () => {

  try {
    return await axios.get(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/getalluser`);
  } catch (error) {
    console.log('Error while calling team API :', error);
  }
};

export const getOneUser = async (id) => {
  try{
    return await axios.get(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/get_one_user?userID=${id}`);
  } catch (error){
    console.log('Error while calling team api :',error);
  }
  
}

export const deleteUser = async (id) => {
  try{
  return await axios.get(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/delete_user?userID=${id}`);
} catch (error){
  console.log('Error while calling team api :', error);
  }
};

export const updateUser = async (id,user) => {
  try {
    return await axios.post(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/update_user?userID=${id}`,user);
  } catch(error) {
    console.log('Error while calling team api :', error);
  }
}

export const createUser = async (user) => {
  try {
    return await axios.post(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/team/create`,user);
  } catch(error){
    console.log('Error while calling team api :', error);
  }
}

export const GetVerifiedUsers = async (phoneNumber) => {
  try {
    const res = await axios.get(
      `https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-app/user/auth_user_cred?numbers=${phoneNumber}`,
      {
        headers: {
          Accept: "application/json",
          // Authorization: await token(),
        },
      }
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling users API: ", error);
  }
};