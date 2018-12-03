import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Select, Input, Col, Button, DatePicker, message } from 'antd';
import Logo from '../images/logo2.jpg';
const styles = theme => ({
    root: {
        display: 'inline-block',
        width: '100%',
        marginTop: 20,
        '& h2':{
            marginBottom: 20,
        }
    },
    box:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&:hover':{
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        padding: '20px 20px',
        boxSizing: 'border-box',
    },
    centerLine:{
        width: '100%',
        height: 1,
        background: '#eceff0',
    },
    left:{
        height:78,
        width: 78,
        borderRadius: '100%',
        overflow: 'hidden',
        textAlign: 'center',
        display:'flex',
        verticalAlign: 'middle',
        border: '1px solid #eceff0',
        alignItems: 'center',
        
        '& img':{
            width: 78,
            height: 22,
        }
    },
    title:{
        color: '#666',
        display:'flex',
        verticalAlign: 'middle',
        alignItems: 'center',
        '& span':{
            color: '#333',
            fontSize: 16,
        }
    },
    right:{
        '& button':{
            marginLeft: 15,
        }
    },
    centerTopLeft:{
        display: 'flex',
        '& h2':{
            color: '#333',
            fontSize: 16,
            marginBottom: 15,
            marginLeft: 15,
        },
        '& h3':{
            color: '#999',
            fontSize: 12,
            marginLeft: 15,
        },
    },
    col:{
        textAlign: 'right',
        height: 32,
        lineHeight: '32px',
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
    group:{
        marginTop: 25,
    }
})

class CreateAccount extends Component {
    constructor(props){        
        super(props)  
        this.state = {
            page: '1',
            name: this.props.data.name,
            email: this.props.data.email,
            mobile: this.props.data.mobile,
            mobile_prefix: this.props.data.mobile_prefix,
            key: '',
            img: '',
            sendcodeMsg: '点击获取验证码',
            sendcode:'',
            code: '',
            type: this.props.data.email != ''? '1' : '2',
            data: 1,
            msg: '提交',
            count: 60,
            handTrueAccount: this.props.handTrueAccount,
            handSimulationAccount: false,
        };  
    };
    

    
    componentWillMount = () => {
        const that = this;
        Axios.get('/captcha')
        .then(function (response) {
            that.setState({ 
                img:response.data.data.img,
                key: response.data.data.key,
            });
        })
        Axios.get('/user/task/openaccount')
        .then(function (response) {
            if(response.data.data.length >= 0){
                that.setState({ 
                    data: 1,
                });
            }else{
                that.setState({ 
                    data: 2,
                    handTrueAccount: true
                });
            }
        })
        this.props.accounts.map(item=>{
            if(item.host.type == '1'){
                that.setState({ 
                    handTrueAccount: true
                });
            }
            if(item.host.type == '0'){
                that.setState({ 
                    handSimulationAccount: true
                });
            }
        })
    }
    pushNewAccount = () =>{
        const that = this;
        Axios.get('/user')
        .then(function (response) {
            let data = []
            data = response.data.data
            if(data.mobile === '' ){
                that.setState({
                    page: '2',
                    msg: '下一步'
                })
            }
            else if(data.email === '' ){
                that.setState({
                    page: '2',
                    msg: '下一步'
                })
            }
            else{
                if(that.state.handTrueAccount == true){
                    Axios.post('/user/account/opensame',{
                        data:'1231231'
                    })
                    .then(function (response) {
                        message.success('开户成功')
                        that.props.handleState('1')
                    })
                    .catch(function (error){
                        message.warning(error.response.data.message)
                    })
                }else{
                    that.props.handleState('13')
                }
                
            }
        })
        
    }
    changePage = () =>{
        this.setState({
            page: '2',
        })
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    simulation = () =>{
        const that = this;
        if(this.state.type == '1'){
            Axios.post('/user/account/opensimulation',{
                nickname:this.state.name,
                mobile:this.state.mobile,
                mobile_prefix: '+86',
                nickname:this.state.name,
                code: this.state.code,
                // address: this.state.address,
                country: '1',
            })
            .then(function (response) {
                message.success('成功！');
                if(that.state.msg === '下一步'){
                    that.props.handleState('13')
                }else{
                    that.props.handleState('1')
                }
            }).catch(function (error) {
                message.warning(error.response.data.message);
            });
            
        }else{
            Axios.post('/user/account/opensimulation',{
                nickname:this.state.name,
                email:this.state.email,
                nickname:this.state.name,
                // address: this.state.address,
                code: '1233',
                country: '1',
            })
            .then(function (response) {
                message.success('成功！');
                if(that.state.msg === '下一步'){
                    that.props.handleState('13')
                }else{
                    that.props.handleState('1')
                }
            }).catch(function (error) {
                message.warning(error.response.data.message);
            });
            
        }
       
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
    clickMsnCode = (type) => {
        const that = this;
        if(type == 'phone'){
            if(that.state.mobile.length !== 11){
                return swal('请输入正确的手机号码')
            }
            Axios.post('/passport/sendcode', {
            "mobile":that.state.mobile,
            "mobile_prefix":"+86",
            "ckey":that.state.key,
            "captcha":that.state.sendcode,
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
        // else{
        //     Axios.post('/passport/sendmailcode', {
        //         "email":that.state.email,
        //     })
        //     .then(function (response) {
        //     that.setState({ 
        //         sendcodeMsg:'1分钟后重新获取验证码',
        //     });
        //     setTimeout(function(){
        //         that.setState({ 
        //         sendcodeMsg:'点击获取验证码',
        //         });
        //     },60000)
        //     })
        //     .catch(function (error) {
        //         swal('错误');
        //     });
        // }
    };
    render() {
        const { classes } = this.props;
        const { mobile, email, name, mobile_prefix, type, handTrueAccount, handSimulationAccount} = this.state;
        const InputGroup = Input.Group;
        // console.log(this.props.accounts)
        // console.log(this.state.page)
        return (
            <div>
                {
                this.state.page == '1' &&
                <div>
                    <div className={classes.root}>
                        <h2>选择需要开通的交易账户</h2>
                    </div>
                    <div className={classes.centerLine}></div>
                    <div className={classes.box}>
                        <div className={classes.title}>
                            <div className={classes.left}>
                                <img src={Logo} />
                            </div>
                            <span>GQFX MT4</span>
                        </div>
                        <div className={classes.right}>
                            {this.state.data == 2 && <span style={{color: '#999',fontSize: 13}}>真实账户审核中，请勿重复申请真实开户</span>}
                            <Button disabled={this.state.data == 2 ? true : false} type="primary" onClick={this.pushNewAccount}>真实账户</Button>
                            {/* <Button>绑定账户</Button> */}
                            {handTrueAccount == false && handSimulationAccount == false && <Button onClick={this.changePage}>模拟账户</Button>}
                        </div>
                    </div>
                    <div className={classes.centerLine}></div>
                </div>
                }
                {
                this.state.page == '2' &&
                <div>
                    <div className={classes.centerTop}>
                        <div className={classes.centerTopLeft}>
                            <div className={classes.left}>
                                <img src={Logo} />
                            </div>
                            <div>
                                <h2>完善资料</h2>
                                <h3>如实填写个人信息是核实您真实身份，保障您资金和账号安全，隐私信息的重要依据。</h3>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className={classes.centerLine}></div>
                    <InputGroup className={classes.group}>
                        <Col span={2} className={classes.col}>
                        <span>
                            <span style={{color: 'red'}}>*</span>设置昵称:
                        </span>
                        </Col>
                        <Col span={5}>
                            <Input
                            value={name}
                            onChange={this.handleChange('name')}
                            />
                        </Col>
                    </InputGroup> 
                    <InputGroup className={classes.group}>
                        <Col span={2} className={classes.col}>
                        <span>
                        <span style={{color: 'red'}}>*</span>绑定电话:
                        </span>
                        </Col>
                        <Col span={5}>
                            <Input
                            placeholder={type == '1'?mobile:mobile.slice(0,3)+'******'+mobile.substring(mobile.length-3)}
                            onChange={this.handleChange('mobile')}
                            addonBefore={mobile_prefix}
                            readOnly={type == '1'?false:true}
                            />
                        </Col>
                    </InputGroup>
                    {type == '1' &&
                    <InputGroup className={classes.group}>
                        <Col span={2} className={classes.col}>
                        <span>
                            <span style={{color: 'red'}}>*</span>图片验证码：
                        </span>
                        </Col>
                        <Col span={5}>
                            <Input
                            placeholder='请输入右边验证码'
                            onChange={this.handleChange('sendcode')}
                            />
                        </Col>
                        <Col span={5}>
                            <img onClick={() => this.clickSendCode()} src={this.state.img} style={{height: 32,}} />
                        </Col>
                    </InputGroup>}
                    {type == '1' &&
                    <InputGroup className={classes.group}>
                        <Col span={2} className={classes.col}>
                        <span>
                            <span style={{color: 'red'}}>*</span>验证码:
                        </span>
                        </Col>
                        <Col span={5}>
                            <Input
                            placeholder='验证码'
                            onChange={this.handleChange('code')}
                            />
                        </Col>
                        {
                        <Col span={5}>
                            <Button onClick={type == '1' ?() => this.clickMsnCode('phone'):() => this.clickMsnCode('email')}>
                                {this.state.sendcodeMsg}
                            </Button>
                        </Col>}
                    </InputGroup>}
                    <InputGroup className={classes.group}>
                        <Col span={2} className={classes.col}>
                        <span>
                            <span style={{color: 'red'}}>*</span>绑定邮箱:
                        </span>
                        </Col>
                        <Col span={5}>
                            <Input
                            value={email}
                            onChange={this.handleChange('email')}
                            readOnly={type == '1' ? true : false}
                            />
                        </Col>
                    </InputGroup>
                    
                    {/* <InputGroup className={classes.group}>
                        <Col span={2} className={classes.col}>
                        <span>
                            <span style={{color: 'red'}}>*</span>绑定地址:
                        </span>
                        </Col>
                        <Col span={5}>
                            <Input
                            value={address}
                            onChange={this.handleChange('address')}
                            />
                        </Col>
                    </InputGroup> */}
                    <InputGroup className={classes.group}>
                        <Col span={2} className={classes.col}>
                            <Button type="primary" onClick={this.simulation}>{this.state.msg}</Button>
                        </Col>
                    </InputGroup>
                </div>
                }
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(CreateAccount));