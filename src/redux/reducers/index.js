import {combineReducers} from "redux";
import menuList from "./menu_list";
import rightsList from "./rights_list";
import characterList from "./character_list";
import userList from "./user_list";
import currentUser from './current_user';
import collapse from './collapse';
import currentViewPage from './current_page';
export default combineReducers({
    menuList,
    rightsList,
    characterList,
    userList,
    currentUser,
    collapse,
    currentViewPage
});