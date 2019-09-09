import { reducer as userReducer } from "./user";
import { combineReducers } from "redux";

export default () => {
  const rootReducers = combineReducers({
    userReducer
  });

  return rootReducers;
};
