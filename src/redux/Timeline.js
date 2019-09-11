import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createActions, handleActions } from "redux-actions";

const initialState = {
  loading: false,
  loaded: false,
  timelines: []
};

export const actions = createActions({
  fetchTimelinesRequest: () => {},
  fetchTimelinesSuccess: payload => payload,
  fetchTimelinesFailure: () => {}
});

export const reducer = handleActions(
  {
    [actions.fetchTimelinesRequest]: state => ({ ...state, loading: true }),
    [actions.fetchTimelinesSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      timelines: payload
    }),
    [actions.fetchTimelinesFailure]: state => ({ ...state, loading: false })
  },
  initialState
);

export const sagas = {
  *fetchTimelines(): SagaIterator {
    while (true) {
      yield take(actions.fetchTimelinesRequest);

      try {
        const payload = yield call(() => {
          return fetch("http://localhost:5000/api/timelines").then(res =>
            res.json()
          );
        });
        yield put(actions.fetchTimelinesSuccess(payload));
      } catch (e) {
        yield put(actions.fetchTimelinesFailure());
      }
    }
  }
};
