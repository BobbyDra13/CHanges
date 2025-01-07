// third party
import { combineReducers } from 'redux';

// project import
import customizationReducer from './customizationReducer';
import zoneSlice from './slices/zoneSlice';
import categorySlice from './slices/categorySlice';

// ==============================|| REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  zone: zoneSlice,
  category: categorySlice
});

export default reducer;
