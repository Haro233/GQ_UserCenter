import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import ChangeUserMsg from './ChangeUserMsg';
import AllInput from './AllInput';
import TransactionReport from './TransactionReport';
import Transfer from './Transfer';
import TransferAccounts from './TransferAccounts';
import CapitalFlow from './CapitalFlow';
import CreateAccount from './CreateAccount';
import Logo from '../images/58977.jpg';
import Income from './Income';
import Basic from './Basic';
import ChangePassword from './ChangePassword';
import CenterAuthentication from './CenterAuthentication';
import {message} from 'antd';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: '24px 0px' }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};




const styles = theme => ({
    right:{
        
    },
    root: {
        flexGrow: 1,
        backgroundColor: '#fff', 
        color: '#000',
        '& h2':{
            marginBottom: 20,
        }
    },
    appBar:{
        boxShadow: 'none',
        color: '#000',
        borderBottom:'1px solid #ccc',
    },
    tab:{
        color: '#000',
        '&:hover':{
            color: '#0085cc',
        }
    },
    indicator:{
        backgroundColor: '#00a3fe',
    },
    setUserMsg:{
        '& li':{
            marginBottom: 30,
            display: 'flex',
        },
        '& span':{
            width: 70,
            textAlign: 'right',
            display: 'inline-block',
        },
        '& h5':{
            display: 'inline-block',
            marginLeft: 20,
        },
    },
    Menu:{
        height: 930,
        width: '100%',
        display: 'flex',
        color: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        paddingTop: 70,
    },
    right:{
        height: '100%',
        flex:3,
        background: 'rgb(241, 244, 249)', 
        boxSizing: 'border-box',
        padding: 20,
    },
    center:{
        height: '100%',
        overflowX: 'auto',
        width: '100%',
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: 4,
        boxSizing: 'border-box',
        padding: 30,
        overflowY: 'auto',
        overflowX: 'auto',
    },
    centerLine:{
        width: '100%',
        height: 1,
        background: '#eceff0',
        margin: '27px 0',
    },
    
    
    load:{
        '&:hover':{
            boxShadow: '0 0 10px rgba(1, 1, 1, 0.1)',
        }
    },
    downLoad:{
        display: 'flex',
        justifyContent: 'space-between',
        '& h2':{
            fontSize: 14,
            fontWeight: 400,
        },
    },
    
    col:{
        textAlign: 'right',
        height: 32,
        lineHeight: '32px',
        marginBottom: 15,
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
    logoPic:{
        width: 78,
        height: 78,
        overflow: 'hidden',
        borderRadius: '50%',
        display: 'flex',
        verticalAlign: 'middle',
        border: '1px solid #eceff0',
        alignItems: 'center',
        '& img':{
            width: '100%',
        }
    }
})


class UserList extends Component {
    constructor(props){        
        super(props)  
        this.state = {
            key: {},
            flge: false,
            willFlge: false,
            userData: {},
            name: '',
            info: {},
            userMsg: {},
            userMsgValue: 0,
            accountValue: 0,
            setMsg: false,
            sex: '0',
            province: [],
            provinceId: 1,
            provinceName: '北京市',
            city: [],
            cityId: 1,
            cityName: '北京市',
            address: '',
            email: '',
            mobile: '',
            accounts: [],
            queryType: '0',
            accountsIndex: '0',
            handTrueAccount: false,
            isDisabled: '',
        };       
    };
    
    componentWillMount = () => {
        const key = JSON.parse(sessionStorage.getItem('key'));
        this.setState ({
          key: key,
        })
        const that = this;
        if(this.state.willFlge == false){
            Axios.get('/user')
            .then(function (response) {
                if(response.status == 200){
                    const data = response.data.data;
                    const customer = response.data.data.customer;
                    if(customer != null){
                        if(customer.info == null){
                            that.setState ({
                                userData: data,
                                email: data.email,
                                mobile: data.mobile,
                                name: data.name,
                            })
                        }else{
                            that.setState ({
                                userData: data,
                                info: customer.info,
                                address: customer.info.address,
                                email: data.email,
                                mobile: data.mobile,
                                name: data.name,
                            })
                        }
                        
                    }else{
                        that.setState ({
                            userData: data,
                            email: data.email,
                            mobile: data.mobile,
                            name: data.name,
                        })
                    }
                }
            })
            .catch(function (error) {
                message.warning(error.response.data.message);
                that.props.history.push('/Login');
            });
            Axios.get('/user/accounts')
            .then(function (response) {
                const data = response.data.data;
                that.setState ({
                    accounts: data,
                })
                data.map(item =>{
                    if(item.host.type == '1'){
                        that.setState ({
                            handTrueAccount: true,
                        })
                    }
                })
            })
        }
            
    }   
 
    userMsgValueChange = (event, value) => {
        this.setState({ userMsgValue: value });
    };

    accountValueChange = (event, value) => {
        this.setState({ accountValue: value });
    };
   
    changeUserAccountMsg = () =>{
        const that = this;
        if(this.state.setMsg == true){
            that.setState({ setMsg: false });
        }else{
            that.setState({ setMsg: true });
        }
    };

    


    changeData=(date, dateString) => {
        // console.log(date, dateString);
    };
    changeAccountsIndex = (event) =>{
        this.setState({
            accountsIndex: event
        })
    }
    isDisabled = (event) =>{
        this.setState({
            isDisabled: event
        })
    }

    handleCheckedChange = name => event => {
        const that = this;
        if(event.target.checked == true){
            that.setState({ 
                [name]: event.target.checked,
            });
        }else{
            that.setState({ 
                [name]: event.target.checked,
            });
        }
        
    };
    
     render() {
        const { classes } = this.props;
        const { province } = this.state;
        const { userData, handTrueAccount } = this.state;
        const { accountsIndex, accounts } = this.state;
        const { city } = this.state;
        let provinceArr = []
        let cityArr = []
        for (let i in province) {
            provinceArr.push(province[i])
        }
        for (let i in city) {
            cityArr.push(city[i])
        }
        
        // console.log(this.props.handleState)      
        
        return (
            <div className={classes.right}>
                <div className={classes.center}>
                    {
                    this.props.type == '1' &&
                        <Basic time={userData.logined_at} handleState={this.props.handleState} isLogin={this.props.isLogin} changeAccountsIndex={this.changeAccountsIndex} disabled={this.state.isDisabled} isDisabled={this.isDisabled} />
                    }
                    {
                    this.props.type == '2' &&
                        <div>
                            <div className={classes.root}>
                                <h2>用户资料</h2>
                                <ChangeUserMsg data={userData} />
                            </div>
                        </div>
                    }
                    {/* {
                    this.props.type == '3' &&
                    <AllInput handleState={this.props.handleState} data={userData} pageType={2}/>
                    } */}
                    {
                    this.props.type == '13' &&
                        <div>
                            <div className={classes.centerTop}>
                                <div className={classes.centerTopLeft}>
                                    <div className={classes.logoPic}><img src={Logo}/></div>
                                    <div>
                                        <h2>GQFX MT4</h2>
                                        <h3>请认真填写以下信息，开户成功通过之后我们会将结果发送至您的邮箱。</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.centerLine}></div>
                            <CenterAuthentication handleState={this.props.handleState} />
                        </div>
                    }
                    {
                    this.props.type == '4' &&
                        <div>
                            <CreateAccount handTrueAccount={handTrueAccount} accounts={accounts} data={userData} handleState={this.props.handleState} />
                        </div>                        
                    }
                    {
                    this.props.type == '7' &&
                        <div style={{width: 1720}}>
                            <div className={classes.root}>
                                <h2>交易报表</h2>
                            </div>
                            <div className={classes.centerLine}></div>
                            <TransactionReport/>
                        </div>
                    }
                    {
                    this.props.type == '12' &&
                        <div className={classes.load}>
                            <div className={classes.centerLine}></div>
                                <div className={classes.downLoad}>
                                    <h2>PC版客户端MT4</h2>
                                    <a href="https://download.mql5.com/cdn/web/gq.capital.inc/mt4/gqcapital4setup.exe" >Windows版MT4</a>
                                </div>
                            <div className={classes.centerLine}></div>
                        </div>
                    }
                    {
                    this.props.type == '8' &&
                        <div>
                            <div className={classes.root}>
                                <h2>在线入金</h2>
                            </div>
                            <div className={classes.centerLine}></div>
                            <Transfer msg={accounts[accountsIndex]}/>
                                
                        </div>
                    }
                    {
                    this.props.type == '9' &&
                        <div>
                            <div className={classes.root}>
                                <h2>出金申请</h2>
                            </div>
                            <div className={classes.centerLine}></div>
                            <Income msg={accounts[accountsIndex]} handleState={this.props.handleState}/>
                        </div>
                    }
                    {/* {
                    this.props.type == '10' &&
                        <div>
                            <div className={classes.root}>
                                <h2>转账汇款</h2>
                            </div>
                            <div className={classes.centerLine}></div>
                            <TransferAccounts msg={accounts[accountsIndex]}/>
                        </div>
                    } */}
                    {
                    this.props.type == '11' &&
                        <div>
                            <div className={classes.root}>
                                <h2>资金流水</h2>
                            </div>
                            <div className={classes.centerLine}></div>
                            <CapitalFlow msg={accounts} />
                        </div>
                    }
                    {/* {
                    this.props.type == '13' &&
                        <div>
                            <div className={classes.root}>
                                <h2>资金流水</h2>
                            </div>
                            <div className={classes.centerLine}></div>
                            <CapitalFlow msg={accounts} />
                        </div>
                    } */}
                    {
                    this.props.type == '14' &&
                        <div>
                            <div className={classes.root}>
                                <h2>修改密码</h2>
                            </div>
                            <div className={classes.centerLine}></div>
                            <ChangePassword msg={accounts[accountsIndex]}/>
                                
                        </div>
                    }
                </div>
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(UserList));