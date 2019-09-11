import { combineReducers } from "redux";
import { reducer as userReducer } from "./user";
import { reducer as timelineReducer } from "./Timeline";

const rootReducers = combineReducers({
  ["user"]: userReducer,
  ["timeline"]: timelineReducer
});

export default rootReducers;
