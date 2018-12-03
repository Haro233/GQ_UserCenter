import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
// import ControlPoint from '@material-ui/icons/ControlPoint';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import MenuItem from '@material-ui/core/MenuItem';
import { Modal, Input, Col, Icon, Select, Button, Checkbox, } from 'antd';

const styles = theme => ({
    root: {
       display: 'inline-block',
       width: '100%',
       marginTop: 20,
    },
    oldBank:{
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
    bankMsg:{
        width: '50%',
    },
    bankName:{
        display: 'flex',
        '& h2':{
            fontSize: 16,
        },
        '& h3':{
            fontSize: 12,
            marginLeft: 28,
        },
    },
    bankDetailsTop:{
        display: 'flex',
    },
    bankDetailsBottom:{
        display: 'flex',
    },
    bankDetailsDiv:{
        flex: 1,
        display: 'flex',
        '& h4':{
            fontSize: 12,
            width: '30%'
        },
        '& span':{
            fontSize: 12,
            marginLeft: 40,
        },
    },
    bankBtn:{
        width: '50%',
        opacity: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        '&:hover':{
            opacity: 1
        },
        '& button':{
            marginRight: 10,
        }
    },
    default:{
        backgroundColor: '#0085cc',
        color: '#fff',
        '&:hover':{
            backgroundColor: '#0085cc',
        },
    },
    edit:{
        border: '1px solid #d5d5d5',
        '&:hover':{
            color: '#00a3fe',
            borderColor: '#00a3fe',
            backgroundColor: '#fff',
        }
    },
    delete:{
        border: '1px solid #d5d5d5',
        '&:hover':{
            color: '#00a3fe',
            borderColor: '#00a3fe',
            backgroundColor: '#fff',
        }
    },
    centerLine:{
        width: '100%',
        height: 1,
        background: '#eceff0',
    },
    addingNewBank:{
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        margin: '40px 0',
        '& svg':{
            fontSize: 32,
            cursor: 'pointer',
            color: '#d5d5d5',
            marginRight: 10,
        },
        '& h3':{
            cursor: 'pointer',
        },
    },
    dialogContentText:{
        fontSize: 12,
        width: 500,
        '& span':{
            color: 'red',
        }
    },
    textField:{
        border: '1px #d9d9d9 solid',
        borderRadius: 5,
        marginBottom: 10,
        '& input':{
            padding: '3px 6px',
            fontSize: 12,
        },
        '& div':{
            '&:before':{
                display: 'none',
            },
            '&:after':{
                display: 'none',
            },
        }
    },
    col:{
        marginBottom: 35,
    },
    isDefault:{
        height: 20,
        padding: '0 5px',
        color: '#2c9f66',
        lineHeight: '18px',
        marginLeft: 10,
        borderRadius: 4,
        fontStyle: 'normal',
        border: '1px solid #2c9f66',
    }
})

class Bank extends Component {
    constructor(props){        
        super(props)  
        this.state = {
            id:'',
            name: '',
            bankAccount: '',
            bankType: '',
            newName: '',
            data: {},
            bankName: '1',
            checked:false,
            banksName: [],
            isEdit: false,
            isDefault: '',
            branch: '',
            swift: '',
            address: '',
            flag: '2',
            visible: false,
            isCreate: false,
            country: [],
            bankCountryId: '1',
            province: [],
            bankProvinceId: '2',
            city: [],
            bankCityId: '3',
            phone: '',
            bankName_2: '',
        };  
    };
    

    
    componentWillMount = () => {
        const that = this;
        Axios.get('/user/bank')
        .then(function (response) {
            const data = response.data.data;
            that.setState ({
                data: data,
            })
        });
        Axios.get('/banks')
        .then(function (response) {
            const data = response.data.data;
            that.setState ({
                banksName: data,
            })
        });
        Axios.get('/country')
        .then(function (response) {
            that.setState ({
                country: response.data.data,
            })
        })
        Axios.get('/country?parent_code=1')
        .then(function (response) {
            that.setState ({
                province: response.data.data,
            })
        })
        Axios.get('/country?parent_code=2')
        .then(function (response) {
            that.setState ({
                city: response.data.data,
            })
        })
    }

    handleClickOpen = (value) => event => {
        this.setState({ 
            id:value.id,
            name: value.payee,
            bankAccount:value.account,
            bankName:value.name,
            isCreate: false,
            is_default:this.state.isDefault,
            visible: true,
        });
        
    };

    handleCheckedChange = event => {
        this.setState({
            checked: event.target.checked,
          });
    };

    bankDefault = (item) => (event) =>{
        const that = this;
        Axios.post('/user/bank/setdefault',{
            id:item.id,
        })
        .then(function (response) {
            Axios.get('/user/bank')
            .then(function (response) {
                const data = response.data.data;
                that.setState({
                    data: data,
                });
            }); 
        })
    };

    delete = (item) => (event) => {
        const that = this;
        Axios.post('/user/bank/delete',{
            id:item.id,
        })
        .then(function (response) {
            Axios.get('/user/bank')
            .then(function (response) {
                const data = response.data.data;
                that.setState({
                    data: data,
                });
            }); 
        })
       
        
    }
    handleChange = name => event => {
        const that = this;
        if(name == 'countryId'||name == 'bankCountryId'){
            Axios.get('/country?parent_code='+event)
            .then(function (response) {
                that.setState ({
                    province: response.data.data,
                })
            })
        }
        if(name == 'provinceId'||name == 'bankProvinceId'){
            Axios.get('/country?parent_code='+event)
            .then(function (response) {
                that.setState ({
                    city: response.data.data,
                })
            })
            that.setState ({
                [name]: event,
            });
              
        }
        this.setState({
          [name]: event,
        });
    };
    handleMsgChange = (name) => event =>{
        this.setState({
            [name]: event.target.value,
        });
    };
    changeName = (name) => event => {
        const that = this;
        if(name == 'bankName'){
            that.setState({ 
                [name]: event.target.value,
                bankType: event.target.value,
            });
        }else{
            that.setState({ 
                [name]: event.target.value,
            });
        }
        
    };

    showModal = () => {
        this.setState({
          visible: true,
          isCreate: true,
        });
    }
    handleOk = (e) => {
        const that = this;
        if(this.state.isCreate == true){
            Axios.post('/user/bank/create',{
                payee:that.state.name,
                account:that.state.bankAccount,
                name:that.state.bankName,
                branch:that.state.branch,
                swift:that.state.swift,
                address:that.state.address,
                is_default:that.state.checked,
                country:that.state.bankCountryId,
                province:that.state.bankProvinceId,
                city:that.state.bankCityId,
                mobile:that.state.phone,
            })
            .then(function (response) {
                Axios.get('/user/bank')
                .then(function (response) {
                    const data = response.data.data;
                    that.setState({
                        data: data,
                        visible: false,
                        isCreate: false,
                    });
                }); 
            })
            .catch(function (error) {
                swal('错误');
            });
        }else{
            Axios.post('/user/bank/update',{
                id:that.state.id,
                payee:that.state.name,
                account:that.state.bankAccount,
                name:that.state.bankName,
                branch:that.state.branch,
                swift:that.state.swift,
                address:that.state.address,
                is_default:that.state.checked,
            }).then(function (response) {
                Axios.get('/user/bank')
                .then(function (response) {
                    const data = response.data.data;
                    that.setState({
                        data: data,
                        visible: false,
                        isCreate: false,
                    });
                });
            })
            .catch(function (error) {
                swal('错误');
            });
        }
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    changeBankName = event =>{
        this.setState({
            bankName: event,
        });
    }
    render() {
        const { classes } = this.props;
        const { data } = this.state;
        const { banksName, country, city, province, } = this.state;
        const InputGroup = Input.Group;
        const Option = Select.Option;
        let provinceArr = []
        let cityArr = []
        let countryArr = []
        for (let i in country) {
            countryArr.push(country[i])
        }
        for (let i in province) {
            provinceArr.push(province[i])
        }
        for (let i in city) {
            cityArr.push(city[i])
        }
       
        return (
            <div className={classes.root}>
                {
                    data.length >= 0 &&
                    data.map(item => 
                        <div key={item.id}>
                            <div className={classes.oldBank}>
                                <div className={classes.bankMsg}>
                                    <div className={classes.bankName}>
                                        <h2>{
                                            banksName.map(value =>
                                                {if(value.value == item.name){
                                                    return value.name
                                                }}
                                            )
                                        }</h2>
                                        <h3>{item.account}</h3>
                                        {item.is_default == '1' && <span className={classes.isDefault}>默认</span>}
                                    </div>
                                    <div className={classes.bankDetailsTop}>
                                        <div className={classes.bankDetailsDiv}>
                                            <h4>收款人</h4>
                                            <span>{item.payee}</span>
                                        </div>
                                        <div className={classes.bankDetailsDiv}>
                                            <h4>SWIFT代码</h4>
                                            <span>{item.swift==null?'':item.swift}</span>
                                        </div>
                                    </div>
                                    <div className={classes.bankDetailsBottom}>
                                        <div className={classes.bankDetailsDiv}>
                                            <h4>分支行名称</h4>
                                            <span>{item.branch==null?'':item.branch}</span>
                                        </div>
                                        <div className={classes.bankDetailsDiv}>
                                            <h4>银行地址</h4>
                                            <span>{item.address==null?'':item.address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.bankBtn}>
                                    <Button type="primary" onClick={this.bankDefault(item)}>设为默认</Button>
                                    <Button onClick={this.handleClickOpen(item)}>编辑</Button>
                                    <Button type="danger" onClick={this.delete(item)}>删除</Button>
                                </div>
                            </div>
                            <div className={classes.centerLine}></div>
                        </div>
                    )
                    
                }
                <div className={classes.addingNewBank}>
                    <Button onClick={this.showModal}>新增银行</Button>
                </div>
                <div className={classes.centerLine}></div>
                <Modal
                    title={this.state.isCreate == true?"添加银行":"修改银行信息"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                        <span className={classes.dialogContentText} >
                            <span>*</span>收款人:
                        </span>
                        </Col>
                        <Col span={12}>
                            <Input
                            value={this.state.name}
                            onChange={this.changeName('name')}
                            />
                        </Col>
                    </InputGroup> 
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                        <span className={classes.dialogContentText} >
                            <span>*</span>银行账号:
                        </span>
                        </Col>
                        <Col span={12}>
                            <Input
                            value={this.state.bankAccount}
                            onChange={this.changeName('bankAccount')}
                            />
                        </Col>
                    </InputGroup> 
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                        <span className={classes.dialogContentText} >
                            <span>*</span>银行名称:
                        </span>
                        </Col>
                        <Col span={12}>
                            <Select
                            value={this.state.bankName}
                            onChange={this.changeBankName}
                            >
                                {banksName.map(items => (
                                    <Option value={items.value} key={items.value}>
                                        {items.name}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </InputGroup> 
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                        <span className={classes.dialogContentText} >
                            分支行名称:
                        </span>
                        </Col>
                        <Col span={12}>
                            <Input
                            value={this.state.branch}
                            onChange={this.changeName('branch')}
                            />
                        </Col>
                    </InputGroup> 
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                            <span className={classes.dialogContentText} >
                                <span>*</span>银行国家:
                            </span>
                        </Col>
                        <Col span={12}>
                            <Select
                            value={this.state.bankCountryId}
                            onChange={this.handleChange('bankCountryId')}
                            >
                            {countryArr.map(option => (
                                <Option value={option.code} key={option.code}>
                                    {option.name}
                                </Option>
                            ))}
                            </Select>
                        </Col>
                    </InputGroup>
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                            <span className={classes.dialogContentText} >
                                <span>*</span>银行行省:
                            </span>
                        </Col>
                        <Col span={12}>
                            <Select
                            value={this.state.bankProvinceId}
                            onChange={this.handleChange('bankProvinceId')}
                            >
                            {provinceArr.map(option => (
                                <Option value={option.code} key={option.code}>
                                    {option.name}
                                </Option>
                            ))}
                            </Select>
                        </Col>
                    </InputGroup>
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                            <span className={classes.dialogContentText} >
                                <span>*</span>银行城市:
                            </span>
                        </Col>
                        <Col span={12}>
                            <Select
                            value={this.state.bankCityId}
                            onChange={this.handleChange('bankCityId')}
                            >
                            {cityArr.map(option => (
                                <Option value={option.code} key={option.code}>
                                    {option.name}
                                </Option>
                            ))}
                            </Select>
                        </Col>
                    </InputGroup>
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                        <span className={classes.dialogContentText} >
                            SWIFT代码:
                        </span>
                        </Col>
                        <Col span={12}>
                            <Input
                            value={this.state.swift}
                            onChange={this.changeName('swift')}
                            />
                        </Col>
                    </InputGroup> 
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                        <span className={classes.dialogContentText} >
                            <span>*</span>预留手机号:
                        </span>
                        </Col>
                        <Col span={12}>
                            <Input
                            value={this.state.phone}
                            onChange={this.changeName('phone')}
                            />
                        </Col>
                    </InputGroup> 
                    <InputGroup>
                        <Col span={4} className={classes.col}>
                        <span className={classes.dialogContentText} >
                            地址:
                        </span>
                        </Col>
                        <Col span={12}>
                            <Input
                            value={this.state.address}
                            onChange={this.changeName('address')}
                            />
                        </Col>
                    </InputGroup> 
                    <InputGroup>
                        <Col span={8} className={classes.col}>
                        <Checkbox
                        value={this.state.checked}
                        onChange={this.handleCheckedChange}
                        >
                            设为默认银行
                        </Checkbox>
                        </Col>
                    </InputGroup> 
                </Modal>
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(Bank));