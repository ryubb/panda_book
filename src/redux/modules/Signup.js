import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createActions, handleActions } from "redux-actions";
import axios from "../../services/apiService";

const initialState = { token: "" };

export const selectors = {
  token: state => state["login"].token
};

export const actions = createActions({
  signupRequest: payload => payload,
  signupSuccess: payload => payload,
  signupFailure: () => {}
});

export const reducer = handleActions(
  {
    [actions.signupRequest]: state => ({ ...state, loading: true }),
    [actions.signupSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      token: payload.token
    }),
    [actions.signupFailure]: state => ({ ...state, loading: false })
  },
  initialState
);

export const sagas = {
  *signup(): SagaIterator {
    while (true) {
      const action = yield take(actions.signupRequest);

      try {
        const payload = yield call(() => {
          return axios
            .post("/api/signup", action.payload)
            .then(res => res.data);
        });

        if (payload && payload.token) {
          localStorage.setItem("token", payload.token);
        }
        yield put(actions.signupSuccess(payload));
      } catch (e) {
        yield put(actions.signupFailure());
      }
    }
  }
};
