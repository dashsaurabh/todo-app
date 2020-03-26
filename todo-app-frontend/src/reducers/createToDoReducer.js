import { CREATE_TODO } from "../actions/types";

export default function(state=null, action) {
    switch(action.type) {
        case CREATE_TODO:
            return action.payload || false;
        default:
            return state;
    }
}