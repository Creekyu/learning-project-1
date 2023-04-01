import React, {useEffect, useState, useMemo} from 'react';

import {connect} from "react-redux";
import {setRightsList} from "../../../../redux/actions/rights_list";
import {setCharacterList} from "../../../../redux/actions/character_list";
import {setPage} from "../../../../redux/actions/current_page";
import {
    delCharacterListAjax,
    updateCharacterRightsAjax
} from "../../../../ajax";
import './index.css';

import {Button,  Popconfirm, Modal, Table, Tree} from "antd";
import {DeleteOutlined, UnorderedListOutlined} from "@ant-design/icons";

const generateRightsList = (rightsList) => {
    let newList = JSON.parse(JSON.stringify(rightsList))
    return newList.map((list) => {
        if (list.children) {
            list.children = list.children.map((child) => {
                return {key: child, title: child};
            })
        }
        return list;
    });
}

const updateTree = (rights, setCurrentNode, currentNode) => {
    setCurrentNode({
        id: currentNode.id,
        title: currentNode.title,
        rights
    });
}

const CharacterList = (props) => {
    const {
        rightsList,
        characterList, setCharacterList,
        currentViewPage,setPage
    } = props;
    const [modalOpen, setModalOpen] = useState(false);
    // 多选框需在按下按钮时set当前item的key，否则会被后面的覆盖
    const [currentNode, setCurrentNode] = useState({});
    const formatList = useMemo(() => {
        return generateRightsList(rightsList);
    }, [rightsList]);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <h1 style={{fontSize: '16px'}}>{text}</h1>
        },
        {
            title: '角色名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <>
                        <Popconfirm
                            title="Delete the character"
                            description="Are you sure to delete this character?"
                            onConfirm={() => delCharacterListAjax(item,characterList,setCharacterList)}
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
                                    setModalOpen(true);
                                    setCurrentNode(item);
                                }}
                        ></Button>
                        <Modal
                            title="选择配置开关权限"
                            maskStyle={{backgroundColor: 'rgba(0,0,0,.2)'}}
                            centered
                            open={modalOpen}
                            onOk={() => {
                                setModalOpen(false);
                                updateCharacterRightsAjax(currentNode, characterList,setCharacterList);
                            }}
                            onCancel={() => setModalOpen(false)}
                        >
                            <Tree
                                checkable
                                onCheck={(value) => updateTree(value, setCurrentNode, currentNode)}
                                checkedKeys={currentNode.rights}
                                treeData={formatList}
                            />
                        </Modal>
                    </>
                )
            }
        }
    ];


    useEffect(() => {}, [characterList]);

    return (
        <div>
            <Table
                dataSource={characterList}
                columns={columns}
                rowKey={(item) => item.id}
                pagination={
                    {
                        defaultCurrent:currentViewPage[2],
                        defaultPageSize: 8
                    }
                }
                onChange={(value)=>{
                    currentViewPage[2] = value.current;
                    setPage(currentViewPage);
                }}
            />
        </div>
    )

}

export default connect(
    state => ({
        rightsList: state.rightsList,
        characterList: state.characterList,
        currentViewPage:state.currentViewPage
    }),
    {
        setRightsList,
        setCharacterList,
        setPage
    }
)(CharacterList)