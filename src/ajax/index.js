import axios from "axios";
import {message} from "antd";
import {getCharacter} from "../utilities";
import {onLogin} from "../cookie/cookie";


// MenuList
//region
export const getMenuAjax = (getMenuList) => {
    axios.get('http://localhost:3000/menu?_embed=children').then(
        response => {
            getMenuList(response.data);
        }
    );
    return true;
}

export const delRoleAjax = async (item, menuList, setMenuList) => {
    try {
        if (item.grade === 1) {
            await axios.delete('http://localhost:3000/menu/' + item.id)
            setMenuList(menuList.filter((menu) => {
                return menu.id !== item.id;
            }))
        } else {
            await axios.delete('http://localhost:3000/children/' + item.id)
            setMenuList(menuList.map((menu) => {
                menu.children = menu.children ? menu.children.filter((child) => {
                    return child.id !== item.id;
                }) : undefined;
                return menu;
            }));
        }
        message.success('Delete Success!');

    } catch (err) {
        message.error('Delete Failed!');
    }


}

export const updatePagePermissionAjax = (item,menuList,setMenuList) => {
    try {
        if (item.grade === 1) {
            axios.patch('http://localhost:3000/menu/' + item.id, {page_permission: !item.page_permission})
            setMenuList(menuList.map((menu) => {
                if(menu.id === item.id){
                    menu.page_permission = !menu.page_permission;
                }
                return menu;
            }))
        }
        else{
            axios.patch('http://localhost:3000/children/' + item.id, {page_permission: !item.page_permission})
            setMenuList(menuList.map((menu) => {
                menu.children = menu.children ? menu.children.map((child) => {
                    if(child.id === item.id)
                        child.page_permission = !child.page_permission;
                    return child;
                }) : undefined;
                return menu;
            }));
        }
        message.success('Update Success!');

    } catch (err) {
        message.error('Update Failed!');

    }

}
//endregion

// RightsList
export const getRightsListAjax = (setRightsList) => {
    axios.get('http://localhost:3000/rights').then(
        response => {
            setRightsList(response.data);
        },
        error => {
            throw error;
        }
    );
}

// CharacterList
export const getCharacterListAjax = (setCharacterList) => {
    axios.get('http://localhost:3000/character').then(
        response => {
            setCharacterList(response.data)
        }
    );
    return true;
}

export const delCharacterListAjax = async (item,characterList,setCharacterList) => {
    try{
        await axios.delete('http://localhost:3000/character/' + item.id)
        message.success('Delete Success!');
        setCharacterList(characterList.filter((character)=>{
            return character.id !== item.id;
        }));
    }catch (e) {
        message.error("Delete Failed!");
    }

}

export const updateCharacterRightsAjax = async (item,characterList,setCharacterList) => {
    try{
        await axios.put('http://localhost:3000/character/' + item.id, item)
        message.success('Update Success!');
        setCharacterList(characterList.map((character)=>{
            if(item.id === character.id)
                return item;
            return character;
        }));
    }catch (e) {
        message.error("Update Failed!");
    }
}

// UserList
export const getUserListAjax = (setUserList) => {
    axios.get('http://localhost:3000/users').then(
        response => {
            setUserList(response.data)
        },
        error => {
            throw error
        }
    )
}

export const delUserAjax = async (user,userList, setUserList) => {
    try{
        await axios.delete('http://localhost:3000/users/' + user.id)
        message.success('delete success!');
        setUserList(userList.filter((u)=>{
            return u.id !== user.id;
        }))
    }catch (e){
            message.error('delete failed!');
    }
}

export const updateUserStateAjax = async (user,userList,setUserList) => {
    try{
        await axios.patch('http://localhost:3000/users/' + user.id, {userState: !user.userState})
        message.success('Update Success!');
        setUserList(userList.map((u)=>{
            if(u.id === user.id)
                u.userState = !u.userState;
            return u;
        }));
    }catch (e){
        message.error('Update Failed!');
    }

}

export const updateUserListAjax = async (newInfo,id,userList,setUserList)=>{
    try{
        await axios.patch('http://localhost:3000/users/' + id, newInfo);
        setUserList(userList.map((u)=>{
            if(u.id === id)
                return Object.assign({},u,newInfo);
            return u;
        }))
        message.success('Update Success!');
    }catch (e){
        message.error('Update Failed!');
    }
}

export const addUserAjax = async (newUser,userList,setUserList)=>{
    try{
        await axios.post('http://localhost:3000/users',newUser);
        userList.push(newUser);
        setUserList(userList);
        message.success('Add Success!');
    }catch (e){
        message.error('Add Failed!');
    }
}

//Login
export const loginCheckAjax = async (userObj,navigate,setUserList,setRightsList,setMenuListAsync,setCharacterList) => {
    try{
        const {username,password} = userObj;
        const userResponse = await axios.get(`http://localhost:3000/users?username=${username}`);
        const user = userResponse.data[0];
        if(password === user.password && user.userState) {
            message.success('Login Success!');
            const menuResponse = await axios.get('http://localhost:3000/menu?_embed=children')
            const characterResponse = await axios.get('http://localhost:3000/character');
            const characterList = characterResponse.data;
            const menuList = menuResponse.data;

            const rights = getCharacter(user, characterList, "rights");
            user.rights = rights;
            onLogin(user); // 设置cookie
            // 登录成功，做一些初始化
            setMenuListAsync(menuList,rights);
            setCharacterList(characterList);
            getRightsListAjax(setRightsList);
            getUserListAjax(setUserList);
            navigate('/home');
        }else{
            message.error('Password is not right or user is not in use!');
        }
    }catch (e){
        message.error('User not exist!');
        console.log(e);
    }
}

// export const refreshLoginStateAjax = async (user,setMenuListAsync,setCharacterList)=>{
//     try{
//         const menuResponse = await axios.get('http://localhost:3000/menu?_embed=children')
//         const characterResponse = await axios.get('http://localhost:3000/character');
//         // characterList
//         const characterList = characterResponse.data;
//         setCharacterList(characterList);
//         const rights = getCharacter(user, characterList, "rights");
//
//         // menuList
//         const menuList = menuResponse.data;
//         setMenuListAsync(menuList,rights);
//     }catch (e){
//         throw e;
//     }
// }
