// actions.js
export const updateHeaderData = (data) => {
  console.log('Updating Header Data:', data);
  return {
    type: 'UPDATE_HEADER_DATA',
    payload: data,
  };
};


export const updateAcAmt = (totalAmount) => ({
  type: 'UPDATE_AC_AMT',
  payload: totalAmount,
});

export const ADD_DETAIL_ROW = 'ADD_DETAIL_ROW';
export const UPDATE_DETAILS_DATA = 'UPDATE_DETAILS_DATA';

export const addDetailRow = (row) => ({
  type: ADD_DETAIL_ROW,
  payload: row,
});

export const updateDetailsData = (data) => ({
  type: UPDATE_DETAILS_DATA,
  payload: data,
});

export const addNewHeader = (newHeaderData) => ({
  type: 'ADD_NEW_HEADER',
  payload: newHeaderData,
});



export const saveDataToServer = (data) => ({
  type: 'SAVE_DATA_TO_SERVER',
  payload: data,
});





