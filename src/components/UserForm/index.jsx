import React, {forwardRef, useState} from 'react';
import {nanoid} from 'nanoid';
import {Form, Input, Select} from "antd";

const {Option} = Select;

const UserForm = forwardRef((props, ref) => {
    const {func,characterList} = props;
    const isUpdate = func === 'update';
    if(isUpdate){
        var {currentNode,getCharacter} = props;
    }
    const [disabled, setDisabled] = useState(currentNode && currentNode.characterId === 1);

    return (
        <Form
            id={nanoid()}
            ref={ref}
            name="basic"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={
                currentNode ?
                    {
                        username: currentNode.username,
                        password: currentNode.password,
                        region: currentNode.region,
                        characterId: getCharacter(currentNode, characterList, "title")
                    }
                    : undefined
            }
            autoComplete="off"
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input id={nanoid()}/>
            </Form.Item>
            <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password id={nanoid()}/>
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    id={nanoid()}
                    disabled={isUpdate ? disabled : false}
                    allowClear
                >
                    {/*不想建表了*/}
                    <Option value="全球" key={1}>全球</Option>
                    <Option value="亚洲" key={2}>亚洲</Option>
                    <Option value="美洲" key={3}>美洲</Option>
                    <Option value="欧洲" key={4}>欧洲</Option>
                    <Option value="非洲" key={5}>非洲</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="characterId"
                label="角色名称"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    id={nanoid()}
                    placeholder=""
                    onSelect={(value) => {
                        if (isUpdate) {
                            if (value === '超级管理员') {
                                setDisabled(true);
                            } else
                                setDisabled(false);
                        }
                    }}
                    allowClear
                >
                    {
                        characterList.map((character) => {
                            return (
                                <Option value={character.title} key={character.id}>{character.title}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
});

export default UserForm;
