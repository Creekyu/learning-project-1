import React, {useEffect, useState, useRef, useMemo} from 'react';
import {connect} from "react-redux";
import {setUserList} from "../../../redux/actions/user_list";
import {setCharacterList} from "../../../redux/actions/character_list";
import {setPage} from "../../../redux/actions/current_page";
import {getCharacter} from "../../../utilities";

import {
    delUserAjax,
    updateUserStateAjax,
    updateUserListAjax, addUserAjax
} from "../../../ajax";

import './index.css';

import UserForm from "../../../components/UserForm";

import {Button, Popconfirm, Table, Switch, Modal} from "antd";
import {DeleteOutlined, UnorderedListOutlined} from "@ant-design/icons";


const handleUpdateSubmit = (characterMap, node, currentNode, userList, setUserList, characterList) => {
    node.current.validateFields().then(
        data => {
            // 转换characterId
            data.characterId = characterMap.get(data.characterId);
            updateUserListAjax(data, currentNode.id, userList, setUserList);
        }
    )
}

const handleAddSubmit = (characterMap, node, userList, setUserList) => {
    node.current.validateFields().then(
        data => {
            // 转换characterId
            data.characterId = characterMap.get(data.characterId);
            const newUser = Object.assign({}, {
                id: userList[userList.length - 1].id + 1,
                userState: true,
                default: false
            }, data);
            addUserAjax(newUser, userList, setUserList);
        }
    )
}

const Users = (props) => {
    const {
        characterList,
        userList, setUserList,
        currentViewPage,setPage
    } = props;

    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [currentNode, setCurrentNode] = useState({});

    const form = useRef();
    const characterMap = useMemo(() => {
        const characterMap = new Map();
        characterList.map((character) => {
            characterMap.set(character.title, character.id);
            return null;
        })
        return characterMap;
    }, [characterList]);

    useEffect(() => {}, [userList]);

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            key: 'region',
            render: (text) => <h1 style={{fontSize: '16px', fontWeight: "bold"}}>{text}</h1>
        },
        {
            title: '角色名称',
            render: (item) => {
                return (
                    <span>{getCharacter(item, characterList, "title")}</span>
                )
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '用户状态',
            render: (item) => {
                return (
                    <>
                        {
                            !item["default"] ?
                                (<Switch style={{marginLeft: "6px"}} checked={item["userState"]} onChange={() => {
                                    updateUserStateAjax(item, userList, setUserList)
                                }}/>)
                                :
                                <Switch style={{marginLeft: "6px"}} checked={item["userState"]} disabled/>
                        }
                    </>
                )
            }
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <>
                        {
                            !item["default"] ?
                                (
                                    <>
                                        <Popconfirm
                                            title="Delete the user"
                                            description="Are you sure to delete this user?"
                                            onConfirm={() => {
                                                delUserAjax(item, userList, setUserList)
                                            }}
                                            onCancel={() => {
                                            }}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button danger shape="circle" icon={<DeleteOutlined/>}></Button>
                                        </Popconfirm>
                                        &nbsp;&nbsp;
                                        <Button type="primary"
                                                shape="circle"
                                                icon={<UnorderedListOutlined/>}
                                                onClick={() => {
                                                    setModal1Open(true);
                                                    setCurrentNode(item);
                                                }}
                                        ></Button>
                                        <Modal
                                            title="更新用户信息"
                                            maskStyle={{backgroundColor: 'rgba(0,0,0,.2)'}}
                                            centered
                                            okText="更新"
                                            open={modal1Open}
                                            onOk={() => {
                                                setModal1Open(false);
                                                handleUpdateSubmit(characterMap, form, currentNode, userList, setUserList, characterList);
                                            }}
                                            destroyOnClose={() => {
                                                setCurrentNode([]);/*关闭窗口时重置一下值，否则在开启仍是上次选中的状态*/
                                            }}
                                            onCancel={() => {
                                                setModal1Open(false);
                                            }}>
                                            <UserForm currentNode={currentNode}
                                                      characterList={characterList}
                                                      getCharacter={getCharacter}
                                                      ref={form}
                                                      func={"update"}
                                            ></UserForm>
                                        </Modal>
                                    </>
                                ) : (
                                    <>
                                        <Button danger shape="circle" icon={<DeleteOutlined/>} disabled></Button>
                                        &nbsp;&nbsp;
                                        <Button type="primary"
                                                shape="circle"
                                                icon={<UnorderedListOutlined/>}
                                                disabled
                                        ></Button>
                                    </>
                                )
                        }
                    </>
                )
            }
        }
    ]


    return (
        <>
            <Button type="primary"
                    onClick={() => {
                        setModal2Open(true)
                    }}
                    style={{marginBottom: "10px"}}
            >添加人员</Button>
            <Modal
                title="添加用户信息"
                maskStyle={{backgroundColor: 'rgba(0,0,0,.2)'}}
                centered
                okText="添加"
                open={modal2Open}
                destroyOnClose
                onOk={() => {
                    setModal2Open(false);
                    handleAddSubmit(characterMap, form, userList, setUserList);
                }}
                onCancel={() => {
                    setModal2Open(false);
                }}>
                <UserForm func={"add"}
                          characterList={characterList}
                          ref={form}
                ></UserForm>
            </Modal>

            <Table
                dataSource={userList}
                columns={columns}
                rowKey={(item) => item.id}
                pagination={
                    {
                        defaultCurrent:currentViewPage[0],
                        defaultPageSize:8
                    }
                }
                onChange={(value)=>{
                    currentViewPage[0] = value.current;
                    setPage(currentViewPage);
                }}
            />
        </>
    )
}

export default connect(
    state => ({
        userList: state.userList,
        characterList: state.characterList,
        currentViewPage:state.currentViewPage
    }),
    {
        setUserList,
        setCharacterList,
        setPage
    }
)(Users);
