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
  selectedDate: { start_date: new Date(), end_date: new Date() },
  selectedRange: 'Current Day',
  singleSelectedDate: null
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
      console.log('state', action.payload);
      return {
        ...state,
        selectedDate: action.payload
      };
    case 'SET_SELECTED_RANGE':
      return {
        ...state,
        selectedRange: action.payload
      };
    case 'selectedSingleDate':
      return {
        ...state,
        singleSelectedDate: action.payload
      };
    default:
      return state;
  }
};

export default customizationReducer;
