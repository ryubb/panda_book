import { combineReducers } from "redux";
import { reducer as userReducer } from "./modules/User";
import { reducer as signupReducer } from "./modules/Signup";
import { reducer as loginReducer } from "./modules/Login";
import { reducer as timelineReducer } from "./modules/Timeline";

const rootReducers = combineReducers({
  ["user"]: userReducer,
  ["signup"]: signupReducer,
  ["login"]: loginReducer,
  ["timeline"]: timelineReducer
});

export default rootReducers;
