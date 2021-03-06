import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createActions, handleActions } from "redux-actions";
import axios from "../../services/apiService";

const initialState = {
  loading: false,
  loaded: false,
  messages: []
};

export const selectors = {
  messages: state => state["message"].messages
};

export const actions = createActions({
  fetchMessagesRequest: payload => payload,
  fetchMessagesSuccess: payload => payload,
  fetchMessagesFailure: () => {},

  postMessageRequest: payload => payload,
  postMessageSuccess: payload => payload,
  postMessageFailure: () => {}
});

export const reducer = handleActions(
  {
    [actions.fetchMessagesRequest]: state => ({ ...state, loading: true }),
    [actions.fetchMessagesSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      messages: payload
    }),
    [actions.fetchMessagesFailure]: state => ({ ...state, loading: false }),

    [actions.postMessageRequest]: state => ({ ...state, loading: true }),
    [actions.postMessageSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      messages: state.messages.concat(payload)
    }),
    [actions.postMessageFailure]: state => ({ ...state, loading: false })
  },
  initialState
);

export const sagas = {
  *fetchMessages(): SagaIterator {
    while (true) {
      const action = yield take(actions.fetchMessagesRequest);

      try {
        const payload = yield call(() => {
          const token = localStorage.getItem("token");
          return axios
            .get(`/api/messages/${action.payload}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.data);
        });

        yield put(actions.fetchMessagesSuccess(payload));
      } catch (e) {
        yield put(actions.fetchMessagesFailure());
      }
    }
  },

  *postMessage(): SagaIterator {
    while (true) {
      const action = yield take(actions.postMessageRequest);

      try {
        const payload = yield call(() => {
          const token = localStorage.getItem("token");
          return axios
            .post(`/api/messages/${action.payload.roomId}`, action.payload, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.data);
        });

        yield put(actions.postMessageSuccess(payload));
      } catch (e) {
        yield put(actions.postMessageFailure());
      }
    }
  }
};
