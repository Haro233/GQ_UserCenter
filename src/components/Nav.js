import React, { Component } from 'react';
import logo from '../images/company-logo.png';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { combineReducers } from 'redux';
import { withRouter } from 'react-router-dom';
const styles = theme => ({
    nav:{
        height: 70,
        width: '100%',
        background: '#282a36',
        display: 'flex',
        boxSizing: 'border-box',
        padding: '0px 15%',
        position: 'relative',
        boxShadow: '0px 2px 33px -12px rgba(0,0,0,0.5)',
        color: '#fff',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99,
    },
    left:{
        flex: 2,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& img':{
            cursor:'pointer',
        }
    },
    right:{
        height: '100%',
        flex:3,
    },
    navList:{
        listStyle:'none',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    lists:{
        color: '#fff',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        lineHeight: '70px',
        cursor:'pointer',
        fontSize: 13,
        transition: 'all .5s',
        '&:hover':{
            color: '#fe5722',
            background: '#383a45',
        }
    },
    select:{
        height: 300,
        width: '100%',
        position: 'absolute',
        background: '#383a45',
        boxShadow: '0 4px 6px rgba(0,0,0,.175)',
        left: 0,
        top: 70,
        boxSizing: 'border-box',
        padding: '0px 15%',
        display: 'flex',
        // opacity: 0,
        display: 'none',
    },
    selectLeft:{
        flex: 2,
        display: 'flex',
        textAlign: 'left',
        '& h2':{
            color: '#fe5722',
            fontSize: 24,
            margin: '0 0 15px',
        },
        '& h3':{
            textAlign: 'justify',
            color: '#b6b6b6',
            fontSize: 14,
            margin: 0,
        }
    },
    selectLeftNavList:{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '60px 25px',
    },
    selectLeftLists:{
        display: 'flex',
        justifyContent: 'space-between',
        width:'100%',
        '& button':{
            width: '48%',
            border: 'none',
        }
    },
    freeBtn:{
        backgroundColor: '#cdcdcd ',
        color: '#282a36 !important',
        
    },
    accountBtn:{
        backgroundColor: '#fe5722 ',
        color: '#fff !important',
    },
    selectRight:{
        flex: 3,
        textAlign: 'left',
    },
    selectRightNavList:{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '80px 30px',
    },
    selectRightLists:{
        width: '45%',
        height: 40,
        lineHeight: '40px',
        borderBottom: '1px #ccc dotted',
        marginRight: 15,
        boxSizing: 'border-box',
        transition: 'all .5s',
        '& span':{
            fontSize: 13,
            cursor:'pointer',
            '&:hover':{
                color: '#fe5722',
            }
        },
        '& i':{
            content: "",
            paddingRight: 8,
            width: 0,
            height: 0,
            display: 'inline-block',
            verticalAlign: 'middle',
            marginRight: 5,
            borderTop: '3px solid transparent',
            borderBottom: '3px solid transparent',
            borderLeft: '5px solid #fe5722',
        },
        '&:hover':{
            paddingLeft: 5,
        }

    },
})

class Nav extends Component {
    constructor(props){        
        super(props)         
    };

    backToIndex () {

    }
  
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.nav}>
                <div className={classes.left}>
                    <img src={logo} onClick={() => this.backToIndex()} />
                </div>
                <div className={classes.right}>
                    {/* <ul className={classes.navList}>
                        <li className={classes.lists}>
                        <a href="#">关于我们</a>
                        </li>
                        <li className={classes.lists}>
                            关于我们
                        </li>
                        <li className={classes.lists}>
                            关于我们
                        </li>
                        <li className={classes.lists}>
                            关于我们
                        </li>
                        <li className={classes.lists}>
                            关于我们
                        </li>
                        <li className={classes.lists}>
                            关于我们
                        </li>
                    </ul> */}
                </div>
                <div className={classes.select}>
                    <div className={classes.selectLeft}>
                        <ul className={classes.selectLeftNavList}>
                            <li className={classes.selectLeftLists}>
                                <h2>关于我们</h2>
                            </li>
                            <li className={classes.selectLeftLists}>
                                <h3>为您的交易所需而成立，GQFX智远集团”成长成为全球最大的外汇和差价合约经纪商之一，这里告诉您原因！</h3>
                            </li>
                            <li className={classes.selectLeftLists}>
                                <button className={classes.freeBtn}>模拟账户</button>
                                <button className={classes.accountBtn}>开立账户</button>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.selectRight}>
                        <ul className={classes.selectRightNavList}>
                            <li className={classes.selectRightLists}>
                                <i></i><span>公司介绍</span>
                            </li>
                            <li className={classes.selectRightLists}>
                                <i></i><span>监管</span>
                            </li>
                            <li className={classes.selectRightLists}>
                                <i></i><span>监管牌照</span>
                            </li>
                            <li className={classes.selectRightLists}>
                                <i></i><span>优势</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(Nav));