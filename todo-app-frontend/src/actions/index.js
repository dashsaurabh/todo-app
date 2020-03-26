import axios from 'axios';
import { FETCH_USER, CREATE_TODO, CALL_API, LIST_TODO, UPDATE_TODO, LIST_OVERDUE_TASKS, DELETE_TODO, LIST_TODO_BY_PRIORITY } from './types';
import differenceInCalendarDays from 'date-fns/differenceincalendardays';
import { addDays } from 'date-fns';
import { subDays } from 'date-fns';

export const fetchUser = () =>
    async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data });
    }

export const createToDo = (todoDesc, todoDate) =>
    async dispatch => {
        dispatch({ type: CALL_API, payload: { isFetching: true } })
        const res = await axios.post('/api/todos', {
            todoDesc: todoDesc,
            todoDate: todoDate
        });
        if (res.status === 201) {
            dispatch({ type: CALL_API, payload: { isFetching: false } })
            dispatch({ type: CREATE_TODO, payload: res.data });
        }
    }

export const listToDoNext7Days = () =>
    async dispatch => {
        dispatch({ type: CALL_API, payload: { isFetching: true } })
        let tasks = await getTaskListFor7Days();
        dispatch({ type: LIST_TODO, payload: tasks })
        dispatch({ type: CALL_API, payload: { isFetching: false } })
    }

export const listToDoForToday = () =>
    async dispatch => {
        dispatch({ type: CALL_API, payload: { isFetching: true } })
        let tasks = await getTaskListForToday();
        dispatch({ type: LIST_TODO, payload: tasks })
        dispatch({ type: CALL_API, payload: { isFetching: false } })
    }

export const listOverdueTasks = () =>
    async dispatch => {
        let tasks = await getOverdueTasks();
        dispatch({ type: LIST_OVERDUE_TASKS, payload: tasks })
    }

export const updateToDo = (task) =>
    async dispatch => {
        console.log(task)
        const res = await axios.put(`/api/todos/${task._id}`, {
            todoDesc: task.todoDesc,
            todoDate: task.todoDate,
            priority: task.priority,
            completed: task.completed,
        });

        if (res.status === 202) {
            dispatch({ type: UPDATE_TODO, payload: res.data });
        }
    }

export const deleteTask = (taskId) => 
    async dispatch => {
        const res = await axios.delete(`/api/todos/${taskId}`);

        if(res.status === 200) {
            dispatch({ type: DELETE_TODO, payload: res.data });
        }
    }

export const listToDoByPriority = (priority) =>
    async dispatch => {
        dispatch({ type: CALL_API, payload: { isFetching: true } })
        let tasks = await getTasksByPriority(priority);
        dispatch({ type: LIST_TODO_BY_PRIORITY, payload: tasks})
        dispatch({ type: CALL_API, payload: { isFetching: false } })

    }

async function getTaskListFor7Days() {
    let startDate = new Date();
    let endDate = addDays(new Date(startDate), 7)
    let startDateString = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    let endDateString = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];

    const res = await axios.get('/api/todos', {
        params: {
            startDate: startDateString,
            endDate: endDateString
        }
    });
    let tasks = {};
    let numberOfDays = differenceInCalendarDays(new Date(endDate), new Date(startDate));
    for (let i = 0; i < numberOfDays; i++) {
        let key = addDays(new Date(startDate), i).toDateString();
        let taskByDay = res.data.filter((task) => {
            return key === new Date(task.todoDate).toDateString();
        })
        tasks[key] = { taskByDay };
    }

    return tasks;
}

async function getTaskListForToday() {
    let startDate = new Date();
    let endDate = new Date();
    let startDateString = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    let endDateString = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    const res = await axios.get('/api/todos', {
        params: {
            startDate: startDateString,
            endDate: endDateString
        }
    });

    let taskByDay = res.data;
    let tasks = {};
    tasks[startDate.toDateString()] = { taskByDay };
    return tasks;
}

async function getOverdueTasks() {
    let date = subDays(new Date(), 1);
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    
    console.log(dateString)

    const res = await axios.get('/api/todos', {
        params: {
            startDate: '1900-01-01',
            endDate: dateString
        }
    });
    let tasks = res.data.filter((task) => task.completed === false)

    return tasks;

}

async function getTasksByPriority(priority) {
    const res = await axios.get('/api/todos', {
        params: {
            startDate: '1900-01-01',
            endDate: '9999-12-31',
            priority: priority.toUpperCase()
        }
    });

    let tasks = res.data;
    return tasks;
}

