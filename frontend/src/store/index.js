import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import genreReducer from "./genre";
import playBarReducer from "./playbar";
import sessionReducer from "./session";
import songReducer from "./song";
import songDataReducer from "./songData";
import userReducer from "./user";

const rootReducer = combineReducers({
  session: sessionReducer,
  song: songReducer,
  songData: songDataReducer,
  user: userReducer,
  playBar: playBarReducer,
  genre: genreReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
