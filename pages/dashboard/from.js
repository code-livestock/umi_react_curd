import { Form, Input, message, Select, Button } from 'antd';
import _ from 'lodash';
import { connect } from 'dva';
import router from 'umi/router';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ user }) => ({
    tipMessage: user.tipMessage,
    btnName: user.btnName,
    btnType: user.btnType,
    userList: user.userList
}))
class RegistrationForm extends React.Component {
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const dispatch = this.props.dispatch;
                let btnType = this.props.btnType;
                let type = "user/create";
                if (btnType == "update") {
                    type = "user/update";
                    values.id = this.getQueryString("id");
                    let id = values.id;
                    let querystring = "id=" + id;
                    dispatch(
                        {
                            type: "user/userList",
                            payload: {
                                querystring
                            }
                        }
                    )
                }
                dispatch({
                    type: type,
                    payload: {
                        values,
                        callback: (errmsg) => {
                            message.success(errmsg);
                            if ("创建成功" == errmsg || "更新成功" == errmsg) {
                                router.push("/dashboard/table");
                            }

                        }
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const btnType = this.props.btnType;
        const user = this.props.userList[0];
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('username', {
                        initialValue: btnType == "update" ? user.username : "",
                        rules: [{
                            required: true, message: 'Please input your name',
                        }],
                    })(
                        <Input placeholder="请填写用户名" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        initialValue: btnType == "update" ? user.password : "",
                        rules: [{
                            required: true, message: '密码不能为空',
                        }],
                    })(
                        <Input type="password" placeholder="请填写密码" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电话号码"
                >
                    {getFieldDecorator('phone', {
                        initialValue: btnType == "update" ? user.phone : "",

                    })(
                        <Input placeholder="请填写电话号码" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="年龄"
                >
                    {getFieldDecorator('age', {
                        initialValue: btnType == "update" ? user.age : "",
                    })(
                        <Input placeholder="请填写年龄" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电子邮箱"
                >
                    {getFieldDecorator('email', {
                        initialValue: btnType == "update" ? user.email : "",
                    })(
                        <Input placeholder="请填写电子邮箱" />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="性别"
                    hasFeedback
                >
                    {getFieldDecorator('sex', {
                        initialValue: btnType == "update" ? user.sex : "",
                        rules: [
                            { required: true, message: '请选择性别' },
                        ],
                    })(
                        <Select placeholder="请选择性别">
                            <Option value="male">男</Option>
                            <Option value="female ">女</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...submitFormLayout}>
                    <Button type="primary" htmlType="submit">{this.props.btnName}</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;
