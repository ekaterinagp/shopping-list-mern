import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

// const devtools =
//   process.env.NODE_ENV === "test"
//     ? (x) => x /* eslint-disable no-underscore-dangle */
//     : window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__();
// /* eslint-enable no-underscore-dangle */

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(applyMiddleware(thunk), devtools)
// );

export default store;
