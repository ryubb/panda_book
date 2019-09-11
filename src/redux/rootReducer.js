import { reducer as userReducer } from "./user";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  ["users"]: userReducer
});

export default rootReducers;
