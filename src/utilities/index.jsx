const getObjType = (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1);
}
export const deepClone = (obj) => {
    let type = getObjType(obj);
    let container;
    if (type === 'Array')
        container = [];
    else
        container = {};
    for (let item in obj) {
        let type = getObjType(item);
        if (type === 'Array' || type === 'Object')
            container[item] = deepClone(item);
        else
            container[item] = obj[item];
    }
    return container;
}

// 根据user.characterId获取相应character中的某个属性
export const getCharacter = (user, characterList, prop) => {
    const temp = characterList.filter((character) => {
        return user["characterId"] === character.id;
    });
    return temp[0] ? temp[0][prop] : undefined;
}

export const getUserMenuList = (menuList,rights)=>{
    const newMenu = menuList.filter((menu) => {
        return  rights.indexOf(menu.key) !== -1
    });
    newMenu.map((menu) => {
        if (menu.children) {
            menu.children.filter((child) => {
                return rights.indexOf(child.key) !== -1;
            });
        }
        return menu;
    });
    return newMenu;
}