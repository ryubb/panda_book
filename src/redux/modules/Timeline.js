import { take, put, call, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createActions, handleActions } from "redux-actions";
import { selectors as loginSelectors } from "./Login";

const initialState = {
  loading: false,
  loaded: false,
  timelines: []
};

export const selectors = {
  timelines: state => state["timeline"].timelines
};

export const actions = createActions({
  fetchTimelinesRequest: () => {},
  fetchTimelinesSuccess: payload => payload,
  fetchTimelinesFailure: () => {},

  postTimelineRequest: payload => payload,
  postTimelineSuccess: payload => payload,
  postTimelineFailure: () => {}
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
    [actions.fetchTimelinesFailure]: state => ({ ...state, loading: false }),

    [actions.postTimelineRequest]: state => ({ ...state, loading: true }),
    [actions.postTimelineSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      timelines: state.timelines.concat(payload)
    }),
    [actions.postTimelineFailure]: state => ({ ...state, loading: false })
  },
  initialState
);

export const sagas = {
  *fetchTimelines(): SagaIterator {
    while (true) {
      yield take(actions.fetchTimelinesRequest);
      const token = yield select(loginSelectors.token);

      try {
        const payload = yield call(() => {
          return fetch("http://localhost:5000/api/timelines", {
            headers: { Authorization: `Bearer: ${token}` }
          }).then(res => res.json());
        });

        if (payload.message === "Unauthorized") throw "err";
        yield put(actions.fetchTimelinesSuccess(payload));
      } catch (e) {
        yield put(actions.fetchTimelinesFailure());
      }
    }
  },

  *postTimeline(): SagaIterator {
    while (true) {
      const action = yield take(actions.postTimelineRequest);

      try {
        const payload = yield call(() => {
          return fetch("http://localhost:5000/api/timelines/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(action.payload)
          }).then(res => res.json());
        });
        console.log(payload);
        yield put(actions.postTimelineSuccess(payload));
      } catch (e) {
        yield put(actions.postTimelineFailure());
      }
    }
  }
};
