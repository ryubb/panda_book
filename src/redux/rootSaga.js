import { all, fork } from "redux-saga/effects";
import { sagas as userSagas } from "./modules/user";
import { sagas as signupSagas } from "./modules/Signup";
import { sagas as loginSagas } from "./modules/Login";
import { sagas as timelineSagas } from "./modules/Timeline";

export default function* rootSaga() {
  yield all([
    fork(userSagas.fetchUsers),
    fork(signupSagas.signup),
    fork(loginSagas.login),
    fork(timelineSagas.fetchTimelines),
    fork(timelineSagas.postTimeline)
  ]);
}
