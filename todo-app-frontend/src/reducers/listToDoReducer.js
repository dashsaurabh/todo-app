import { LIST_TODO } from "../actions/types";

export default function(state=null, action) {
    console.log(action)
    switch(action.type) {
        case LIST_TODO: 
            return action.payload || false;
        default:
            return state
    }
}