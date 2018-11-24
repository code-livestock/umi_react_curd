import { Table, Divider, Popconfirm, Icon, message } from 'antd';
import { connect } from 'dva';
import router from "umi/router";
const UserTable = (props) => {
    const data = props.userList;
    const total = props.total;
    const dispatch = props.dispatch;
    const userDetails = (record) => {
        dispatch({
            type: "user/reBtn",
            payload: {
                btnName: "更新",
                btnType: "update"
            }
        })
        router.push(`/dashboard/from?id=${record.id}`);
    }
    const deleteUser = (id) => {
        dispatch({
            type: "user/deleteUser",
            payload: {
                id: id,
                callback: (errmsg) => {
                    message.success(errmsg);
                    router.push(`/dashboard/table`);
                }
            }
        })

    }
    const columns = [{
        title: '用户id',
        dataIndex: 'id',
        width: 150

    }, {
        title: '用户名',
        dataIndex: 'username',
    }, {
        title: '电子邮箱',
        dataIndex: 'email',
    }, {
        title: "电话号码",
        dataIndex: 'phone',
    }, {
        title: '年纪',
        dataIndex: 'age'
    }, {
        title: '性别',
        dataIndex: 'sex',
        render: (sex) => {
            return sex == "male" ? "男" : "女"
        }
    }, {
        title: "创建时间",
        dataIndex: 'create_time',
        
    },
    {
        title: '操作',
        fixed: 'right',
        width: 120,
        render: (text, record) => (
            <span>
                <a onClick={() => userDetails(record)}>详情</a>
                <Divider type="vertical" />
                <Popconfirm
                    onConfirm={() => deleteUser(record.id)}
                    title="你确定删除吗"
                    cancelText="取消"
                    okText="确定"
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} >
                    <a href="javascript:;">删除</a>
                </Popconfirm>

            </span>
        ),
    }];

    return (
        <Table
            pagination={
                {
                    pageSize: 10,
                    total: Number(total),
                    showQuickJumper: true,
                    onChange: (current_page) => {
                        dispatch({
                            type: "user/userList",
                            payload: {
                                querystring: `start=${Number(current_page - 1) * 10}&length=10`,
                            }
                        })
                    }
                }

            }
            rowKey="id"
            bordered
            columns={columns}
            dataSource={data}
            scroll={{ x: 1200 }}  >
        </Table>
    )
}
function mapStateToProps(state) {
    return { ...state.user };
}
export default connect(mapStateToProps)(UserTable);