import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import * as History from 'history'
import rootReducer from './modules'

export const history = History.createBrowserHistory()

function logState(theStore) {
  console.log(`
    ${"-".repeat(16)}
    current state:
    [${JSON.stringify(theStore.getState(), null, 2)}]
  `);
  // console.dir(theStore.getState());
}

// State Logger
const logger = TheStore => next => action => {
  const result = next(action);
  logState(TheStore);
  return result;
}

//вот его вид, если что var logger = function logger(TheStore) { return function (next) { return function (action) { var result = next(action); logState(TheStore); return result; }; }; };

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware, logger),
  ...enhancers
)

export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
)
