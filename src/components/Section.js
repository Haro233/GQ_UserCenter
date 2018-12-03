import React, { Component } from 'react';
import '../styles/Login.scss';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Select,Tabs,Input,Checkbox,Button,message } from 'antd';
import Axios from 'axios';
import swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  section:{
    textAlign: 'center',
    height: 550,
    width: 360,
    margin: '0 auto',
    background: '#fff',
    padding: '45px 25px',
    borderRadius: 5,
    border: '1px solid #ccc',
    boxShadow: '0 0 8px 0 rgba(4, 0, 0, 0.3)',
    boxSizing: 'border-box',
  },
  root: {
    margin: '0 auto',
  },
  appBar:{
    boxShadow: 'none',
  },
  flexContainer:{
    '& button':{
      borderBottom:'1px solid #ccc',
    }
  },
  login:{
    display: 'flex',
  },
  formControl:{
    marginBottom: 25,
    '& select':{
      fontSize: 12,
      '&:focus':{
        background: '#fff',
        borderRadius: 6,
        border: '1px solid #ccc',
      },
      '& option':{
        background: '#fff',
        borderRadius: 6,
        border: '1px solid #ccc',
      },
    },
    
    
  },
  nativeSelectRoot:{
    '& MuiTypography-root':{
      padding: 0,
    }
  },
  input:{
    float: 'left',
    width: '100%',
    border: '1px solid #ccc',
    marginBottom: 25,
    borderRadius: 5,
    padding: '5px 10px',
    boxSizing: 'border-box',
    fontSize: 12,

  },
  rememberMe:{
    float: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
    '& span':{
      color: '#00a8a6',
      fontSize: 12,
      cursor: 'pointer',
    }
  },
  button: {
    color: '#fff',
    backgroundColor: '#00a8a6',
    '&:hover': {
      backgroundColor: '#4dc2c1',
      color: '#fff',
    },
    marginBottom: 25,
  },
  other:{
    marginBottom: 25,
    width: '100%',
    height: 30,
    display: 'flex',
    alignItems: 'center',
    '& h5':{
      fontSize: 14,
      width: 52,
      color: '#999999',
      textAlign: 'center',
      background: '#fff',
      fontWeight: 500,
    },
    '& i':{
      flex: 1,
      height: 1,
      borderBottom: '1px solid #ccc',
    }
  },
  freeRegister:{
    color: '#00a8a6',
    fontSize: 14,
    cursor:'pointer',
  },
  tabs:{
    marginBottom: 35,
  },
  tabsMsg:{
    fontSize: 12,
    float: 'left',
  },
  tabsClick:{
    color: '#00a8a6',
    fontSize: 12,
    float: 'right',
    cursor:'pointer',
  },
  backToLogin:{
    display: 'flex',
    justifyContent: 'center',
    '& span':{
      fontSize: 12,
    },
    '& div':{
      color: '#00a8a6',
      fontSize: 12,
      cursor:'pointer',
    }
  },
  freeRegisterSelectMenu:{
    minWidth: 308,
    marginBottom: 25,
    border: '1px solid #ccc',
    padding: '5px 10px',
    boxSizing: 'border-box',
    borderRadius: 5,
    fontSize: 12,
  },
  justRegister:{
    color: '#00a8a6',
    fontSize: 14,
    cursor:'pointer',
  },
  sendcodeInput:{
    float: 'left',
    border: '1px solid #ccc',
    marginBottom: 25,
    borderRadius: 5,
    padding: '5px 10px',
    boxSizing: 'border-box',
    fontSize: 12,

  },
  sendcodeButton: {
    
  },
  box:{
    '& MuiInputBase-root':{
      width: '100%',
    }
  },
  msncodeBox:{
    display: 'flex',
    width: '100%',
  },
  msncodeInput:{
    float: 'left',
    border: '1px solid #ccc',
    marginBottom: 25,
    borderRadius: 5,
    padding: '5px 10px',
    boxSizing: 'border-box',
    fontSize: 12,
    flex: 1,
    width: '10%',
  },
  msncodeButton: {
    color: '#fff',
    flex: 2,
    backgroundColor: '#00a8a6',
    '&:hover': {
      backgroundColor: '#4dc2c1',
    },
    marginBottom: 25,
    marginLeft: 20,
  },
  
});

class Section extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    flge: 0,
    type: 1,
    PtType: '',
    kind: '',
    checked: false,
    loginPhone: '',
    registerPhone: '',
    loginPassword: '',
    registerPassword: '',
    value: 0,
    msg: '手机注册',
    click: '换成邮箱注册',
    changeTabsClick: 0,
    freerKind: '',
    loginAccount: '',
    registerAccount: '',
    loginName: '',
    registerName: '',
    loginEmail: '',
    registerEmail: '',
    sendcode: '',
    sendcodeMsg: '点击获取短信验证码',
    sendEmailcodeMsg: '点击获取邮箱验证码',
    emailSendcode: '',
    key: '',
    img: '',
    captcha: '',
    msncode: '',
    PAE: '1',
    flge2: 0,
    count: 60,
    count2: 60,
  };

  componentDidMount(){
    const that = this;
    Axios.get('/captcha')
    .then(function (response) {
      that.setState({ 
        img:response.data.data.img,
        key: response.data.data.key,
      });
    })
  }
  componentWillMount(){
    const userMsg = JSON.parse(sessionStorage.getItem('userMsg'));
    if(userMsg != null){
      this.setState ({
        loginPhone: userMsg.mobile,
        loginEmail: userMsg.email,
        loginPassword: userMsg.password,
      })
    }
    
  }

  handleTabsChange = (event, value) => {
    this.setState({ value });
  };
  handleSelectChange = type => event => {
    this.setState({ 
      [type]: event.target.value,
      loginPhone: '',
      loginPassword: '',
      loginEmail: '', 
    });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleCheckedChange = (event) => {
    const that = this;
    this.setState({ checked: event.target.checked });
    if(that.state.checked === false){
      const userMsg = {
        mobile:that.state.loginPhone,
        password:that.state.loginPassword,
        email:that.state.loginEmail,
      };
      sessionStorage.setItem('userMsg', JSON.stringify(userMsg));
    }else{
      sessionStorage.removeItem('userMsg')
    }
  };
  handleChange_1 = name => event => {
    this.setState({ [name]: event});
    localStorage.removeItem('phone','password','email')
    sessionStorage.removeItem('userMsg')
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value});
  };
  clickJustRegister () {
    const that = this;
    let data ={};
    const a = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
    // console.log(a.test('5465422'))
    if(a.test(this.state.registerPassword) === true){
      if(that.state.registerEmail == ''){
        data = {
          "mobile":that.state.registerPhone,
          "password":that.state.registerPassword,
          'code':that.state.msncode,
          'name':that.state.registerName,
          'mobile_prefix': '+86'
        }
      }
      else{
        data = {
          "password":that.state.registerPassword,
          'code':that.state.msncode,
          'name':that.state.registerName,
          'email':that.state.registerEmail,
        }
      }
      Axios.post('/passport/register', data)
      .then(function (response) {
        message.success('注册成功')
        if(that.state.registerEmail == ''){
          data = { 
            "loginname":"+86"+that.state.registerPhone,
            "password":that.state.registerPassword,
          }
        }
        else{
          data = { 
            "loginname":that.state.registerEmail,
            "password":that.state.registerPassword,
          }
        }
        Axios.post('/passport/login', data)
        .then(function (response) {
          const info = {
            access_token: response.data.data.access_token,
            expires_in: response.data.data.expires_in,
            refresh_token: response.data.data.refresh_token,
            token_type: response.data.data.token_type,
          };
          sessionStorage.setItem('key', JSON.stringify(info));
          that.props.history.push('/User');
        })
      })
      .catch(function (error) {
        message.warning(error.response.data.message)
      });
    }
    else{
      message.warning('密码格式错误');
    }
  };
  backToLogin () {
    this.setState({ value: 0 });
  }
  clickChangeRegister (val) {
    if(val === 0){
      this.setState({ 
        changeTabsClick: 1,
        msg: '邮箱注册',
        click: '换成手机注册',
        registerPhone: '',
        registerPassword: '',
        registerName: '',
      });
    }
    if(val === 1){
      this.setState({ 
        changeTabsClick: 0,
        msg: '手机注册',
        click: '换成邮箱注册',
        registerEmail: '',
        msncode: '',
      });
    }
  }
  clickLogin = () => {
    const that = this;
    let data = {}
    if(that.state.PAE == '2'){
      data = { 
        "loginname":that.state.loginEmail,
        "password":that.state.loginPassword,
      }
    }
    else{
      data = { 
        "loginname":"+86"+that.state.loginPhone,
        "password":that.state.loginPassword,
      }
    }
    Axios.post('/passport/login', data)
    .then(function (response) {
      const info = {
        access_token: response.data.data.access_token,
        expires_in: response.data.data.expires_in,
        refresh_token: response.data.data.refresh_token,
        token_type: response.data.data.token_type,
      };
      sessionStorage.setItem('key', JSON.stringify(info));
      if(that.state.checked == true){
        const userMsg = {
          mobile:that.state.loginPhone,
          password:that.state.loginPassword,
          email:that.state.loginEmail,
        };
        sessionStorage.setItem('userMsg', JSON.stringify(userMsg));
      }
      that.props.history.push('/User');
    })
    .catch(function (error) {
      message.warning(error.response.data.message);
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
  clickMsnCode () {
    const that = this;
    if(this.state.flge === 0){
      if(that.state.registerPhone.length !== 11){
        return swal('请输入正确的手机号码')
      }
      Axios.post('/passport/sendcode', {
        "mobile":that.state.registerPhone,
        "mobile_prefix":"+86",
        "ckey":that.state.key,
        "captcha":that.state.sendcode,
      })
      .then(function (response) {
        let count2 = that.state.count2;
        const timer = setInterval(() => {
          that.setState({ 
            count2: (count2--), 
             flge: 1,
             sendcodeMsg: count2+'秒后重新获取验证码',
          });
          if (count2 === 0) {
            clearInterval(timer);
            that.setState({
              flge: 0 ,
              sendcodeMsg:'点击获取验证码',
              count2: 60
            })
         }
        }, 1000)
      })
      .catch(function (error) {
        message.warning(error.response.data.message);
      });
    }else{
      message.warning('请勿重复获取验证码')
    }
    
  };
  clickEmailCode = () =>{
    const that = this;
    if(this.state.flge2 === 0){
      Axios.post('/passport/sendmailcode', {
        "email":that.state.registerEmail,
      })
      .then(function (response) {
        let count = that.state.count;
        const timer = setInterval(() => {
          that.setState({ 
             count: (count--), 
             flge2: 1,
             sendEmailcodeMsg: count+'秒后重新获取验证码',
          });
          if (count === 0) {
            clearInterval(timer);
            that.setState({
              flge2: 0 ,
              sendEmailcodeMsg:'点击获取验证码',
              count: 60
            })
         }
        }, 1000)
      })
      .catch(function (error) {
        swal('邮箱错误或已经注册');
      });
    }else{
      swal('请勿重复获取验证码')
    }
  }
  handleInputChange = name => event => {
    if(name == 'loginPhone'){
      this.setState({
        PAE: '1',
      })
    }
    if(name == 'loginEmail'){
      this.setState({
        PAE: '2',
      })
    }
    this.setState({
      [name]: event.target.value
    });
  }
  render() {
    const { classes } = this.props;
    const TabPane = Tabs.TabPane;
    const Option = Select.Option;
    return (
      <div className={classes.section}>
        { this.state.value !== 2 &&
          <div className={classes.root}>
            <Tabs defaultActiveKey='1' className={classes.appBar}>
                <TabPane tab="登录"  
                  key="1"
                  selected={false}
                >
                  <div className={classes.login}>
                    <Select
                      className={classes.formControl}
                      defaultValue={this.state.type}
                      onChange={this.handleChange_1('type')}
                      kind="type"
                      classes={
                        classes.selectMenu
                      }
                    >
                      <Option value={1}>手机号登录</Option>
                      <Option value={3}>邮箱登录</Option>
                    </Select>
                  </div>
                  {
                    this.state.type == 1 &&
                    <div>
                      <Input
                        placeholder="手机号"
                        value={this.state.loginPhone}
                        className={classes.input}
                        onChange={this.handleInputChange('loginPhone')}
                      />
                    </div>
                  }
                  {
                    this.state.type == 3 &&
                      <div>
                        <Input
                          placeholder="邮箱"
                          value={this.state.loginEmail}
                          className={classes.input}
                          onChange={this.handleInputChange('loginEmail')}
                        />
                      </div>
                  }
                      <Input
                          placeholder="密码"
                          className={classes.input}
                          value={this.state.loginPassword}
                          onChange={this.handleInputChange('loginPassword')}
                          type={'password'}
                          onPressEnter={this.clickLogin} 
                      />
                      <div className={classes.rememberMe}>
                        <Checkbox
                          value={this.state.checked}
                          onChange={this.handleCheckedChange}
                        >
                        记住我
                        </Checkbox>
                        <span>忘记密码？</span>
                      </div>
                      <Button onClick={this.clickLogin} block className={classes.button}>
                        登录
                      </Button>
                </TabPane>
                <TabPane tab="免费注册" 
                  key="2"
                  selected={false}
                >
                  <div className={classes.tabs}> 
                    <span className={classes.tabsMsg}>{this.state.msg}</span>
                    <span className={classes.tabsClick} onClick={() => this.clickChangeRegister(this.state.changeTabsClick) }>{this.state.click}</span>
                  </div>
                  {
                    this.state.changeTabsClick === 0 &&
                    <div>
                      <Input
                        placeholder="手机号"
                        value={this.state.registerPhone}
                        className={classes.input}
                        onChange={this.handleChange('registerPhone')}
                        inputProps={{
                          'aria-label': 'Description',
                        }}
                        type={'phone'}
                      />
                      <Input
                        placeholder="真实姓名"
                        value={this.state.registerName}
                        onChange={this.handleChange('registerName')}
                        className={classes.input}
                        inputProps={{
                          'aria-label': 'Description',
                        }}
                      />
                      <Input
                        placeholder="密码必须6-15位，由数字字母（大小写均可）组成"
                        className={classes.input}
                        value={this.state.registerPassword}
                        onChange={this.handleChange('registerPassword')}
                        type={'password'}
                      />
                        <img onClick={() => this.clickSendCode()} src={this.state.img} className={classes.sendcodeButton} style={{ width: '35%' }}></img>
                        <Input
                          placeholder="验证码"
                          className={classes.sendcodeInput}
                          value={this.state.sendcode}
                          onChange={this.handleChange('sendcode')}
                          style={{ width: '60%' }}
                        />
                      <div className={classes.msncodeBox}>
                        <Input
                          placeholder="短信验证码"
                          className={classes.msncodeInput}
                          value={this.state.msncode}
                          onChange={this.handleChange('msncode')}
                        />
                        <Button className={classes.msncodeButton} onClick={() => this.clickMsnCode()}>
                          {this.state.sendcodeMsg}
                        </Button>
                      </div>
                      <Button block className={classes.button} onClick={() => this.clickJustRegister() }>
                        注册并开立交易账户
                      </Button>
                    </div>
                  }
                  {
                    this.state.changeTabsClick === 1 &&
                    <div>
                      <Input
                        placeholder="邮箱"
                        value={this.state.registerEmail}
                        onChange={this.handleChange('registerEmail')}
                        className={classes.input}
                        type={'email'}
                      />
                      <Input
                        placeholder="真实姓名"
                        value={this.state.registerName}
                        onChange={this.handleChange('registerName')}
                        className={classes.input}
                      />
                      <div className={classes.msncodeBox}>
                        <Input
                          placeholder="邮箱验证码"
                          className={classes.msncodeInput}
                          value={this.state.emailSendcode}
                          onChange={this.handleChange('emailSendcode')}
                        />
                        <Button className={classes.msncodeButton} onClick={this.clickEmailCode}>
                          {this.state.sendEmailcodeMsg}
                        </Button>
                      </div>
                      <Input
                        placeholder="密码必须6-15位，由数字字母（大小写均可）组成"
                        className={classes.input}
                        value={this.state.registerPassword}
                        onChange={this.handleChange('registerPassword')}
                        type={'password'}
                      />
                      
                      <Button block className={classes.button} onClick={() => this.clickJustRegister() }>
                        注册并开立交易账户
                      </Button>
                    </div>
                  } 
                </TabPane>
            </Tabs>
          </div>
        }
      </div>
    );
  }
}

Section.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })  (withRouter(Section));

