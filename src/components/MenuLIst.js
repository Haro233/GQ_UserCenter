import React, { Component } from 'react';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { combineReducers } from 'redux';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import UserList from './UserList';

const styles = theme => ({
    Menu:{
        height: '100%',
        width: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        color: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        paddingTop: 70,
    },
    left:{
        minWidth: 200,
        height: '100%',
        display: 'flex',
        // alignItems: 'center',
        background: '#2b333e',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        paddingTop: 20,
        '& img':{
            cursor:'pointer',
        }
    },
    right:{
        height: '100%',
        minWidth: 1500,
        background: 'rgb(241, 244, 249)', 
        boxSizing: 'border-box',
        padding: 20,
    },
    menuList:{
        width: '100%',
    },
    heading: {
        fontSize: 14,
        color: '#7b91b2',
        boxShadow: 'none',
        background: '#2b333e',
    },
    subMenu:{
       '& span':{
        color: '#7b91b2',
       }

    },
    changeHeading:{
        background: '#222932',
        padding: '15px 24px',
        cursor:'pointer',
        '&:hover':{
            borderLeft: '2px solid #00a3fe',
        }
    },
    select:{
        color: '#00a3fe',
        fontSize: 12,
    },
    center:{
        height: '100%',
        width: '100%',
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: 4,
        boxSizing: 'border-box',
        padding: 30,
    },
    centerLine:{
        width: '100%',
        height: 1,
        background: '#eceff0',
        marginTop: 27,
    },
    centerTop:{
        display: 'flex',
        justifyContent: 'space-between',
    },
    centerTopLeft:{
        '& h2':{
            fontSize: 18,
            color: '#333',
            fontWeight: 'normal',
            textAlign: 'left',
        },
        '& h3':{
            fontSize: 12,
            color: '#999',
            fontWeight: 'normal',
            marginTop: 10,
        },
        
    },
    centerTopRight:{
        '& button':{
            color: '#fff',
            background: '#00a3fe',
            borderColor: 'transparent',
            display: 'inline-block',
            fontWeight: 'normal',
            textAlign: 'center',
            verticalAlign: 'middle',
            touchAction: 'manipulation',
            cursor: 'pointer',
            border: '1px solid #d5d5d5 ',
            whiteSpace: 'nowrap',
            fontSize: 14,
            borderRadius: 4,
            transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
            transform: 'translateZ(0)',
            height: 32,
            padding: '0 15px',
            letterSpacing: 1,
        }
    },
    centerMiddleLeft:{
        '& h2':{
            fontSize: 18,
            color: '#333',
            fontWeight: 'normal',
            textAlign: 'left',
        },
        '& h3':{
            fontSize: 12,
            color: '#999',
            fontWeight: 'normal',
            marginTop: 10,
        },
    },
    logout:{
        position: 'fixed',
        bottom: '2%',
        left: '1%',
        transition: 'all 1s',
        '& span':{
            position: 'absolute',
            left: -9,
            top: -38,
            width: 40,
            height: 30,
            background: '#00a3fe',
            textAlign: 'center',
            borderRadius: 5,
            lineHeight: '30px',
            display: 'none',
            opacity: 0,
            
        },
        '&:hover':{
            '& span':{
                display: 'block',
                opacity: 1,
            }
        }
    },
    outline:{
        color: '#7b91b2',
        cursor: 'pointer',
        position: 'fixed',
        bottom: 15,
        left: 15,
    },
    typographyIcon:{
        fontSize: 16,
        paddingTop: 2,
        marginRight: 10,
    },
    title:{
        display: 'flex',
    },
})

class MenuLIst extends Component {
    constructor(props){        
        super(props)         
    };
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
    state = {
        value: '1',
        isLogin: false,
        userData: [],
        accounts: '',
        page: 1,
        openKeys: ['sub1'],
    };
    componentWillMount = () =>{
        const that = this;
        Axios.get('/user')
        .then(function (response) {
            const data = response.data.data;
            that.setState ({
                userData: data,
            })
        })
        Axios.get('/user/accounts')
        .then(function (response) {
            that.setState ({
                accounts: response.data.data,
            })
        })
    }
    changeValue = event =>{
        this.setState({
            value: event.key
        });
    }
    outline = () =>{
        const that = this;
        Axios.get('/passport/logout')
        .then(function (response) {
            sessionStorage.removeItem('key')
            that.props.history.push('/Login');
            that.setState({
                isLogin:false
            })
        });
    }
    handleState = (event) =>{
        this.setState({value: event,page: 1 + this.state.page});
    }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      }
    render() {
        const { classes } = this.props;
        const { userData,accounts } = this.state;
        const SubMenu = Menu.SubMenu;
        return (
            <div className={classes.Menu}>
                <div className={classes.left}>
                    <Menu 
                    // inlineCollapsed={true}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['1']}
                    mode="inline" 
                    onClick={this.changeValue}
                    className={classes.heading}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    theme='dark'
                    >
                        <SubMenu key="sub1" title={<span><Icon type="wallet" theme="outlined" /><span>我的资料</span></span>} className={classes.subMenu} >
                            <Menu.Item key="1" className={classes.select} >
                                账号总览
                            </Menu.Item>
                            <Menu.Item key="2" className={classes.select}>
                                用户资料
                            </Menu.Item>
                            {/* <Menu.Item key="3" className={classes.select}>
                                账户资料
                            </Menu.Item> */}
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="calendar" theme="outlined" /><span>账号管理</span></span>} className={classes.subMenu} >
                            <Menu.Item key="4" className={classes.select} >
                            开立账户
                            </Menu.Item>
                            {
                            userData.customer != null &&
                            <Menu.Item key="7" className={classes.select}>
                            交易报表
                            </Menu.Item>
                            }
                            {
                            userData.customer != null &&
                            <Menu.Item key="14" className={classes.select}>
                            修改密码
                            </Menu.Item>
                            }
                        </SubMenu>
                        {
                        accounts != '' &&  
                        <SubMenu key="sub3" title={<span><Icon type="pay-circle" theme="outlined" /><span>资金管理</span></span>} className={classes.subMenu} >
                            <Menu.Item key="8" className={classes.select} >
                            在线入金
                            </Menu.Item>
                            <Menu.Item key="9" className={classes.select}>
                            出金申请
                            </Menu.Item>
                            {/* <Menu.Item key="10" className={classes.select}>
                            转账汇款
                            </Menu.Item> */}
                            <Menu.Item key="11" className={classes.select}>
                            资金流水
                            </Menu.Item>
                        </SubMenu>
                        }
                        <SubMenu key="sub4" title={<span><Icon type="appstore" theme="outlined" /><span>其他管理</span></span>} className={classes.subMenu} >
                            <Menu.Item key="12" className={classes.select} >
                            相关链接
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className={classes.outline}>
                        <Icon type="logout" theme="outlined" onClick={() => this.outline()} />
                    </div>
                </div>
                <UserList type={this.state.value} handleState={this.handleState} isLogin={this.state.isLogin}/>
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(MenuLIst));