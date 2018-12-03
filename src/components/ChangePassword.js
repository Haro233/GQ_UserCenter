import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Col, Button, Input, Row, Select, Form, message} from 'antd';


const styles = theme => ({
    
})


class ChangePassword extends Component {
    constructor(props){        
        super(props)  
        this.state = {
            type: [
                {value:0,title:'交易主密码'},
                {value:1,title:'投资者密码'},
            ],
            typePage: 0,
        };  
    };
    
    componentDidMount = () =>{
        const { setFieldsValue } = this.props.form; 
        setFieldsValue({ 
            'id': this.props.msg.id,
        })
    }
    handleSubmitOne = (e) => {
        const that = this;
        e.preventDefault();
        that.props.form.validateFields((err, values) => {
          if (!err) {
            let data = {}
            if(that.state.typePage == 0){
                data={
                    id:values.id,
                    password:values.oldPassword,
                    password_main:values.password,
                    password_confirm: values.confirm,
                }
            }
            if(that.state.typePage == 1){
                data= {
                    id:values.id,
                    password:values.oldPassword,
                    password_investor:values.password,
                    password_confirm: values.confirm,
                }
            }
            Axios.post('/user/account/updatepassword',data)
            .then(function (response) {
                message.success('成功！');
            }).catch(function (error) {
                message.warning(error.response.data.message);
            });
          }
        });
    }  
    changeType = (event) =>{
        this.setState({typePage:event})
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('请输入一致的密码');
        } else {
          callback();
        }
    }

    render() {
        const { classes } = this.props;
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        const Option = Select.Option;
        const { type,typePage} = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmitOne}>
                <Row type="flex" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        label={<span>交易账号</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('id', {})(
                            <Input disabled/>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        label={<span>密码类型</span>} 
                        colon={false}
                        >
                        {getFieldDecorator('type', {
                            rules: [{
                                required: true, message: '请选择密码类型',
                            }],
                        })(
                            <Select
                                placeholder="请选择"
                                onChange={this.changeType}
                            >
                            {type.map(option => (
                                <Option  key={option.value}>
                                    {option.title}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                {typePage == 0 &&
                <Row type="flex" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        label={<span>旧密码</span>} 
                        colon={false}
                        >
                        {getFieldDecorator('oldPassword', {
                            rules: [{ required: true, message: '请输入旧密码' }],
                        })(
                            <Input type="password" placeholder="旧密码" />
                        )}
                        </FormItem>
                    </Col>
                </Row>
                }
                {typePage == 1 &&
                <Row type="flex" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        label={<span>主密码</span>} 
                        colon={false}
                        >
                        {getFieldDecorator('oldPassword', {
                            rules: [{ required: true, message: '请输入主密码' }],
                        })(
                            <Input type="password" placeholder="主密码" />
                        )}
                        </FormItem>
                    </Col>
                </Row>
                }
                <Row type="flex" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        label={<span>新密码</span>} 
                        colon={false}
                        >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入新密码' },{validator: this.validateToNextPassword,}],
                        })(
                            <Input type="password" placeholder="新密码"/>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        label={<span>确认密码</span>} 
                        colon={false}
                        >
                        {getFieldDecorator('confirm', {
                            rules: [{required: true, message: '请确认输入新密码',},{validator: this.compareToFirstPassword,}],
                        })(
                            <Input type="password" placeholder="确认新密码"/>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="right" style={{marginTop: 15}}>
                    <Col span={11} style={{textAlign: 'right'}} >
                        <FormItem>
                            <Button htmlType="submit" type="primary">提交</Button>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>                
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(Form.create()(ChangePassword)));

