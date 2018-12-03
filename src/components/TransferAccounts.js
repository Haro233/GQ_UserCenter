import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Input, Col, Button } from 'antd';

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

const type =[{
    code: '1',
    value: '交易历史'
},{
    code: '2',
    value: '挂单查询'
},{
    code: '3',
    value: '持仓查询'
},]

class TransferAccounts extends Component {
    constructor(props){        
        super(props)  
        this.state = {
            
        };  
    };
    

    
    componentWillMount = () => {
        const that = this;
        const key = JSON.parse(sessionStorage.getItem('key'));
        this.setState ({
          key: key,
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

    render() {
        const { classes } = this.props;
        const InputGroup = Input.Group;
        const { TextArea } = Input;
        return (
            <div>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    转出帐户:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.name}
                    disabled
                    onChange={this.handleChange('name')}
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
                    value={this.state.name}
                    disabled
                    onChange={this.handleChange('name')}
                    />
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    账户货币:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.name}
                    disabled
                    onChange={this.handleChange('name')}
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
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    disabled
                    />
                    </Col>
                </InputGroup> 
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    可转账余额:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    disabled
                    />
                    </Col>
                </InputGroup>  
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span style={{color: 'red'}}>*</span>转账金额:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    />
                    </Col>
                </InputGroup>     
                <InputGroup>
                    <Col span={5} className={classes.col}>
                    <span className={classes.dialogContentText} >
                    <span style={{color: 'red'}}>*</span>转入帐户:
                    </span>
                    </Col>
                    <Col span={9}>
                    <Input
                    value={this.state.name}
                    onChange={this.handleChange('name')}
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
                        <TextArea autosize/>
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col span={5} ></Col>
                    <Col span={9} style={{textAlign: 'center'}}>
                        <Button type='primary' onClick={() => this.pushNewAccount}>
                            确认
                        </Button>
                    </Col>
                </InputGroup>
                
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(TransferAccounts));