import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createActions, handleActions } from "redux-actions";
import axios from "../../services/apiService";

const initialState = {
  loading: false,
  loaded: false,
  users: []
};

export const selectors = {
  users: state => state["user"].users
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
          const token = localStorage.getItem("token");
          return axios
            .get("api/users/get", {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.data);
        });
        yield put(actions.fetchUsersSuccess(payload));
      } catch (e) {
        yield put(actions.fetchUsersFailure());
      }
    }
  }
};
