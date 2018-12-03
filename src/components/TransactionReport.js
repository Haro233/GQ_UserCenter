import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Select, Input, Col, Table, DatePicker, } from 'antd';

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
})

const columnsOne = [{
    title: '订单号',
    dataIndex: 'ticket',
    key: 'ticket',
    align: 'center',
    }, {
    title: '账号',
    dataIndex: 'login',
    key: 'login',
    align: 'center',
    },{
    title: '类型',
    dataIndex: 'cmd',
    key: 'cmd',
    align: 'center',
    render: (text, record) => {
        if(text == 0){
            return <span>买</span>
        }
        if(text == 1){
            return <span>卖</span>
        }
        if(text == 2){
            return <span>挂单买入</span>
        }
        if(text == 3){
            return <span>挂单卖出</span>
        }
        if(text == 4){
            return <span>挂单追涨</span>
        }
        if(text == 5){
            return <span>挂单追空</span>
        }
        if(text == 6){
            return <span>存款</span>
        }
        if(text == 7){
            return <span>信用</span>
        }
    },
    },{
    title: '品种',
    dataIndex: 'symbol',
    key: 'symbol',
    align: 'center',
    },{
    title: '交易量',
    dataIndex: 'volume',
    key: 'volume',
    align: 'center',
    render: (text) => {
        return <span>{((text)/100).toFixed(2)}</span>
    }
    },{
    title: '开仓价',
    dataIndex: 'open_price',
    key: 'open_price',
    align: 'center',
    },{
    title: '开仓时间',
    dataIndex: 'open_time',
    key: 'open_time',
    align: 'center',
    },{
    title: '平仓价',
    dataIndex: 'close_price',
    key: 'close_price',
    align: 'center',
    },{
    title: '平仓时间',
    dataIndex: 'close_time',
    key: 'close_time',
    align: 'center',
    },{
    title: '止损',
    dataIndex: 'sl',
    key: 'sl',
    align: 'center',
    },{
    title: '止盈',
    dataIndex: 'tp',
    key: 'tp',
    align: 'center',
    },{
    title: '佣金',
    dataIndex: 'taxes',
    key: 'taxes',
    align: 'center',
    },{
    title: '利息',
    dataIndex: 'swaps',
    key: 'swaps',
    align: 'center',
    },{
    title: '盈亏',
    dataIndex: 'profit',
    key: 'profit',
    align: 'center',
    },{
    title: '备注',
    dataIndex: 'comment',
    key: 'comment',
    align: 'center',
    },
];
const columnsTwo = [{
    title: '订单号',
    dataIndex: 'ticket',
    key: 'ticket',
    align: 'center',
    }, {
    title: '账号',
    dataIndex: 'login',
    key: 'login',
    align: 'center',
    },{
    title: '类型',
    dataIndex: 'cmd',
    key: 'cmd',
    align: 'center',
    render: (text, record) => {
        if(text == 0){
            return <span>买</span>
        }
        if(text == 1){
            return <span>卖</span>
        }
        if(text == 2){
            return <span>挂单买入</span>
        }
        if(text == 3){
            return <span>挂单卖出</span>
        }
        if(text == 4){
            return <span>挂单追涨</span>
        }
        if(text == 5){
            return <span>挂单追空</span>
        }
        if(text == 6){
            return <span>存款</span>
        }
        if(text == 7){
            return <span>信用</span>
        }
    },
    },{
    title: '品种',
    dataIndex: 'symbol',
    key: 'symbol',
    align: 'center',
    },{
    title: '交易量',
    dataIndex: 'volume',
    key: 'volume',
    align: 'center',
    render: (text) => {
        return <span>{((text)/100).toFixed(2)}</span>
    }
    },{
    title: '挂单价',
    dataIndex: 'open_price123123123',
    key: 'open_price1231231',
    align: 'center',
    },{
    title: '挂单时间',
    dataIndex: 'open_time123123123',
    key: 'open_time1231231231',
    align: 'center',
    },{
    title: '止损',
    dataIndex: 'sl',
    key: 'sl',
    align: 'center',
    },{
    title: '止盈',
    dataIndex: 'tp',
    key: 'tp',
    align: 'center',
    },{
    title: '执行/取消时间',
    dataIndex: 'taxes12312',
    key: 'taxes1231231',
    align: 'center',
    },
];
const columnsThr = [{
    title: '订单号',
    dataIndex: 'ticket',
    key: 'ticket',
    align: 'center',
    }, {
    title: '账号',
    dataIndex: 'login',
    key: 'login',
    align: 'center',
    },{
    title: '类型',
    dataIndex: 'cmd',
    key: 'cmd',
    align: 'center',
    render: (text, record) => {
        if(text == 0){
            return <span>买</span>
        }
        if(text == 1){
            return <span>卖</span>
        }
        if(text == 2){
            return <span>挂单买入</span>
        }
        if(text == 3){
            return <span>挂单卖出</span>
        }
        if(text == 4){
            return <span>挂单追涨</span>
        }
        if(text == 5){
            return <span>挂单追空</span>
        }
        if(text == 6){
            return <span>存款</span>
        }
        if(text == 7){
            return <span>信用</span>
        }
    },
    },{
    title: '品种',
    dataIndex: 'symbol',
    key: 'symbol',
    align: 'center',
    },{
    title: '交易量',
    dataIndex: 'volume',
    key: 'volume',
    align: 'center',
    render: (text) => {
        return <span>{((text)/100).toFixed(2)}</span>
    }
    },{
    title: '开仓价',
    dataIndex: 'open_price',
    key: 'open_price',
    align: 'center',
    },{
    title: '开仓时间',
    dataIndex: 'open_time',
    key: 'open_time',
    align: 'center',
    },{
    title: '止损',
    dataIndex: 'sl',
    key: 'sl',
    align: 'center',
    },{
    title: '止盈',
    dataIndex: 'tp',
    key: 'tp',
    align: 'center',
    },{
    title: '手续费',
    dataIndex: 'taxes',
    key: 'taxes',
    align: 'center',
    },{
    title: '利息',
    dataIndex: 'swaps',
    key: 'swaps',
    align: 'center',
    },{
    title: '盈亏',
    dataIndex: 'profit',
    key: 'profit',
    align: 'center',
    },
];
const data = [{
    
}]
const type =[{
    code: 3,
    value: '交易历史'
},{
    code: 4,
    value: '挂单查询'
},{
    code: 2,
    value: '持仓查询'
},]

class TransactionReport extends Component {
    constructor(props){        
        super(props)  
        this.state = {
            dataMsg: [],
            type: 3,
        };  
    };
    

    
    componentWillMount = () => {
        const that = this;
        const { type } = this.state;
        Axios.get('/user/trades?account=236587413&type='+type+'&pageSize=100')
        .then(function (response) {
            that.setState({ 
                dataMsg:response.data.data.data,
            });
        })
    }
    
    handleChange = event =>{
        const { type } = this.state;
        const that = this;
        that.setState({ 
            type:event
        });
        Axios.get('/user/trades?account=236587413&type='+event+'&pageSize=100')
        .then(function (response) {
            that.setState({ 
                dataMsg:response.data.data.data,
            });
        })
    }

    onChange(date, dateString) {

        console.log(date, dateString);

    }

    render() {
        const { classes } = this.props;
        const { dataMsg } = this.state;
        const InputGroup = Input.Group;
        const Option = Select.Option;
        const { RangePicker } = DatePicker;
        let dataMsgArr = [];
        for (let i in dataMsg) {
            dataMsgArr.push(dataMsg[i])
        }
        // console.log(this.state.type)
        return (
            <div>
                <InputGroup>
                    <Col span={2} className={classes.col}>
                    <Select
                    value={this.state.type}
                    onChange={this.handleChange}
                    >
                    {type.map(option => (
                        <Option value={option.code} key={option.code}>
                            {option.value}
                        </Option>
                    ))}
                    </Select>
                    </Col>
                    <Col span={6}>
                        <RangePicker onChange={() => this.onChange} />
                    </Col>
                </InputGroup>
                {this.state.type == 3 && <Table key='789' dataSource={dataMsgArr} columns={columnsOne} />}
                {this.state.type == 4 && <Table key='123' dataSource={dataMsgArr} columns={columnsTwo} />}
                {this.state.type == 2 && <Table key='444' dataSource={dataMsgArr} columns={columnsThr} />}
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(TransactionReport));