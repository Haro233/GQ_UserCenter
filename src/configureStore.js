import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux'

import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

// import api from './api/fetch';

const config = {
  key: 'root',
  storage,
}

export function configureStore(history, initState = {}) { 
  const loggerMiddleware = createLogger();

  let composedEnhancers = null;
  // if( api.APP_CONFIG.IS_PRODUCTION_ENVIRONMENT ){
  //   // 生產環境
  //   composedEnhancers = applyMiddleware(
  //     routerMiddleware(history), // Build the middleware for intercepting and dispatching navigation actions
  //     thunkMiddleware, // lets us dispatch() functions
  //   );
  // }else{
  //   // 開發環境
    composedEnhancers = applyMiddleware(
      routerMiddleware(history), // Build the middleware for intercepting and dispatching navigation actions
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware, // neat middleware that logs actions
    );
  

  const store = createStore(
    initState,
    composedEnhancers,
  );

  let persistor = persistStore(store)
  
  return { persistor, store };
}