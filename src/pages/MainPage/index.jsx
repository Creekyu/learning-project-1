import React from 'react';
import './index.css';

import SideMenu from "../../components/SideMenu";
import TopHeader from "../../components/TopHeader";

import {Layout, theme} from 'antd';
import {Outlet} from "react-router";

const {Content} = Layout;

const MainPage = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    // 理论上需要根据cookie重新刷新登录状态，避免页面内刷新导致的state丢失
    // useEffect(() => {
        //持久化以后就不需要重复请求了
        // 注意刷新时不能更新cookie里的user否则cookie刷新一次就会重置一次
        // const user = loadUser('currentUser');
        // if(user)
        //     refreshLoginStateAjax(user, setMenuListAsync, setCharacterList);
    // }, []);


    return (
        <>
            <Layout>
                <SideMenu></SideMenu>
                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            overflow:"auto"
                        }}
                    >
                        {/*outlet*/}
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
export default MainPage;



