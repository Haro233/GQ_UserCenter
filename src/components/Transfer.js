import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Input, Col, Checkbox, Button} from 'antd';


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
    moneyChangeTitle:{
        fontSize: 12,
        color: '#999',
        margin: '37px 0px 18px'
    }
})


class Transfer extends Component {
    constructor(props){        
        super(props)  
        this.state = {
            money: '',
            moneyChange: '',
            trueMoney: '',
            payType: [],
            payName: '',
            comment: '',
        };  
    };
    

    
    componentWillMount = () => {
        const that = this
        const { msg } = this.props;
        Axios.get('/exchangerate?type=0&currency=USD&currency_exchange=CNY')
        .then(function (response) {
            that.setState({
                moneyChange: response.data.data[0].value,
            })
        })
        Axios.get('/payment/method?type=1')
        .then(function (response) {
            that.setState({
                payType: response.data.data,           
            })
        })
    }
    
    handleChange = (name) => event =>{
        // console.log(event.target.value)
        const that = this;
        this.setState({ [name]: event.target.value });
        if(name == 'money'){
            that.setState({ trueMoney: ((event.target.value)*(that.state.moneyChange)).toFixed(2) });
        }
    }

    transfer = () => {
        const { msg } = this.props;
        const that = this;
        Axios.post('/payment/deposit',{
            method: 'payment_type_Heepay',
            account: msg.id,
            amount: that.state.money,
            currency: 'USD',
            currency_pay: 'CNY',
            comment: that.state.comment,
        })
        .then(function (response) {
            console.log(decodeURI(response.data.data));
            console.log(encodeURI(response.data.data));
            console.log(response.data.data);

            window.open(response.data.data);
        })
        .catch(function (error) {
           
        });
    }

    handleCheckedChange = name => event => {
        this.setState({ 
            [name]: event.target.checked,
            payName: event.target.value, 
        });
    
    };

    render() {
        const { classes } = this.props;
        const { msg } = this.props;
        const { oneName, twoName } = this.state;
        const InputGroup = Input.Group;
        const { TextArea } = Input;
        
        // console.log(oneName)
        return (
            <div>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                        存入帐户:
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
                    存款货币:
                    </span>
                    
                    </Col>
                    <Col span={9}>
                    <Input
                    value='USD'
                    disabled
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    存款金额:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.money}
                    onChange={this.handleChange('money')}
                    />
                    </Col>
                    <Col span={5}>
                        <span style={{color: '#999',fontSize: 13}}>最低存款金额 : 50 (USD)  最高存款金额 : 7000 (USD)</span>
                    </Col>
                </InputGroup> 
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    支付平台:
                    </span>
                    
                    </Col>
                    <Col span={9} style={{marginTop: 5}}>
                        <Checkbox
                        checked={true}
                        >
                        汇付宝
                        </Checkbox>
                    </Col>
                </InputGroup>       
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    支付金额:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.trueMoney}
                    placeholder="将根据正确的存款金额自动计算"
                    disabled
                    />
                    <h3 className={classes.moneyChangeTitle}>实时汇率: 1 USD 兑 {this.state.moneyChange} CNY</h3>
                    </Col>
                    <Col span={5}>
                        <span style={{color: '#999',fontSize: 13}}>CNY (手续费: 0%, 将从存款金额中扣除)</span>
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
                        onChange={this.handleChange('comment')}
                        value={this.state.comment}
                        />
                    </Col>
                </InputGroup>    
                <InputGroup>
                    <Col span={5} ></Col>
                    <Col span={9} style={{textAlign: 'center'}}>
                        <Button type='primary' onClick={this.transfer}>
                            确认
                        </Button>
                    </Col>
                </InputGroup>    
                
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(Transfer));

