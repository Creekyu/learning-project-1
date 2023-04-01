import {SET_MENU} from "../constant";
import {getUserMenuList} from "../../utilities";
export const setMenuList = menuList=>({type:SET_MENU,menuList});

export const setMenuListAsync = (menuList,rights)=>{
    menuList.map((menu) => {
        if (menu.children && menu.children.length === 0)
            delete menu.children;
        return menu;
    });
    const newMenu = getUserMenuList(menuList,rights);
    return (dispatch)=>{
        dispatch(setMenuList(newMenu));
    }
}