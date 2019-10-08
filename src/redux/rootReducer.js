import { combineReducers } from "redux";
import { reducer as userReducer } from "./modules/User";
import { reducer as signupReducer } from "./modules/Signup";
import { reducer as loginReducer } from "./modules/Login";
import { reducer as timelineReducer } from "./modules/Timeline";
import { reducer as roomReducer } from "./modules/Room";
import { reducer as messageReducer } from "./modules/Message";

const rootReducers = combineReducers({
  ["user"]: userReducer,
  ["signup"]: signupReducer,
  ["login"]: loginReducer,
  ["timeline"]: timelineReducer,
  ["room"]: roomReducer,
  ["message"]: messageReducer
});

export default rootReducers;
