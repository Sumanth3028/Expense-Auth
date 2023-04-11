import {
    legacy_createStore,
    applyMiddleware,
    combineReducers,
    compose,
  } from "redux";
  
  import thunk from "redux-thunk";
  import { userLoginReducer } from "./AuthReducer";
  
  const rootReducer = combineReducers({
    userLogin: userLoginReducer,
  });
  
  const creatComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = legacy_createStore(
    rootReducer,
    creatComposer(applyMiddleware(thunk))
  );
  
  export default store;