import { UPDATE_TODO } from "../actions/types";

export default function(state=null, action) {
    switch(action.type) {
        case UPDATE_TODO: 
            return action.payload || false;
        default:
            return state;
    }
}