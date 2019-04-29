
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import cog from './reducers/cognitiveAssessment';
import functional  from './reducers/functionalAssessment';

//combineReducers
const reducers = combineReducers({cog, functional})

export default createStore(reducers, applyMiddleware(thunk, logger))