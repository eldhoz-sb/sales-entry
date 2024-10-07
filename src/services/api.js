import axios from 'axios';

const API_URL = 'http://5.189.180.8:8010';

export const saveDataToServer = async (postData) => {
  console.log('Calling saveDataToServer function');
  try {
    const response = await axios.post(`${API_URL}/header/multiple`, postData);
    console.log('Save data response:', response.data);
    // You can handle the response as needed
  } catch (error) {
    // Handle errors
    console.error('Error saving data to the server:', error);
    throw error; // You may want to throw the error to handle it in the component
  }
};

export const getHeaderDetails = () => {
  return axios.get(`${API_URL}/header`)
    .then((response) => response.data)
    .catch((error) => {
      // Handle errors
      console.error('Error:', error);
    });
};

export const getDetailData = () => {
  return axios.get(`${API_URL}/detail`)
    .then((response) => response.data)
    .catch((error) => {
      // Handle errors
      console.error('Error:', error);
    });
};

export const getItemData = () => {
  return axios.get(`${API_URL}/item`)
  .then((response) => response.data)
    .catch((error) => {
      // Handle errors
      console.error('Error:', error);
    });
}
