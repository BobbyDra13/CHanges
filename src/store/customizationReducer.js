// action - state management
import * as actionTypes from './actions';

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

export const initialState = {
  isOpen: 'insights', //for active default menu
  navType: '',
  date: [],
  analysisStoreDetails: {
    storeName: '',
    lat: '',
    lng: ''
  },
  selectedDate: new Date(),
};
const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      return {
        ...state,
        isOpen: action.isOpen
      };
    case actionTypes.MENU_TYPE:
      return {
        ...state,
        navType: action.navType
      };
    case 'DATE':
      return {
        ...state,
        date: action.date
      };
    case 'ANALYSIS_STORE_DETAILS':
      return {
        ...state,
        analysisStoreDetails: action.analysisStoreDetails
      };
      case 'selectedDate':
        console.log("state", action.payload);
        return {
          ...state,
          selectedDate: action.payload
        };
    default:
      return state;
  }
};

export default customizationReducer;
