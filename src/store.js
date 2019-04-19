
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import form from './reducers/testform';

//combineReducers
const reducers = combineReducers({form})

export default createStore(reducers, applyMiddleware(thunk, logger))