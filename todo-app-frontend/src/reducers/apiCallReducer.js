import { CALL_API } from "../actions/types";

export default function(state=null, action){
    switch(action.type) {
        case CALL_API:
            return action.payload || false;
        default:
            return state;
    }
}