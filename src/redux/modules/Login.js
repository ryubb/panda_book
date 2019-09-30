import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createActions, handleActions } from "redux-actions";
import axios from "../../services/apiService";

const initialState = {
  loading: false,
  loaded: false,
  token: "",
  loginUser: {}
};

export const selectors = {
  token: state => state["login"].token
};

export const actions = createActions({
  loginRequest: payload => payload,
  loginSuccess: payload => payload,
  loginFailure: () => {}
});

export const reducer = handleActions(
  {
    [actions.loginRequest]: state => ({ ...state, loading: true }),
    [actions.loginSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      token: payload.token,
      loginUser: payload.user
    }),
    [actions.loginFailure]: state => ({ ...state, loading: false })
  },
  initialState
);

export const sagas = {
  *login(): SagaIterator {
    while (true) {
      const action = yield take(actions.loginRequest);

      try {
        const payload = yield call(() => {
          return axios.post("/api/login", action.payload).then(res => res.data);
        });

        if (payload && payload.token) {
          localStorage.setItem("token", payload.token);
        }
        yield put(actions.loginSuccess(payload));
      } catch (e) {
        yield put(actions.loginFailure());
      }
    }
  }
};
