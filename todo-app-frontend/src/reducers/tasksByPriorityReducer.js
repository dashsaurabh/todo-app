import { LIST_TODO_BY_PRIORITY } from "../actions/types";

export default function(state = null, action) {
    switch(action.type){
        case LIST_TODO_BY_PRIORITY:
            return action.payload || true
        default:
            return state;
    }
}