import React from 'react';
import {connect} from "react-redux";
import {useNavigate} from "react-router";
import {setCharacterList} from "../../redux/actions/character_list";
import {setMenuListAsync} from "../../redux/actions/menu_list";
import {setRightsList} from "../../redux/actions/rights_list";
import {setUserList} from "../../redux/actions/user_list";
import './index.css';
import { loginCheckAjax} from "../../ajax";
import {Form, Input, Button} from "antd";
import {
    UserOutlined,
    LockOutlined
} from "@ant-design/icons";

const Login = (props) => {
    const {
        setCharacterList,
        setRightsList,
        setUserList,
        setMenuListAsync
    } = props;
    const navigate = useNavigate();

    return (
        <div className="wall">
            <div className="login-wrapper">
                <div className="login-title">全球新闻发布系统</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    style={
                        {
                            margin: "0 40px",
                            marginTop: "80px"
                        }
                    }
                    onFinish={(user) => {
                        loginCheckAjax(user, navigate,setUserList ,setRightsList,setMenuListAsync,setCharacterList);
                    }}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default connect(
    undefined,
    {
        setCharacterList,
        setMenuListAsync,
        setRightsList,
        setUserList
    }
)(Login)
