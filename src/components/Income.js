import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Input, Col, Select, Button, message } from 'antd';

const styles = theme => ({
    root: {
        width: '60%',
        margin: '50px auto',
        
    },
    stepsContent:{
        marginBottom: 25,
    },
    col:{
        textAlign: 'right',
        height: 32,
        lineHeight: '32px',
        marginBottom: 15,
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
    dialogContentText:{
        '& span':{
            color: 'red',
        }
    },
    moneyChangeTitle:{
        fontSize: 12,
        color: '#999',
        margin: '37px 0px 18px'
    }
})


class Income extends Component {
    constructor(props){        
        super(props)  
        this.state = {
            moneyChange: '',
            trueMoney: 0.00,
            money: '',
            bank: [],
            bankId: '1',
            bank_number: '',
            bank_mobile: '',
            bank_name: '',
            bank_branch: '',
            bank_swift: '',
            bank_address: '',
            comment: '',
            payee: '',
        };  
    };
    

    
    componentWillMount = () => {
        const that = this
        const { msg } = this.props;
        Axios.get('/exchangerate?type=1&currency='+msg.mt4.currency+'&currency_exchange=CNY')
        .then(function (response) {
            that.setState({
                moneyChange: response.data.data[0].value,
            })
        })
        Axios.get('/banks')
        .then(function (response) {
            that.setState ({
                bank: response.data.data,
            })
        })
    }
    
    handleChange = (name) => event =>{
        const that = this;
        
        if(name == 'money'){
            that.setState({ 
                trueMoney: ((event.target.value)*(that.state.moneyChange)).toFixed(2),
                [name]: event.target.value,
            });
        }
        if(name == 'bankId'){
            that.setState({ [name]: event });
        }
        else{
            that.setState({ [name]: event.target.value });
        }
    }

    onChange(date, dateString) {

        console.log(date, dateString);

    }

    handleCheckedChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    GO = () =>{
        const that = this;
        Axios.post('/payment/withdraw',{
            bank:{
                payee: that.state.payee,
                account: that.state.bank_number,
                mobile: that.state.bank_mobile,
                name: that.state.bankId,
                branch: that.state.bank_branch,
                swift: that.state.bank_swift,
                address: that.state.bank_address,
            },
            amount: that.state.money,
            account_from: that.props.msg.id,
            currency_pay: 'CNY',
            comment: that.state.comment,
        })
        .then(function (response) {
            that.props.handleState('1');
            message.success('出金成功')
        })
    }
    render() {
        const { classes } = this.props;
        const { msg } = this.props;
        const { bank } = this.state;
        const InputGroup = Input.Group;
        const Option = Select.Option;
        const { TextArea } = Input;
        return (
            <div>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                        取款帐户:
                    </span>
                    
                    </Col>
                    <Col span={9}>
                    <Input
                    value={msg.id}
                    disabled
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    帐户姓名:
                    </span>
                    
                    </Col>
                    <Col span={9}>
                    <Input
                    value={msg.mt4.name}
                    disabled
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    帐户货币:
                    </span>
                    
                    </Col>
                    <Col span={9}>
                    <Input
                    value={msg.mt4.currency}
                    disabled
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    帐户余额:
                    </span>
                    
                    </Col>
                    <Col span={9}>
                    <Input
                    value={msg.mt4.balance}
                    disabled
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    可出金余额:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={msg.mt4.balance}
                    disabled
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    出金货币:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value='CNY'
                    disabled
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span>*</span>出金金额:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.money}
                    onChange={this.handleChange('money')}
                    />
                    <h3 className={classes.moneyChangeTitle}>人民币出金金额:  {this.state.trueMoney}  (汇率:  {this.state.moneyChange})</h3>
                    </Col>
                </InputGroup> 
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span>*</span>银行账号:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.bank_number}
                    onChange={this.handleChange('bank_number')}
                    />
                    </Col>
                </InputGroup>       
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span>*</span>收款人:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.payee}
                    onChange={this.handleChange('payee')}
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span>*</span>银行名称:
                    </span>
                    </Col>
                    <Col span={9}>
                        <Select
                        value={this.state.bankId}
                        onChange={this.handleChange('bankId')}
                        >
                        {bank.map(option => (
                            <Option value={option.value} key={option.value}>
                                {option.name}
                            </Option>
                        ))}
                        </Select>
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span>*</span>分支行名称:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.bank_branch}
                    onChange={this.handleChange('bank_branch')}
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span>*</span>SWIFT代码:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.bank_swift}
                    onChange={this.handleChange('bank_swift')}
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span>*</span>银行地址:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.bank_address}
                    onChange={this.handleChange('bank_address')}
                    />
                    </Col>
                </InputGroup>         
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                        备注:
                    </span>
                    </Col>
                    <Col span={9}>
                        <TextArea 
                        autosize 
                        value={this.state.comment}
                        onChange={this.handleChange('comment')}
                        />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span>*</span>银行绑定手机号码:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.bank_mobile}
                    onChange={this.handleChange('bank_mobile')}
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} ></Col>
                    <Col span={9} style={{textAlign: 'center'}}>
                        <Button type='primary' onClick={this.GO}>
                            确认
                        </Button>
                    </Col>
                </InputGroup>
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(Income));