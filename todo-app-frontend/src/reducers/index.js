import { combineReducers } from 'redux';
import authReducer from './authReducer';
import apiCallReducer from './apiCallReducer';
import listToDoReducer from './listToDoReducer';

export default combineReducers({
    auth: authReducer,
    apiCall: apiCallReducer,
    taskList: listToDoReducer,
})