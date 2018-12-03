import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Edit from '@material-ui/icons/Edit';


const styles = theme => ({
    root: {
       display: 'inline-block',
       marginLeft: 10,
       cursor: 'pointer',
    },
    icon:{
        fontSize: 17,
    },
    dialogContentText:{
        fontSize: 12,
        '& span':{
            color: 'red',
            marginRight: 5,
            fontSize: 14,
        }
    },
    sendcode:{
        '& button':{
            border: '1px solid #e5e5e5',
            color: '#999',
        }
    },
    sendcodeInput:{
        marginRight: 10,
    },
})

class FDialog extends Component {
    state = {
        open: false,
        name: '',
        newName: '',
        email: '',
        newEmail: '',
        phone: '',
        newPhone: '',
        oldPassword: '',
        newPassword_1: '',
        newPassword_2: '',
        key: {},
        userData: {},
        userMsg: {},
        value: 0,
    };

    
    componentWillMount = () => {
        const key = JSON.parse(sessionStorage.getItem('key'));
        this.setState ({
          key: key,
        })
        const that = this;
        if(this.state.name == ''){
            Axios.get('/user')
            .then(function (response) {
                const data = response.data.data;
                that.setState ({
                    name: data.username,
                    email: data.email,
                    phone: data.mobile,
                    agent_id: data.agent_id,
                })
            })
        }
    }
    componentDidMount = () => {
        
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    changeName = newName => event => {
        this.setState({ [newName]: event.target.value });
    };

    clickChangeName  = () =>  {
        const that = this;
        Axios.post('/user/updateusername',{
            username: this.state.newName
        })
        .then(function (response) {
            that.setState({ open: false,name: that.state.newName });
            swal('修改成功');
        })
        .catch(function (error) {
            that.setState({ open: false });
            swal('修改失败');
        });
    };

    changeOldPassword = oldPassword => event => {
        this.setState({ [oldPassword]: event.target.value });
    };

    changeNewPassword_1 = newPassword_1 => event => {
        this.setState({ [newPassword_1]: event.target.value });
    };
    
    changeNewPassword_2 = newPassword_2 => event => {
        this.setState({ [newPassword_2]: event.target.value });
    };

    clickChangePassword = () =>  {
        const that = this;
        Axios.post('/user/updatepassword',{
            password_original: this.state.oldPassword,
            password_confirm: this.state.newPassword_2,
            password: this.state.newPassword_1,
        })
        .then(function (response) {
            that.setState({ open: false });
            swal('修改成功');
        })
        .catch(function (error) {
            that.setState({ open: false });
            swal('修改失败');
        });
    };

    changeEmail = newEmail => event => {
        this.setState({ [newEmail]: event.target.value });
    };

    clickChangeEmail  = () =>  {
        // const that = this;
        // Axios.post('/user/updateusername',{
        //     usere: this.state.newName
        // })
        // .then(function (response) {
        //     that.setState({ open: false,name: that.state.newName });
        //     swal('修改成功');
        // })
        // .catch(function (error) {
        //     that.setState({ open: false });
        //     swal('修改失败');
        // });
    };
    render() {
        const { classes } = this.props;
        const { type } = this.props;
        const { value } = this.state;
        const name = this.state.name;
        const email = this.state.email;
        const phone = this.state.phone;
        return (
            <div className={classes.root}>
                {   type == 'name' &&
                    <h5>{name == undefined ? '未设置' : name}</h5>
                }
                {   type == 'password' &&
                    <h5>**********</h5>
                }
                {   type == 'email' &&
                    <h5>{email == undefined ? '未设置' : email}</h5>
                }
                {   type == 'phone' &&
                    <h5>{phone == undefined ? '未设置' : phone}</h5>
                }
                <Edit onClick={this.handleClickOpen} className={classes.icon} />
                {   type == 'name' &&
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">用户名</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.dialogContentText} >
                            <span>*</span>用户名:
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        placeholder='支持数字+字母的组合'
                        fullWidth
                        onChange={this.changeName('newName')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button color="primary" onClick={() => this.clickChangeName()}>
                            确认
                        </Button>
                    </DialogActions>
                    </Dialog>
                }
                {   type == 'password' &&
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">登陆密码</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.dialogContentText} >
                            <span>*</span>旧密码:
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="oldPassword"
                        type="password"
                        fullWidth
                        onChange={this.changeOldPassword('oldPassword')}
                        />
                        <DialogContentText className={classes.dialogContentText} >
                            <span>*</span>新密码:
                        </DialogContentText>
                        <TextField
                        margin="dense"
                        id="newPassword_1"
                        type="password"
                        fullWidth
                        onChange={this.changeOldPassword('newPassword_1')}
                        />
                        <DialogContentText className={classes.dialogContentText} >
                            <span>*</span>确认密码:
                        </DialogContentText>
                        <TextField
                        margin="dense"
                        id="newPassword_2"
                        type="password"
                        fullWidth
                        onChange={this.changeOldPassword('newPassword_2')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button color="primary" onClick={() => this.clickChangePassword()}>
                            确认
                        </Button>
                    </DialogActions>
                    </Dialog>
                }
                {   type == 'email' &&
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">绑定邮箱</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.dialogContentText} >
                            <span>*</span>新邮箱:
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        type="email"
                        fullWidth
                        onChange={this.changeEmail('email')}
                        />
                        <DialogContentText className={classes.dialogContentText} >
                            <span>*</span>登陆密码：
                        </DialogContentText>
                        <TextField
                        margin="dense"
                        id="email"
                        type="password"
                        fullWidth
                        onChange={this.changeEmail('email')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleClose} color="primary" onClick={() => this.clickChangeEmail()}>
                            确认
                        </Button>
                    </DialogActions>
                    </Dialog>
                }
                {   type == 'phone' &&
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">用户名</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.dialogContentText} >
                            <span>*</span>绑定手机：
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="phone"
                        fullWidth
                        onChange={this.changeName('name')}
                        />
                        <DialogContentText className={classes.dialogContentText} >
                            <span>*</span>验证码:
                        </DialogContentText>
                        <div className={classes.sendcode}>
                            <TextField
                            multiline={false}
                            margin="dense"
                            id="name"
                            type="text"
                            
                            className={classes.sendcodeInput}
                            classes={{underline:classes.underline}}
                            onChange={this.changeName('name')}
                            />
                            <Button color="primary">
                                获取验证码
                            </Button>
                        </div>
                      
                        <DialogContentText className={classes.dialogContentText} >
                            <span>*</span>登录密码：
                        </DialogContentText>
                        <TextField
                        margin="dense"
                        id="name"
                        type="password"
                        fullWidth
                        onChange={this.changeName('name')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            确认
                        </Button>
                    </DialogActions>
                    </Dialog>
                }
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(FDialog));