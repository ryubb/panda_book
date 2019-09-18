import { all, fork } from "redux-saga/effects";
import { sagas as userSagas } from "./user";
import { sagas as timelineSagas } from "./Timeline";

export default function* rootSaga() {
  yield all([
    fork(userSagas.fetchUsers),
    fork(timelineSagas.fetchTimelines),
    fork(timelineSagas.postTimeline)
  ]);
}
