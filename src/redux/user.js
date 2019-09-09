import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createActions, handleActions } from "redux-actions";

const initialState = {
  loading: false,
  loaded: false,
  users: []
};

export const actions = createActions({
  fetchUsersRequest: () => {},
  fetchUsersSuccess: payload => payload,
  fetchUsersFailure: () => {}
});

export const reducer = handleActions(
  {
    [actions.fetchUsersRequest]: state => ({ ...state, loading: true }),
    [actions.fetchUsersSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      users: payload
    }),
    [actions.fetchUsersFailure]: state => ({ ...state, loading: false })
  },
  initialState
);

export const sagas = {
  *fetchUsers(): SagaIterator {
    while (true) {
      yield take(actions.fetchUsersRequest);

      try {
        const payload = yield call(() => {
          return fetch("http://localhost:5000/api/users").then(res =>
            res.json()
          );
        });
        yield put(actions.fetchUsersSuccess(payload));
      } catch (e) {
        yield put(actions.fetchUsersFailure());
      }
    }
  }
};
