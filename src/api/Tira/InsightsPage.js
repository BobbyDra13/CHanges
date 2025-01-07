import axios from 'axios';
import token from '../authToken';

export const getInsightsKPI = async ({ start_date, end_date }) => {
  try {
    const res = await axios.post(
      'https://pd9ydtkpok.execute-api.ap-south-1.amazonaws.com/dev/web-app/insight/kpi',
      {
        start_date,
        end_date
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: await token()
        }
      }
    );
    
    if (res.data?.data?.[0]) {
      const data = res.data.data[0];
      // Format decimal values to 2 places
      return {
        ...data,
        AvgOsaScore: parseFloat(data.AvgOsaScore || 0).toFixed(2),
        BeautyAvgOsaScore: parseFloat(data.BeautyAvgOsaScore || 0).toFixed(2),
        FragranceAvgOsaScore: parseFloat(data.FragranceAvgOsaScore || 0).toFixed(2),
        AvgTesterScore: parseFloat(data.AvgTesterScore || 0).toFixed(2),
        BeautyAvgTesterScore: parseFloat(data.BeautyAvgTesterScore || 0).toFixed(2),
        FragranceAvgTesterScore: parseFloat(data.FragranceAvgTesterScore || 0).toFixed(2),
        AvgCapPercentage: parseFloat(data.AvgCapPercentage || 0).toFixed(2),
        BeautyAvgCapPercentage: parseFloat(data.BeautyAvgCapPercentage || 0).toFixed(2),
        FragranceAvgCapPercentage: parseFloat(data.FragranceAvgCapPercentage || 0).toFixed(2)
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching insights KPI:', error);
    throw error;
  }
};