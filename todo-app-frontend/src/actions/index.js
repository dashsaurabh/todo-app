import axios from 'axios';
import { FETCH_USER, CREATE_TODO, CALL_API, LIST_TODO, UPDATE_TODO } from './types';
import differenceInCalendarDays from 'date-fns/differenceincalendardays';
import { addDays } from 'date-fns'

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
            let tasks = await getTaskListFor7Days();
            dispatch({ type: CALL_API, payload: { isFetching: false } })
            dispatch({ type: CREATE_TODO, payload: res.data });
            dispatch({ type: LIST_TODO, payload: tasks })
        }
    }

export const listToDoNext7Days = () =>
    async dispatch => {
        let tasks = await getTaskListFor7Days();
        dispatch({ type: LIST_TODO, payload: tasks })
    }

export const listToDoForToday = () =>
    async dispatch => {
        let tasks = await getTaskListForToday();
        dispatch({ type: LIST_TODO, payload: tasks })
    }

export const updateToDo = (task) =>
    async dispatch => {
        console.log(task)
        const res = await axios.put(`/api/todos/${task._id}`, {
            todoDesc: task.todoDesc,
            todoDate: task.todoDate,
            completed: task.completed,
        });

        if (res.status === 202) {
            let tasks = await getTaskListFor7Days();
            dispatch({ type: UPDATE_TODO, payload: res.data });
            dispatch({ type: LIST_TODO, payload: tasks })
        }
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

