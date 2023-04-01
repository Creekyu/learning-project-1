import {SET_COLLAPSE} from "../constant";

const initState=false;
export default function collapseReducer(preState=initState,action){
    const {type,collapse} = action;
    switch(type){
        case SET_COLLAPSE:
            return collapse;
        default:
            return preState;
    }
}