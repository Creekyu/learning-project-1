import {SET_RIGHTS} from "../constant";

const initState = [];
export default function rightsListReducer(preState = initState, action){
    const {type, rightsList} = action;
    switch (type) {
        case SET_RIGHTS:
            return  [...rightsList];
        default:
            return preState;
    }

}