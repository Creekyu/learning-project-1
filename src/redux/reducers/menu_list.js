import {SET_MENU} from "../constant";

const initState = [];
export default function menuListReducer(preState=initState,action){
    const {type,menuList} = action;
    switch (type){
        case SET_MENU:
            return [...menuList];
        default:
            return preState;
    }
}