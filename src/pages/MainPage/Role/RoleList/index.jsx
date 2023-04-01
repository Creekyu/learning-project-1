import React, {useEffect} from 'react';
import {connect} from "react-redux";

import {setMenuList} from "../../../../redux/actions/menu_list";
import {setPage} from "../../../../redux/actions/current_page";
import {delRoleAjax, updatePagePermissionAjax} from "../../../../ajax";

import {Button, Popconfirm, Popover, Switch, Table, Tag} from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const RoleList = (props) => {
    const {
        menuList, setMenuList,
        currentViewPage,setPage
    } = props;
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <h1 style={{fontSize: '16px'}}>{text}</h1>
        },
        {
            title: '权限名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            key: 'key',
            render: (text) => {
                return (
                    <Tag color="gold">
                        {text}
                    </Tag>
                )
            }
        },
        {
            title: '操作',
            // 不写key的话item就拿到整个列表对象
            render: (item) => {
                return (
                    <>
                        <Popconfirm
                            title="Delete the role"
                            description="Are you sure to delete this role?"
                            onConfirm={() => delRoleAjax(item, menuList, setMenuList)}
                            onCancel={() => {
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger shape="circle" icon={<DeleteOutlined/>}></Button>
                        </Popconfirm>
                        &nbsp;&nbsp;
                        {
                            item.hasOwnProperty('page_permission') ? (<Popover content={
                                    <div>
                                        <span>关/开</span>
                                        &nbsp;&nbsp;
                                        <Switch checked={item.page_permission} size="small" onClick={() => {
                                            updatePagePermissionAjax(item, menuList, setMenuList);
                                        }}/>
                                    </div>
                                }
                                                                               title="配置是否可用">
                                    <Button type="primary" shape="circle" icon={<EditOutlined/>}></Button>
                                </Popover>)
                                : <Button type="primary" shape="circle" icon={<EditOutlined/>} disabled></Button>
                        }
                    </>
                )
            }
        }
    ];

    useEffect(() => {
    }, [menuList]);

    return (
        <div>
            <Table
                dataSource={menuList}
                columns={columns}
                rowKey={(item) => item.id}
                pagination={
                    {
                        defaultCurrent:currentViewPage[1],
                        defaultPageSize: 8
                    }
                }
                onChange={(value)=>{
                    currentViewPage[1] = value.current;
                    setPage(currentViewPage);
                }}
            />
        </div>
    )
}

export default connect(
    state => ({
        menuList: state.menuList,
        currentViewPage:state.currentViewPage
    }),
    {
        setMenuList,
        setPage
    }
)(RoleList);
