import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Input, Col, Tabs, Button,  message, Divider, Form, } from 'antd';
import Bank from './Bank';

const styles = theme => ({
    root: {
        width: '60%',
        margin: '50px auto',
        
    },
    stepsContent:{
        marginBottom: 25,
    },
    button:{
        color: '#fff',
        backgroundColor: '#00a3fe',
        borderColor: 'transparent',
        textAlign: 'center',
        verticalAlign: 'middle',
        touchAction: 'manipulation',
        cursor: 'pointer',
        border: '1px solid #d5d5d5',
        transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        transform: 'translateZ(0)',
        height: '32px',
        padding: '0 15px',
        borderRadius: 4,
        '&:hover':{
            backgroundColor: '#0085cc'
        }
    },
    codeInput:{
        '& span':{
            color: '#40a9ff',
        },
        borderColor: '#40a9ff'
    }
})

const type =[{
    code: '1',
    value: '交易历史'
},{
    code: '2',
    value: '挂单查询'
},{
    code: '3',
    value: '持仓查询'
},]

class PasswordForm extends Component {
    constructor(props){        
        super(props)       
    };   
    state = {

    }
    handleSubmitPassword = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            Axios.post('/user/updatepassword',{
                password_original: values.oldPassword,
                password_confirm: values.confirm,
                password: values.password,
            })
            .then(function (response) {
                message.success('修改成功！');
            })
            .catch(function(error){
                message.warning(error.response.data.message);
            });
          }
        });
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
        return (
            <Form layout="inline" onSubmit={this.handleSubmitPassword}>
                <FormItem>
                {getFieldDecorator('oldPassword', {
                    rules: [{ required: true, message: '请输入旧密码' }],
                })(
                    <Input type="password" placeholder="旧密码" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入新密码' },{validator: this.validateToNextPassword,}],
                })(
                    <Input type="password" placeholder="新密码"/>
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('confirm', {
                    rules: [{required: true, message: '请确认输入新密码',},{validator: this.compareToFirstPassword,}],
                })(
                    <Input type="password" placeholder="确认新密码"/>
                )}
                </FormItem>
                <FormItem style={{float:'right'}}>
                    <Button type='primary' htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        )
    }
}
PasswordForm = withStyles(styles, { withTheme: true })  (withRouter(Form.create()(PasswordForm)));

class PhoneForm extends Component {
    constructor(props){        
        super(props)       
    };   
    state = {
        img: '',
        key: '',
        picCaptcha: '',
        sendcodeMsg: '点击获取验证码',
        isDisabled: false,
        registerPhone: '',
        count: 60,
    }
    componentWillMount(){
        const that = this;
        Axios.get('/captcha')
        .then(function (response) {
          that.setState({ 
            img: response.data.data.img,
            key: response.data.data.key,
          });
        })
      }
    handleSubmitPhone = (e) => {
        const that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            Axios.post('/user/updatemobile',{
                mobile: values.phone,
                mobile_prefix: values.phonePrefix,
                code: values.captcha,
            })
            .then(function (response) {
                message.success('修改成功！');
            })
            .catch(function(error){
                message.warning(error.response.data.message);
            });
          }
        });
    }
    clickSendCode () {
        const that = this;
        Axios.get('/captcha')
        .then(function (response) {
          that.setState({ 
            img:response.data.data.img,
            key: response.data.data.key,
          });
        })
    }
    change = (event) =>{
        this.setState({
            picCaptcha: event.target.value
        })
    }
    changePhone = (event) =>{
        this.setState({
            registerPhone: event.target.value
        })
    }
    handlePhoneCode= () =>{
        const that = this;
        Axios.post('/passport/sendcode', {
            "mobile":that.state.registerPhone,
            "mobile_prefix":"+86",
            "ckey":that.state.key,
            "captcha":that.state.picCaptcha,
          })
          .then(function (response) {
            let count = that.state.count;
            const timer = setInterval(() => {
            that.setState({ 
            count: (count--), 
            flge: 1,
            sendcodeMsg: count+'秒后重新获取验证码',
            });
            if (count === 0) {
            clearInterval(timer);
            that.setState({
            flge: 0 ,
            sendcodeMsg:'点击获取验证码',
            count: 60
            })
            }
            }, 1000)
          })
          .catch(function (error) {
            message.warning(error.response.data.message);
         });
    }
    render() {
        const { classes } = this.props;
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        return (
            <Form layout="inline" onSubmit={this.handleSubmitPhone}>
                <FormItem style={{width: 60,}}>
                {getFieldDecorator('phonePrefix', {
                    initialValue: '+86',
                })(
                    <Input readOnly/>
                )}
                </FormItem>
                <FormItem className={classes.formInput}>
                {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入新手机号码' },{validator: this.validateToNextPassword,}],
                })(
                    <Input onChange={this.changePhone} placeholder="新手机号码"/>
                )}
                </FormItem>
                <FormItem>
                    <img onClick={() => this.clickSendCode()} src={this.state.img} style={{height: 32}}></img>
                </FormItem>
                <FormItem style={{width: 100,}}>
                {getFieldDecorator('picCaptcha', {
                    rules: [{required: true, message: '请输入图片验证码',},{validator: this.compareToFirstPassword,}],
                })(
                    <Input onChange={this.change} placeholder="图片验证码"/>
                )}
                </FormItem>
                <FormItem>
                    <Button disabled={this.state.isDisabled} onClick={this.handlePhoneCode} className={classes.codeInput}>{this.state.sendcodeMsg}</Button>
                </FormItem>
                <FormItem style={{width: 80,}}>
                {getFieldDecorator('captcha', {
                    rules: [{required: true, message: '请输入验证码',},{validator: this.compareToFirstPassword,}],
                })(
                    <Input placeholder="验证码"/>
                )}
                </FormItem>
                <FormItem style={{float:'right'}}>
                    <Button type='primary' htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        )
    }
}
PhoneForm = withStyles(styles, { withTheme: true })  (withRouter(Form.create()(PhoneForm)));

class EmailForm extends Component {
    constructor(props){        
        super(props)       
    };   
    state = {
        // type: this.props.email == '' ? '2' : '1',
        email: '',
        sendOldEmailcodeMsg: '获取旧邮箱验证码',
        sendNewEmailcodeMsg: '获取新邮箱验证码',
        isDisabled: false,
        count: 60,
    }
    handleSubmitEmail = (e) => {
        const that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // if(that.state.type == '1'){
            //     Axios.post('/passport/checkmailcode', {
            //         "email": values.oldEmail,
            //         "code": values.oldCaptcha,
            //     })
            //     .then(function (response) {
            //         that.setState({ 
            //             type:'2',
            //         });
            //     })
            //     .catch(function (error) {
            //         message.warning('旧邮箱验证失败');
            //     });
            // }
            // if(that.state.type == '2'){
                Axios.post('/user/updateemail', {
                    "email": values.newEmail,
                    "code": values.newCaptcha,
                })
                .then(function (response) {
                    message.warning('邮箱修改成功');
                })
                .catch(function (error) {
                    message.warning('邮箱修改失败');
                });
            // }
          }
        });
    };
    change = (event) =>{
        this.setState({
            email: event.target.value
        })
    }
    handleCode = () =>{
        const that = this;
        // if(that.state.type == '1'){
        //     Axios.post('/passport/sendmailcode', {
        //         "email": that.state.email,
        //     })
        //     .then(function (response) {
        //         that.setState({ 
        //             sendOldEmailcodeMsg:'1分钟后重新获取验证码',
        //             isDisabled: true,
        //         });
        //         setTimeout(function(){
        //             that.setState({ 
        //                 sendOldEmailcodeMsg:'获取旧邮箱验证码',
        //                 isDisabled: false,
        //             });
        //         },60000)
        //         message.warning('旧邮箱验证发送成功');
        //     })
        //     .catch(function (error) {
        //         message.warning('旧邮箱验证发送失败');
        //     });
        // }
        // if(that.state.type == '2'){
            Axios.post('/passport/sendmailcode', {
                "email": that.state.email,
            })
            .then(function (response) {
                let count = that.state.count;
                const timer = setInterval(() => {
                that.setState({ 
                count: (count--), 
                isDisabled: true,
                sendNewEmailcodeMsg: count+'秒后重新获取验证码',
                });
                if (count === 0) {
                clearInterval(timer);
                that.setState({
                isDisabled: false ,
                sendNewEmailcodeMsg:'点击获取邮箱验证码',
                count: 60
                })
                }
                }, 1000)
                message.warning('新邮箱验证发送成功');
            })
            .catch(function (error) {
                message.warning(error.response.data.message);
            });
        // }
    }
    render() {
        const { classes } = this.props;
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        return (
            <Form layout="inline" onSubmit={this.handleSubmitEmail}>
                {/* {this.state.type == '1'&& 
                <FormItem className={classes.formInput}>
                {getFieldDecorator('oldEmail', {
                    rules: [{
                        type: 'email', message: '请输入邮箱',
                        }, {
                        required: true, message: '请输入邮箱',
                    }],
                })(
                    <Input onChange={this.change} placeholder="旧电子邮箱"/>
                )}
                </FormItem>
                }
                {this.state.type == '1'&& 
                <FormItem>
                    <Button disabled={this.state.isDisabled} onClick={this.handleCode} className={classes.codeInput}>{this.state.sendOldEmailcodeMsg}</Button>
                </FormItem>
                }
                {this.state.type == '1'&& 
                <FormItem style={{width: 160,}}>
                {getFieldDecorator('oldCaptcha', {
                    rules: [{required: true, message: '请输入验证码',}],
                })(
                    <Input placeholder="旧邮箱验证码"/>
                )}
                </FormItem>
                } */}
                {/* {this.state.type == '2'&&  */}
                <FormItem className={classes.formInput}>
                {getFieldDecorator('newEmail', {
                    rules: [{
                        type: 'email', message: '请输入邮箱',
                        }, {
                        required: true, message: '请输入邮箱',
                    }],
                })(
                    <Input onChange={this.change} placeholder="新电子邮箱"/>
                )}
                </FormItem>
                {/* }
                {this.state.type == '2'&&  */}
                <FormItem>
                    <Button disabled={this.state.isDisabled} onClick={this.handleCode} className={classes.codeInput}>{this.state.sendNewEmailcodeMsg}</Button>
                </FormItem>
                {/* }
                {this.state.type == '2'&&  */}
                <FormItem >
                {getFieldDecorator('newCaptcha', {
                    rules: [{required: true, message: '请输入验证码',}],
                })(
                    <Input placeholder="新邮箱验证码" />
                )}
                </FormItem>
                {/* }                 */}
                <FormItem style={{float:'right'}}>
                    <Button type='primary' htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        )
    }
}
EmailForm = withStyles(styles, { withTheme: true })  (withRouter(Form.create()(EmailForm)));

class UserNameForm extends Component {
    constructor(props){        
        super(props)       
    };   
    state = {
        
    }
    handleSubmitUserName = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            Axios.post('/user/updateusername',{
                username: values.name
            })
            .then(function (response) {
                message.success('修改成功')
            })
            .catch(function(error){
                message.warning('修改失败')
            })
          }
        });
    };
    handleCode = () =>{
        
    }
    render() {
        const { classes } = this.props;
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        return (
            <Form layout="inline" onSubmit={this.handleSubmitUserName}>
                <FormItem style={{width: 160,}}>
                {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入新的用户名',}],
                })(
                    <Input placeholder="新用户名" onClick={this.handleCode}/>
                )}
                </FormItem>
                <FormItem style={{float:'right'}}>
                    <Button type='primary' htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        )
    }
}
UserNameForm = withStyles(styles, { withTheme: true })  (withRouter(Form.create()(UserNameForm)));

class ChangeUserMsg extends Component {
    constructor(props){        
        super(props)
        const that = this;  
        this.state = {
            flag:true,
            name:that.props.data.name,
            password:'******',
            email:that.props.data.email,
            phone:that.props.data.mobile,
        };
          
    };
    

    
    componentWillMount = () => {
        const that = this;
        const key = JSON.parse(sessionStorage.getItem('key'));
        this.setState ({
          key: key,
        })
    }
    
    handleChange = (name) => event =>{

    }

    changeMsg = () => {
        const that = this;
        if(this.state.flag == false){
            that.setState({ flag: true });
        }else{

            that.setState({ flag: false });
        }

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    

    render() {
        const { classes } = this.props;
        const { flag, phone, email, name, password} = this.state;
        const InputGroup = Input.Group;
        const TabPane = Tabs.TabPane;
        
        // console.log(this.props)
        return (
            <Tabs defaultActiveKey='1' className={classes.appBar}>
                <TabPane tab="基本资料"  
                key="1"
                selected={false}
                >
                    <Col span={24} className={classes.col}>
                        <Col span={24} style={{borderBottom: '1px solid rgba(2, 2, 2, 0.16)',padding: 25}}>
                            <Col span={24}>
                                <Col span={5} >
                                    <h3>用户名修改</h3>
                                </Col>
                            </Col>
                            <Col span={24} className={classes.inputCol}>
                                <UserNameForm />
                            </Col>
                        </Col>
                    </Col>
                </TabPane>
                <TabPane tab="账户安全"  
                key="2"
                selected={false}
                >
                    <Col span={24} className={classes.col}>
                        <Col span={24} style={{borderBottom: '1px solid rgba(2, 2, 2, 0.16)',padding: 25}}>
                            <Col span={24}>
                                <Col span={5} >
                                    <h3>密码管理</h3>
                                </Col>
                            </Col>
                            <Col span={24} className={classes.inputCol}>
                                <PasswordForm />
                            </Col>
                        </Col>
                        <Col span={24} style={{borderBottom: '1px solid rgba(2, 2, 2, 0.16)',padding: 25}}>
                            <Col span={24}>
                                <Col span={4} >
                                    <h3>手机号码管理</h3>
                                </Col>
                                <Col span={18} >
                                    <h4 style={{color: '#999',fontSize: 13}}>您已经绑定了手机号码<span style={{color: '#40a9ff',}}>{phone == '' ? '':phone.slice(0,3)}******{phone.substring(phone.length-3)}</span></h4>
                                </Col>
                            </Col>
                            <Col span={24} className={classes.inputCol}>
                                <PhoneForm />
                            </Col>
                        </Col>
                        <Col span={24} style={{borderBottom: '1px solid rgba(2, 2, 2, 0.16)',padding: 25}}>
                            <Col span={24}>
                                <Col span={4} >
                                    <h3>电子邮箱设置</h3>
                                </Col>
                                <Col span={18} >
                                    <h4 style={{color: '#999',fontSize: 13}}>您已经绑定了电子邮箱<span style={{color: '#40a9ff',}}>{email == '' ? '':email.slice(0,3)}******{email.substring(email.length-5)}</span></h4>
                                </Col>
                            </Col>
                            <Col span={24} className={classes.inputCol}>
                                <EmailForm email={email} />
                            </Col>
                        </Col>
                    </Col>
                </TabPane>
                <TabPane tab="银行信息"  
                key="3"
                selected={false}
                >
                    <Bank />
                </TabPane>
            </Tabs>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(ChangeUserMsg));