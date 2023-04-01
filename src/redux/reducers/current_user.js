import {SET_CURRENT_USER} from "../constant";

const initState = {};
export default function currentUserReducer(preState = initState, action) {
    const {type,user} = action;
    switch (type){
        case SET_CURRENT_USER:
            return Object.assign({},user);
        default:
            return preState;
    }
}