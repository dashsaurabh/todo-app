import { DELETE_TODO } from "../actions/types";

export default function(state=null, action) {
    switch(action.type) {
        case DELETE_TODO:
            return action.payload || false
        default:
            return state;
    }
}