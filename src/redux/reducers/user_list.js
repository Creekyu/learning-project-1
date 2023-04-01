import {SET_USER} from "../constant";
const initState = []
export default function userListReducer(preState=initState,action){
    const {type,userList} = action;
    switch (type){
        case SET_USER:
            return [...userList];
        default:
            return preState;
    }
}