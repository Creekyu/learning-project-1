import React, {useEffect} from 'react';
// redux
import {connect} from "react-redux";
// index.css
import styles from './index.module.css';
// router
import {Link, useLocation} from "react-router-dom";
// antd
import {Menu, Layout} from "antd";
import {
    HomeOutlined,
    UserOutlined,
    KeyOutlined,
    FileAddOutlined,
    AuditOutlined,
    ToTopOutlined
} from "@ant-design/icons";


const {Sider} = Layout;

// args,functions
const iconList = {
    '/home': <HomeOutlined/>,
    '/users': <UserOutlined/>,
    '/role': <KeyOutlined/>,
    '/news': <FileAddOutlined/>,
    '/audit': <AuditOutlined/>,
    '/publish': <ToTopOutlined/>
}

function getItem(label, key, icon, children = null, type = null) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const generateMenuList = (menuList) => {
    return menuList.map((item) => {
        return item && item.page_permission ? (
                item.children && item.children.length !== 0 ?
                    getItem(<span>{item.title}</span>, item.key, iconList[item.key],
                        item.children.map((childItem) => {
                            return childItem.page_permission && childItem.grade === 2 ? getItem(<Link
                                    to={childItem.key}>{childItem.title}</Link>, childItem.key, iconList[item.key])
                                : null;
                        }))
                    : getItem(<Link to={item.key}>{item.title}</Link>, item.key, iconList[item.key])
            )
            : null;
    })
}


// component
const SideMenu = (props) => {

    const {menuList,collapsed} = props;
    const path = useLocation().pathname;
    const parent = '/' + path.split('/')[1];
    useEffect(() => {}, [menuList]);

    return (
        <Sider trigger={null}
               collapsible
               collapsed={collapsed}
               style={{overflow: "auto"}}
        >
            <div className={styles.logo}>全球新闻发布系统</div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[path]}
                defaultOpenKeys={[parent]}
                items={generateMenuList(menuList)}
            />
        </Sider>
    )
}

export default connect(
    state => ({
        menuList: state.menuList,
        collapsed:state.collapse
    }),
    {}
)(SideMenu);
