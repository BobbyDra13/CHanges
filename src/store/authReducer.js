// reducers/accountReducer.js
import * as actionTypes from './actions';

const authReducer = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { loggedIn: true };
    case actionTypes.LOGOUT:
      return { loggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
