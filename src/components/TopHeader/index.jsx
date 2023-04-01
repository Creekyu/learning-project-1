import React from 'react';
import {connect} from "react-redux";
import {setCollapse} from "../../redux/actions/collapse";

import {theme,Layout,Dropdown,Space,Avatar} from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";

const {Header} = Layout;



const TopHeader = (props) => {
    const {collapsed, setCollapse} = props;
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const changeState = ()=>{
        setCollapse(!collapsed);
    }

    const items = [
        {
            key: '1',
            label: "管理员"
        },
        {
            key: '2',
            danger: true,
            label:(
                <Link to="/login" state={{isLogout:true}}>退出</Link>
            )
        },
    ];
    return (
        <Header
            style={{
                padding: '16px',
                background: colorBgContainer,
            }}
        >
            {collapsed ? <MenuUnfoldOutlined onClick={changeState}/> : <MenuFoldOutlined onClick={changeState}/>}
            <div style={{position:'absolute',right:'70px',top:0,userSelect:'none'}}>欢迎admin回来</div>
            <div style={{position:'absolute',right:'25px',top:'15px',userSelect:'none'}}>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <Space>
                        <Avatar icon={<UserOutlined/>} />
                    </Space>
                </Dropdown>
            </div>
        </Header>
    )
}

export default connect(
    state => ({collapsed:state.collapse}),
    {
        setCollapse
    }
)(TopHeader)
