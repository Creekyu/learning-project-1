import {SET_PAGE} from "../constant";

const initState = [1,1,1];
export default function currentViewPageReducer(preState=initState,action){
    const {type,page} = action;
    switch(type){
        case SET_PAGE:
            return [...page];
        default:
            return preState;
    }
}