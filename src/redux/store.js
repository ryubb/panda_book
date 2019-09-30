import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
// import logger from "redux-logger";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

// Store
export default function configureStore(history) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware, routerMiddleware(history)),
      // applyMiddleware(sagaMiddleware, logger),
      process.env.NODE_ENV === "development" && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f
    )
  );
  sagaMiddleware.run(rootSaga, history);
  return store;
}
