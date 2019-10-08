import { all, fork, setContext } from "redux-saga/effects";
import { sagas as userSagas } from "./modules/User";
import { sagas as signupSagas } from "./modules/Signup";
import { sagas as loginSagas } from "./modules/Login";
import { sagas as timelineSagas } from "./modules/Timeline";
import { sagas as roomSagas } from "./modules/Room";
import { sagas as messageSagas } from "./modules/Message";

export default function* rootSaga(history) {
  yield setContext({ history });
  yield all([
    fork(userSagas.fetchUsers),
    fork(signupSagas.signup),
    fork(loginSagas.login),
    fork(timelineSagas.fetchTimelines),
    fork(timelineSagas.postTimeline),
    fork(roomSagas.fetchRoom),
    fork(messageSagas.fetchMessages)
  ]);
}
