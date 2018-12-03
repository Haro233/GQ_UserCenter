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
    title: '账号',
    dataIndex: 'login',
    key: 'login',
    align: 'center',
    }, {
    title: '姓名',
    dataIndex: '',
    key: 'number',
    align: 'center',
    },{
    title: '入金',
    dataIndex: 'profit',
    key: 'inProfit',
    align: 'center',
    render: (text, record) => {
        if(record.cmd == '7'){
            return <span>0.00</span>
        }else{
            if(text > 0){
                const msg = parseInt(text);
                return <span>{msg.toFixed(2)}</span>
            }else{
                return <span>0.00</span>
            }
        }
    },
    },{
    title: '出金',
    dataIndex: 'profit',
    key: 'outProfit',
    align: 'center',
    render: (text, record) => {
        if(record.cmd == '7'){
            return <span>0.00</span>
        }else{
            if(text < 0){
                const msg = parseInt(text);
                return <span>{msg.toFixed(2)}</span>
            }else{
                return <span>0.00</span>
            }
        }
    },
    },{
    title: '信用调整',
    dataIndex: 'profit',
    key: 'profit',
    align: 'center',
    render: (text, record) => {
        if(record.cmd == '6'){
            return <span>0.00</span>
        }else{
            return <span>{text}</span>
        }
    },
    },{
    title: '操作时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    align: 'center',
    render: (text) => {
        const time = parseInt(text);
        const date = new Date(time * 1000);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();        
        return <span>{Y+M+D+h+m+s}</span>
    },
    },{
    title: '备注',
    dataIndex: 'comment',
    key: 'comment',
    align: 'center',
    }
];


class CapitalFlow extends Component {
    constructor(props){        
        super(props)  
        const that = this;
        this.state = {
            dataMsg: [],
            type: that.props.msg[0].id,
        };  
    };
    

    
    componentWillMount = () => {
        const that = this;
        const { type } = this.state;
        Axios.get('/user/trades?account='+type+'&type=1&pageSize=100')
        .then(function (response) {
            that.setState({ 
                dataMsg:response.data.data.data,
            });
        })

    }
    
    handleChange = (name) => event =>{
        const that = this;
        this.setState({
            [name]: event
        })
        Axios.get('/user/trades?account='+event+'&type=1&pageSize=100')
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
        const InputGroup = Input.Group;
        const Option = Select.Option;
        const { msg } = this.props;
        const { RangePicker } = DatePicker;
        const { dataMsg, type } = this.state;

        let typeArr =[];
        let dataMsgArr = [];

        for (let i in msg) {
            typeArr.push({code:i,value:msg[i].id})
        }
        
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
                    onChange={this.handleChange('type')}
                    >
                    {typeArr.map(option => (
                        <Option value={option.value} key={option.value}>
                            {option.value}
                        </Option>
                    ))}
                    </Select>
                    </Col>
                    <Col span={6}>
                        <RangePicker onChange={() => this.onChange} />
                    </Col>
                </InputGroup>
                <Table key='456' dataSource={dataMsg} columns={columnsOne} />
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(CapitalFlow));