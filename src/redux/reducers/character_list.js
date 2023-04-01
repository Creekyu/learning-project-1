import {SET_CHARACTER} from "../constant";


const initState = [];

export default function characterListReducer(preState=initState,action){
    const {type,characterList} = action;
    switch (type){
        case SET_CHARACTER:
            return [...characterList];
        default:
            return preState;
    }
}