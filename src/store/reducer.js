
import { ADD_DETAIL_ROW, UPDATE_DETAILS_DATA } from './actions';

const initialState = {
  headerData: {
    vr_no: 0,
    vr_date: new Date().toISOString().split('T')[0],
    ac_name: '',
    ac_amt: '',
    status: 'A',
  },
  detailData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_HEADER_DATA':
  console.log('Reducer - Updating Header Data:', action.payload);
  return {
    ...state,
    headerData: { ...state.headerData, ...action.payload },
  };
    case 'UPDATE_AC_AMT':
      return {
        ...state,
        headerData: {
          ...state.headerData,
          ac_amt: action.payload,
        },
      };
      case ADD_DETAIL_ROW:
        return {
          ...state,
          detailData: [...state.detailData, action.payload],
        };
      case UPDATE_DETAILS_DATA:
        console.log('Reducer - Updating Details Data:', action.payload);
        return {
          ...state,
          detailData: action.payload,
        };
    case 'ADD_NEW_HEADER':
      return {
        ...state,
        headerData: { ...initialState.headerData, ...action.payload },
        detailRows: [],
      };
      
    default:
      return state;
  }
};

export default reducer;
