import { all, fork } from "redux-saga/effects";
import { sagas as userSaga } from "./user";

export default function* rootSaga() {
  yield all([fork(userSaga.fetchUsers)]);
}
