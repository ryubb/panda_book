import { take, put, call, getContext } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createActions, handleActions } from "redux-actions";
import axios from "../../services/apiService";

const initialState = { token: "" };

export const selectors = {
  token: state => state["login"].token
};

export const actions = createActions({
  fetchRoomRequest: payload => payload,
  fetchRoomSuccess: payload => payload,
  fetchRoomFailure: () => {}
});

export const reducer = handleActions(
  {
    [actions.fetchRoomRequest]: state => ({ ...state, loading: true }),
    [actions.fetchRoomSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      roomInfo: payload
    }),
    [actions.fetchRoomFailure]: state => ({ ...state, loading: false })
  },
  initialState
);

export const sagas = {
  *fetchRoom(): SagaIterator {
    while (true) {
      const action = yield take(actions.fetchRoomRequest);
      const history = yield getContext("history");
      console.log(history);

      try {
        const payload = yield call(() => {
          return axios
            .get(`/api/rooms/${action.payload}`)
            .then(res => res.data);
        });

        const roomId = payload.room_id;
        if (roomId) {
          yield call(history.push, `/message/${roomId}`);
        } else {
          throw new Error(
            "room_idが存在しません。APIサーバーの返り値が誤っている可能性があります"
          );
        }

        yield put(actions.fetchRoomSuccess(payload));
      } catch (e) {
        yield put(actions.fetchRoomFailure());
      }
    }
  }
};
