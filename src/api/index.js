import axios from "axios";


export const GetAllStores = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/store/allStores`, {
        headers: {
          Accept: "application/json",
        },
      });
      return res;
    } catch (error) {
      console.log("Error Calling Stores API: ", error);
    }
  };

  // API FOR THE LAYOUT OF THE STORE
export const GetStoreLayout = async (data) => {
  try {
    const res = await axios.post(`https://folqp39skj.execute-api.eu-west-2.amazonaws.com/default/neodisha-fashion-webapp/store/analysis`, data, {
      headers: {
        Accept: "application/json",
      },
    });
    
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
    
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
}