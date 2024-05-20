// third party
import { combineReducers } from 'redux';

// project import
import customizationReducer from './customizationReducer';
import zoneSlice from './slices/zoneSlice';

// ==============================|| REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  zone: zoneSlice
});

export default reducer;
