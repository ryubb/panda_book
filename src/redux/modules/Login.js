import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createActions, handleActions } from "redux-actions";

const initialState = { token: "" };

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
      token: payload.token
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
          return fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(action.payload)
          }).then(res => res.json());
        });
        yield put(actions.loginSuccess(payload));
      } catch (e) {
        yield put(actions.loginFailure());
      }
    }
  }
};
