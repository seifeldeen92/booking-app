import { compose, applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import middlewares from "./middlewares";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const configureStore = (services: any) =>
  createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(...middlewares.map((f: any) => f(services)))
    )
  );
