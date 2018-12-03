import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Button, Table, Divider, } from 'antd';


const styles = theme => ({
    root: {
        width: '60%',
        margin: '50px auto',
        
    },
    centerTop:{
        display: 'flex',
        justifyContent: 'space-between',
    },
    centerTopLeft:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
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
            float: 'left',
            display: 'inline-block',
            marginBottom: 30,
        },
        '& h5':{
            fontSize: 12,
            color: '#333',
            fontWeight: 'normal',
            float: 'right',
            display: 'inline-block',
        },
        '& h3':{
            fontSize: 12,
            color: '#999',
            fontWeight: 'normal',
            marginTop: 10,
        },
    },
    tableFooter:{
        marginRight: 930,
    },
    centerLine:{
        width: '100%',
        height: 1,
        background: '#eceff0',
        margin: '27px 0',
    },
    newSpan:{
        color: '#00a3fe',
        cursor: 'pointer',
    }
})


class Transfer extends Component {
    constructor(props){        
        super(props)  
        
    };
    state = {
        isDisabled:this.props.disabled == ''? [
            {value:this.props.isLogin,index:0},
            {value:this.props.isLogin,index:1},
            {value:this.props.isLogin,index:2},
            {value:this.props.isLogin,index:3},
            {value:this.props.isLogin,index:4},
            {value:this.props.isLogin,index:5},
            {value:this.props.isLogin,index:6},
            {value:this.props.isLogin,index:8},
            {value:this.props.isLogin,index:9},
            {value:this.props.isLogin,index:10},
            {value:this.props.isLogin,index:11},
            {value:this.props.isLogin,index:12},
            {value:this.props.isLogin,index:13},
            {value:this.props.isLogin,index:14},
            {value:this.props.isLogin,index:15},
            {value:this.props.isLogin,index:16},
            {value:this.props.isLogin,index:17},
            {value:this.props.isLogin,index:18},
            {value:this.props.isLogin,index:19},
            {value:this.props.isLogin,index:20},
        ]:this.props.disabled,
        accounts: [],
    };  

    
    componentWillMount = () => {
        const that = this;
        const key = JSON.parse(sessionStorage.getItem('key'));
        this.setState ({
          key: key,
        })
        Axios.get('/user/accounts')
        .then(function (response) {
            that.setState ({
                accounts: response.data.data,
            })
        })
    }
    
    handleChange = (name) => event =>{

    }

    onChange(date, dateString) {

        console.log(date, dateString);

    }

    handleCheckedChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    footer = (classes,balance) =>{
        return <div><span className={classes.tableFooter}>合计</span><span>{balance}</span></div>
    };
    pushNewAccount = () =>{
        this.props.handleState('4')
    }
    newSpan = index => () =>{
        this.props.handleState('8')
        // this.setState({
        //     ['isDisabled'+index]: true,
        //     isDisabled: true
        // })
        this.props.changeAccountsIndex(index)
    }
    changeDisabled = index =>() =>{
        const data = this.state.isDisabled.map(v => {
            if (v.index == index) {
                v.value = true
            }else{
                v.value = false
            }
            return v
        });
        this.setState({
            isDisabled: data
        })
        this.props.isDisabled(this.state.isDisabled)
        this.props.changeAccountsIndex(index)
        this.props.handleState('7')
    }
    render() {
        const { classes } = this.props;
        const { time } = this.props;
        const { accounts } = this.state;
        const columnsOne = [{
            title: '帐户类型',
            dataIndex: 'host.type',
            key: 'type',
            align: 'center',
            render:(text) => (
                <span>
                    {text == '0' ? '模拟账户': '真实账户'}
                </span>
            )
            },{
            title: '平台名称',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text, record) => (<span>GQFX MT4</span>),
            }, {
            title: '帐户名',
            dataIndex: 'mt4.name',
            key: 'name',
            align: 'center',
            }, {
            title: '账号',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            },{
            title: '结算货币',
            render:(text) => (
                <span>USD</span>
            ),
            key: 'currency',
            align: 'center',
            },{
            title: '帐户余额',
            dataIndex: 'mt4.balance',
            key: 'balance',},{
            title: '',
            dataIndex: '',
            align: 'right',
            key: 'btn',
            render:(text, record, index) => (
                <span>
                  {record.host.type == '1' && <span style={{color: '#00a3fe',cursor: 'pointer',}} onClick={this.newSpan(index)}>立刻入金</span>}
                  {record.host.type == '1' && <Divider type="vertical" />}
                  <Button key={index} type='primary' disabled={this.state.isDisabled[index].value} onClick={this.changeDisabled(index)}>{this.state.isDisabled[index].value == true?'已登录':'请登录'}</Button>
                </span>
            )},
        ];
        
        return (
            <div>
                <div className={classes.centerTop}>
                    <div className={classes.centerTopLeft}>
                        <h2>欢迎登录</h2>&nbsp;&nbsp;&nbsp;&nbsp;
                        <h3>上次登录：{time}</h3>
                    </div>
                    <div className={classes.centerTopRight}>
                        <button onClick={this.pushNewAccount}>
                            立即开户
                        </button>
                    </div>
                </div>
                <div className={classes.centerLine}></div>
                <div className={classes.centerMiddle}>
                    <div className={classes.centerMiddleLeft}>
                        <h2>用户</h2>
                        <h5>帐户余额为本次登录时间同步结果, 详细实时净值数据请登录交易平台查看</h5>
                    </div>
                    <div className={classes.centerMiddleRight}>
                        {accounts == [] ?
                            <Table key='123' locale={{emptyText: '您还没有交易帐户，立即开立帐户'}} columns={columnsOne} />:
                            // <Table key='123' dataSource={accountsArr} columns={columnsOne} footer={() => this.footer(classes,balance)}/>
                            <Table key='123' dataSource={accounts} columns={columnsOne}/>
                        }
                    </div>
                </div>
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(Transfer));