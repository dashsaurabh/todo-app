import { combineReducers } from 'redux';
import authReducer from './authReducer';
import apiCallReducer from './apiCallReducer';
import listToDoReducer from './listToDoReducer';
import createToDoReducer from './createToDoReducer';
import updateToDoReducer from './updateToDoReducer';
import overdueTasksReducer from './overdueTasksReducer';
import deleteToDoReducer from './deleteToDoReducer';
import tasksByPriorityReducer from './tasksByPriorityReducer';

export default combineReducers({
    auth: authReducer,
    apiCall: apiCallReducer,
    taskList: listToDoReducer,
    createToDoStatus: createToDoReducer,
    updateToDoStatus: updateToDoReducer,
    overdueTasks: overdueTasksReducer,
    deleteToDoStatus: deleteToDoReducer,
    priorityTaskList: tasksByPriorityReducer,
})