import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducers";

const rootReducer = combineReducers({
  userModule: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// For Debug
window.theStore = store;
store.subscribe(() => {});
