import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';


import { adminReducer, employeeReducer } from './reducers/AdminReducer';  

const rootReducer = combineReducers({
  admin: adminReducer,
  employee:employeeReducer
 
});

const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))  
);

export default store;  
