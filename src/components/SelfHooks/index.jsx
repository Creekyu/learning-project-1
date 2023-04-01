import React,{useEffect,useState} from 'react';
import axios from "axios";
import {getMenuAjax} from "../../ajax";

export default function useSelfHooks(){
    const [menuList,setMenuList] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/menu?_embed=children').then(
            response => {
                setMenuList(response.data.map((menu) => {
                    if (menu.children && menu.children.length === 0)
                        delete menu.children;
                    return menu;
                }));
            }
        );
    })
    return menuList;
}