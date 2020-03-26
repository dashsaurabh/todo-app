import { LIST_OVERDUE_TASKS } from "../actions/types";

export default function(state = null, action) {
    switch(action.type) {
        case LIST_OVERDUE_TASKS:
            return action.payload || true;
        default:
            return state;
    }
}