import { combineReducers } from "redux";
import { reducer as userReducer } from "./modules/user";
import { reducer as loginReducer } from "./modules/Login";
import { reducer as timelineReducer } from "./modules/Timeline";

const rootReducers = combineReducers({
  ["user"]: userReducer,
  ["login"]: loginReducer,
  ["timeline"]: timelineReducer
});

export default rootReducers;
