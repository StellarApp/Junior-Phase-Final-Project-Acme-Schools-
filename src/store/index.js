import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import {SET_STUDENTS, SET_SCHOOLS} from './constants';
import * as actions from './actions';
import logger from 'redux-logger';

const store = createStore(reducer, applyMiddleware(thunk,logger));

export default store;
export {actions};