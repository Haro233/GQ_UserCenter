import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Col, Button, Input, Layout, Row, Select, Upload, Icon, message, Card, Form, Checkbox, Radio, Steps, Modal, DatePicker  } from 'antd';

const styles = theme => ({
    header:{
        background: '#FFF',
        padding: 10,
        lineHeight: 'unset',
        '& h3':{
            fontSize: 14,
            fontWeight: 700,
        },
        '& h4':{
            fontSize: 14,
            fontWeight: 500,
        },
        '& Col':{
            height: '100%'
        }
    },
    content:{
        background: '#FFF',
        '& h2':{
            margin: '20px 15px !important'
        }
    },
    select:{
        border: 'none',
        color: '#222',
        fontSize: 16,
    },
    btn:{
        border: 'none',
        color: '#999',
        fontSize: 16,
    },
    row:{
        padding: '25px 0',
        '& Button':{
            height: 32,
        }
    },
    col:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        flexWrap: 'wrap',
        '& span':{
            fontSize: 16,
            color: '#222',
            '& b':{
                color: 'red',
            },
            '& span':{
                color: '#3c8aee',
            },
        },
        '& Input':{
            borderRadius: 0,
        },
        '& Button':{
            background: 'linear-gradient(90deg, #f38a26, #fc664a)',
            '& span':{
                color: '#fff',
                fontSize: 16
            },
            '&:focus':{
                background: 'linear-gradient(90deg, #f38a26, #fc664a)',
            },
            '&:hover':{
                background: 'linear-gradient(90deg, #f38a26, #fc664a)',
            }
        },
        '& h5':{
            fontSize: 16,
            color: '#222',
        },
        '& h4':{
            fontSize: 14,
            color: '#222',
            '& span':{
                fontSize: 14,
                color: '#3c8aee',
            },
        },
    },
    inputCol:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '20px 0 25px',
        '& Input':{
            borderRadius: 20,
        },
    },
    securitySettingInput:{
        borderRadius: 20,
    },
    securitySettingBtn:{
        width: 110,
        background: 'linear-gradient(90deg, #f38a26, #fc664a)',
        "& span":{
            color: '#fff !important',
        },
        '&:hover':{
            background: 'linear-gradient(90deg, #f38a26, #fc664a)',
        },
        '&:focus':{
            background: 'linear-gradient(90deg, #f38a26, #fc664a)',
        }
    },
    codeInput:{
        borderRadius: 20,
        width: '100%',
        background: '#fff !important',
        borderRadius: 20,
        borderColor: '#222 !important',
        "& span":{
            color: '#222 !important',
        },
        
    },
    upload:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
})
function getBase64(img, callback){
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
function beforeUpload(file){
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    if (!isJPG) {
        if(!isPNG) {
            message.error('You can only upload JPG file!');
        }
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M  &&  isJPG || isPNG;
}
const steps =[{
    title: '提交基本资料',
},{
    title: '补充财务信息',
},{
    title: '上传身份证明',
}]
class One extends Component{
    constructor(props){        
        super(props)       
        
    };
    
    state = {
        countryId: '1',
        provinceId: '',
        cityId: '',
        province: [],
        city: [],
        current: this.props.current,
    }; 
    componentDidMount = () =>{
        const one = this.props.one;
        const { setFieldsValue } = this.props.form; 
        setFieldsValue({ 
            'name': one.name,
            'address': one.address,
            'base_remark': one.base_remark,
            'postcode': one.postcode,
            'sex': one.sex,
            'country': one.country,
        })
    }
    handleSubmitOne = (e) => {
        const that = this;
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
          if (!err) {
            const values = {
                ...fieldsValue,
                'date_picker': fieldsValue['date_picker'].format('YYYY-MM-DD'),
            };
            that.setState({one:values})
            const current = this.state.current + 1;
            that.props.goToNext(current,values,'one')
          }
        });
    }  
    handleChange = name => event => {
        const that = this;
        if(name == 'provinceId'){
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
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        const Option = Select.Option;
        const { city,} = this.state;
        const {country, province} = this.props
        // console.log(this.props)
        return (
        <Col span={24} >
            <Form onSubmit={this.handleSubmitOne}>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        label={<span>姓名</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入姓名',}],
                        })(
                            <Input placeholder="请输入姓名"/>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={12} >
                        <FormItem 
                        label={<span>性别</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('sex', {
                            rules: [{
                                required: true, message: '请选择您的性别',
                            }],
                        })(
                            <Select placeholder="性别">
                                <Option value="0">男</Option>
                                <Option value="1">女</Option>
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        label={<span>出生年月</span>} 
                        colon={false}
                        >
                        {getFieldDecorator('date_picker',{ 
                            rules: [{
                                type: 'object', required: true, message: '请选择您的生日',
                            }],
                        })(
                            <DatePicker placeholder='请选择日期'/>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={12} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        label={<span>邮政编码</span>} 
                        colon={false}
                        >
                        {getFieldDecorator('postcode', {
                            rules: [{
                                required: true, message: '请填写您的邮政编码',
                            }],
                        })(
                            <Input placeholder="请填写您的邮政编码"/>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle" style={{marginTop: 15}}>
                    <Col span={8} >
                        <FormItem 
                        label={<span>居住地</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 9 }}
                        wrapperCol={{ span: 13 }}
                        colon={false}
                        >
                        {getFieldDecorator('country', {
                            rules: [{
                                required: true, message: '请选择您居住地',
                                setFieldsValue: '1'
                            }],
                        })(
                            <Select
                                placeholder="请选择"
                                onChange={this.handleChange('countryId')}
                            >
                            {country.map(option => (
                                <Option  key={option.code}>
                                    {option.name}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={4} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        wrapperCol={{ span: 20 }}
                        colon={false}
                        >
                        {getFieldDecorator('provinceId', {
                            rules: [{
                                required: true, message: '请选择您居住地',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            onChange={this.handleChange('provinceId')}
                            >
                                {province.map(option => (
                                    <Option  key={option.code}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={4} >  
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        colon={false}
                        >
                        {getFieldDecorator('cityId', {
                            rules: [{
                                required: true, message: '请选择您居住地',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            onChange={this.handleChange('cityId')}
                            >
                                {city.map(option => (
                                    <Option  key={option.code}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                        </FormItem> 
                    </Col>
                </Row>
                <Row type="flex" align="middle" style={{marginTop: 15}}>
                    <Col span={24} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 16 }}
                        label={<span>详细地址</span>} 
                        colon={false}
                        >
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true, message: '请填写您的详细地址',
                            }],
                        })(
                            <Input placeholder="请填写您的详细地址"/>
                        )}
                        
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle" style={{marginTop: 15}}>
                    <Col span={24} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 16 }}
                        label={<span>备注</span>} 
                        colon={false}
                        >
                        {getFieldDecorator('base_remark', {
                            rules: [{
                                required: true, message: '请填写您的备注',
                            }],
                        })(
                            <Input placeholder="请填写您的备注"/>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="right" style={{marginTop: 15}}>
                    <Col span={24} style={{textAlign: 'right'}} >
                        <FormItem>
                            <Button htmlType="submit" type="primary">下一步</Button>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
        </Col>
    )}
}
One = withStyles(styles, { withTheme: true })  (withRouter(Form.create()(One)));


class Two extends Component{
    constructor(props){        
        super(props)       
    };
    state = {
        countryId: '1',
        provinceId: '',
        cityId: '',
        province: [],
        city: [],
        country: [],
        current: this.props.current,
    }; 
    componentDidMount = () =>{
        const two = this.props.two;
        const { setFieldsValue } = this.props.form; 
        setFieldsValue({ 
            'bankId': two.bankId,
            'bank_branch': two.bank_branch,
            'bank_card_number': two.bank_card_number,
            'country': two.country,
            'educationId': two.educationId,
            'financial_remarks': two.financial_remarks,
            'income_sourceId': two.income_sourceId,
            'invested_quota': two.invested_quota,
            'invested_yearsId': two.invested_yearsId,
            'net_assets': two.net_assets,
            'purpose_of_invested': two.purpose_of_invested,
            'total_assets': two.total_assets,
        })
        
    }
    handleSubmitTwo = (e) => {
        const that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const current = this.state.current + 1;
            that.props.goToNext(current,values,'two')
          }
        });
    }  
    handleChange = name => event => {
        const that = this;
        if(name == 'provinceId'){
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
    prev() {
        const current = this.state.current - 1;
        this.props.goToNext(current)
    }
    handleConfigs = (name) =>{
        let arr = []
        this.props.configs.map(item =>{
            if(item.name == name){
                arr.push(item)
            }
        })
        return arr
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        const Option = Select.Option;
        const {city,} = this.state;
        const {country, bank, province} = this.props;
        const CheckboxGroup = Checkbox.Group;
        const checkboxOptions = (this.handleConfigs('invested_experience'))[0].children.map(item=>{
            return { label: item.title, value: item.value }
        });
        return (
        <Col span={24} >
            <Form onSubmit={this.handleSubmitTwo}>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        label={<span>总资产</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('total_assets', {
                            rules: [{required: true, message: '请选择',}],
                        })(
                            <Select
                            placeholder="请选择"
                            >
                            {(this.handleConfigs('assets'))[0].children.map(option => (
                                <Option  key={option.value}>
                                    {option.title}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={12} >
                        <FormItem 
                        label={<span>净资产</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('net_assets', {
                            rules: [{
                                required: true, message: '请选择',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            >
                            {(this.handleConfigs('assets'))[0].children.map(option => (
                                <Option  key={option.value}>
                                    {option.title}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        label={<span>收入来源</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('income_sourceId', {
                            rules: [{
                                required: true, message: '请选择',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            >
                            {(this.handleConfigs('income_source'))[0].children.map(option => (
                                <Option  key={option.value}>
                                    {option.title}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={12} >
                        <FormItem 
                        label={<span>投资经验</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('invested_experience', {
                            rules: [{
                                required: true, message: '请选择',
                            }],
                        })(
                            <CheckboxGroup options={checkboxOptions} />
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        label={<span>投资年数</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('invested_yearsId', {
                            rules: [{
                                required: true, message: '请选择',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            >
                            {(this.handleConfigs('invested_years'))[0].children.map(option => (
                                <Option  key={option.value}>
                                    {option.title}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={12} >
                        <FormItem 
                        label={<span>知识水平</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('educationId', {
                            rules: [{
                                required: true, message: '请选择',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            >
                            {(this.handleConfigs('education'))[0].children.map(option => (
                                <Option  key={option.value}>
                                    {option.title}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        label={<span>投资目的</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('purpose_of_invested', {
                            rules: [{
                                required: true, message: '请填写您的投资目的',
                            }],
                        })(
                            <Input  />
                        )}
                        </FormItem>
                    </Col>
                    <Col span={12} >
                        <FormItem 
                        label={<span>投资额度</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('invested_quota', {
                            rules: [{
                                required: true, message: '请选择',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            >
                            {(this.handleConfigs('assets'))[0].children.map(option => (
                                <Option  key={option.value}>
                                    {option.title}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        label={<span>开户银行</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('bankId', {
                            rules: [{
                                required: true, message: '请选择',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            >
                            {bank.map(option => (
                                <Option  key={option.value}>
                                    {option.name}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={12} ></Col>
                </Row>
                <Row type="flex" align="middle" style={{marginTop: 15}}>
                    <Col span={8} >
                        <FormItem 
                        label={<span>居住地</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 9 }}
                        wrapperCol={{ span: 13 }}
                        colon={false}
                        >
                        {getFieldDecorator('country', {
                            rules: [{
                                required: true, message: '请选择您的银行所在地',
                                setFieldsValue: '1'
                            }],
                        })(
                            <Select
                                placeholder="请选择"
                                onChange={this.handleChange('countryId')}
                            >
                            {country.map(option => (
                                <Option  key={option.code}>
                                    {option.name}
                                </Option>
                            ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={4} >
                        <FormItem 
                        style={{marginBottom: 0}}
                        wrapperCol={{ span: 20 }}
                        colon={false}
                        >
                        {getFieldDecorator('provinceId', {
                            rules: [{
                                required: true, message: '请选择您的银行所在地',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            onChange={this.handleChange('provinceId')}
                            >
                                {province.map(option => (
                                    <Option  key={option.code}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={4} >  
                        <FormItem 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        colon={false}
                        >
                        {getFieldDecorator('cityId', {
                            rules: [{
                                required: true, message: '请选择您的银行所在地',
                            }],
                        })(
                            <Select
                            placeholder="请选择"
                            onChange={this.handleChange('cityId')}
                            >
                                {city.map(option => (
                                    <Option  key={option.code}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                        </FormItem> 
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                    <Col span={12} >
                        <FormItem 
                        label={<span>银行账号</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('bank_card_number', {
                            rules: [{
                                required: true, message: '请输入您的银行账号',
                            }],
                        })(
                            <Input />
                        )}
                        </FormItem>
                    </Col>
                    <Col span={12} >
                        <FormItem 
                        label={<span>银行支行</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        colon={false}
                        >
                        {getFieldDecorator('bank_branch', {
                            rules: [{
                                required: true, message: '请输入您的银行支行',
                            }],
                        })(
                            <Input />
                        )}
                        </FormItem>
                    </Col>
                </Row>

                <Row type="flex" style={{marginTop: 15}}>
                    <Col span={24} >
                        <FormItem 
                        label={<span>备注</span>} 
                        style={{marginBottom: 0}}
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 12 }}
                        colon={false}
                        >
                        {getFieldDecorator('financial_remarks', {
                            rules: [{
                                required: true, message: '请输入您的备注',
                            }],
                        })(
                            <Input />
                        )}
                        </FormItem>
                    </Col>
                </Row>
                
                <Row type="flex" align="right" style={{marginTop: 15}}>
                    <Col span={24}>
                        <Col span={4} style={{float: 'right'}} >
                            <FormItem>
                                <Button htmlType="submit" type="primary">下一步</Button>
                            </FormItem> 
                        </Col>
                        <Col span={4} style={{float: 'right'}} >
                            <FormItem>
                                <Button onClick={() => this.prev()}>上一步</Button>
                            </FormItem> 
                        </Col>
                    </Col>
                </Row>
            </Form>
        </Col>
    )}
}
Two = withStyles(styles, { withTheme: true })  (withRouter(Form.create()(Two)));

class CenterAuthentication extends Component {
    constructor(props){        
        super(props)       
         
    };   
    state = {
        copied: false,
        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false,
        type: '1',
        values: '',
        current: 0,
        countryId: '1',
        provinceId: '',
        cityId: '',
        bankProvinceId: '',
        previewVisible: false,
        country:[],
        province:[],
        city:[],
        bank:[],
        previewImage: '',
        one: {
            name: '',
            country: '1',
            address: "",
            base_remark: "",
            birthday: '',
            cityId: "",
            postcode: "",
            provinceId: "",
            sex: "",
        },
        two: {
            bankId: "",
            bank_branch: "",
            bank_card_number: "",
            cityId: "",
            country: "1",
            educationId: "",
            financial_remarks: "",
            income_sourceId: "",
            invested_quota: "",
            invested_yearsId: "",
            net_assets: "",
            provinceId: "",
            purpose_of_invested: "",
            total_assets: "",
        },
        thr: '',
        configs: '',
    }; 
    componentWillMount = () => {
        const key = JSON.parse(sessionStorage.getItem('key'));
        this.setState ({
          key: key,
        })
        const that = this;
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
        Axios.get('/banks')
        .then(function (response) {
            const data = response.data.data;
            that.setState ({
                bank: data,
            })
        });
        Axios.get('/configs')
        .then(function (response) {
            that.setState ({
                configs: response.data.data,
            })
        })
    } 
    handleSubmit = (e) => {
        const that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            console.log(that.state)
            const investedExperience = that.state.two.invested_experience.join(",");
            const attachmentArr = [];
            attachmentArr.push(values.bankFileA.file.response.data.id);
            attachmentArr.push(values.bankFileB.file.response.data.id);
            attachmentArr.push(values.identityFileA.file.response.data.id);
            attachmentArr.push(values.identityFileB.file.response.data.id);
            const attachmentStr = attachmentArr.join(",");
            const data = {
                customerData:{
                    finance_information:{
                        'total_assets': that.state.two.total_assets,
                        'net_assets': that.state.two.net_assets,
                        'income_source': that.state.two.income_sourceId,
                        'invested_experience': investedExperience,
                        'number_of_years_invested': that.state.two.invested_yearsId,
                        'education': that.state.two.educationId,
                        'purpose_of_invested': that.state.two.purpose_of_invested,
                        'invested_quota': that.state.two.invested_quota,
                        'bank': that.state.two.bankId,
                        'country_of_bank': that.state.two.country,
                        'province_of_bank': that.state.two.provinceId,
                        'city_of_bank': that.state.two.cityId,
                        'bank_card_number': that.state.two.bank_card_number,
                        'bank_branch': that.state.two.bank_branch,
                        'financial_remarks': that.state.two.financial_remarks,
                    },
                    certificate_information:{
                        'proof_of_identity': values.identityId,
                        'proof_of_identity_number': values.identityNum,
                    },
                    'name': that.state.one.name,
                    'sex': that.state.one.sex,
                    'birthday': that.state.one.date_picker,
                    'country': that.state.one.country,
                    'province': that.state.one.provinceId,
                    'city': that.state.one.cityId,
                    'postcode': that.state.one.postcode,
                    'address': that.state.one.address,
                    'base_remark': that.state.one.base_remark,
                    'attachment': attachmentStr,
                }
            }
            Axios.post('/user/account/create',data)
            .then(function (response) {
                that.props.handleState('1');
                message.success('开户成功')
            }) 
            .catch(function (error) {
                message.warning(error.response.data.message);
            }); 
          }
        });
    }  
    handleChange = (img,lod) => (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ [lod]: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                [img]: imageUrl,
                [lod]: false,
            }));
        }
    }
    goToNext = (current,values,name) => {
        // const current = this.state.current + 1;
        this.setState({ current:current, [name]:values });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    handleCancel = () => {this.setState({ previewVisible: false })};
    
    handlePreview = (file) =>  {
        this.setState({
            previewImage: file.url,
            previewVisible: true,
        });
    }
    handleConfigs = (name) =>{
        let arr = []
        this.state.configs.map(item =>{
            if(item.name == name){
                arr.push(item)
            }
        })
        return arr
    }
    
    handleChange1 = ({ fileList }) => this.setState({ identityFileListA: fileList });
    handleChange2 = ({ fileList }) => this.setState({ identityFileListB: fileList });
    handleChange3 = ({ fileList }) => this.setState({ bankFileListA: fileList });
    handleChange4 = ({ fileList }) => this.setState({ bankFileListB: fileList });
    render() {
        const { Content } = Layout;
        const { classes } = this.props;
        const picHeaders = {
            'Authorization': 'Bearer '+this.state.key.access_token,
            'x-api-agent': '32db75a0a1eb11e89f4fcae7d8f1e761'
        }
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        const uploadButton = (
            <div>
                <p className="ant-upload-drag-icon">
                <Icon type="camera" />
                </p>
                <p className="ant-upload-text">点击上传证件</p>
            </div>
          );
        const Option = Select.Option;
        const { configs, one, country, province, two,  bank, current, imageUrl1, imageUrl2, imageUrl3, imageUrl4, } = this.state;
        const Step = Steps.Step;
        // console.log(this.state)
        return (
            <Layout style={{background: '#fff',padding: '0 200px'}}>
                <Steps current={current} className={classes.stepsContent}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <Content className={classes.content}>
                    <Row type="flex" justify="center" align="middle" className={classes.row} >
                        {current == 0 &&
                            <One goToNext={this.goToNext} country={country} current={current} one={one} province={province}  />
                        }   

                        {current == 1 &&
                            <Two goToNext={this.goToNext} current={current} country={country} bank={bank} configs={configs} two={two} province={province} />
                        }

                        {current == 2 &&
                        <Col span={24}>
                            <Form onSubmit={this.handleSubmit}>
                                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                                    <Col span={12} >
                                        <FormItem 
                                        label={<span>身份证明类型</span>} 
                                        style={{marginBottom: 0}}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        colon={false}
                                        >
                                        {getFieldDecorator('identityId', {
                                            rules: [{required: true, message: '请选择',}],
                                        })(
                                            <Select
                                            placeholder="请选择"
                                            >
                                                {(this.handleConfigs('identity'))[0].children.map(option => (
                                                    <Option  key={option.value}>
                                                        {option.title}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12} >
                                        <FormItem 
                                        label={<span>身份证明号码</span>} 
                                        style={{marginBottom: 0}}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        colon={false}
                                        >
                                        {getFieldDecorator('identityNum', {
                                            rules: [{
                                                required: true, message: '请输入您的身份证明号码',
                                            }],
                                        })(
                                            <Input placeholder='请输入您的身份证明号码' />
                                        )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                                    <Col span={12} >
                                        <FormItem 
                                        label={<span>身份证明正面</span>} 
                                        style={{marginBottom: 0}}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        colon={false}
                                        >{getFieldDecorator('identityFileA', {
                                            rules: [{
                                                required: true, message: '请上传您的身份证明照片',
                                            }],
                                        })(
                                            <Upload.Dragger
                                            name="file" 
                                            onChange={this.handleChange('imageUrl1','loading1')} 
                                            action="https://api.gqfxcn.com/center/user/attachment/upload?type=3"
                                            headers={picHeaders}
                                            onPreview={this.handlePreview}
                                            beforeUpload={beforeUpload}
                                            >
                                            {imageUrl1 ? <img src={imageUrl1} style={{width: 100}}/> : uploadButton}
                                            </Upload.Dragger>
                                        )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12} >
                                        <FormItem 
                                        label={<span>身份证明反面</span>} 
                                        style={{marginBottom: 0}}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        colon={false}
                                        >{getFieldDecorator('identityFileB', {
                                            rules: [{
                                                required: true, message: '请上传您的身份证明照片',
                                            }],
                                        })(
                                            <Upload.Dragger
                                            name="file" 
                                            onChange={this.handleChange('imageUrl2','loading2')} 
                                            action="https://api.gqfxcn.com/center/user/attachment/upload?type=2"
                                            headers={picHeaders}
                                            onPreview={this.handlePreview}
                                            beforeUpload={beforeUpload}
                                            >
                                            {imageUrl2 ? <img src={imageUrl2} style={{width: 100}}/> : uploadButton}
                                            </Upload.Dragger>
                                        )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center" align="middle" style={{marginTop: 15}}>
                                    <Col span={12} >
                                        <FormItem 
                                        label={<span>银行卡正面</span>} 
                                        style={{marginBottom: 0}}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        colon={false}
                                        >{getFieldDecorator('bankFileA', {
                                            rules: [{
                                                required: true, message: '请上传您的身份证明照片',
                                            }],
                                        })(
                                             <Upload.Dragger 
                                             name="file" 
                                             onChange={this.handleChange('imageUrl3','loading3')} 
                                             action="https://api.gqfxcn.com/center/user/attachment/upload?type=4"
                                             headers={picHeaders}
                                             onPreview={this.handlePreview}
                                             beforeUpload={beforeUpload}
                                             >
                                             {imageUrl3 ? <img src={imageUrl3} style={{width: 100}}/> : uploadButton}
                                             </Upload.Dragger>
                                        )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12} >
                                        <FormItem 
                                        label={<span>银行卡反面</span>} 
                                        style={{marginBottom: 0}}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        colon={false}
                                        >{getFieldDecorator('bankFileB', {
                                            rules: [{
                                                required: true, message: '请上传您的身份证明照片',
                                            }],
                                        })(
                                            <Upload.Dragger
                                            name="file" 
                                            onChange={this.handleChange('imageUrl4','loading4')} 
                                            action="https://api.gqfxcn.com/center/user/attachment/upload?type=5"
                                            headers={picHeaders}
                                            onPreview={this.handlePreview}
                                            beforeUpload={beforeUpload}
                                            >
                                            {imageUrl4 ? <img src={imageUrl4} style={{width: 100}}/> : uploadButton}
                                            </Upload.Dragger>
                                            
                                        )}
                                        </FormItem>
                                    </Col>
                                </Row>                            
                                <Row type="flex" align="right" style={{marginTop: 15}}>
                                    <Col span={24}>
                                        <Col span={4} style={{float: 'right'}} >
                                            <FormItem>
                                                <Button htmlType="submit" type="primary">完成</Button>
                                            </FormItem> 
                                        </Col>
                                        <Col span={4} style={{float: 'right'}} >
                                            <FormItem>
                                                <Button onClick={() => this.prev()}>上一步</Button>
                                            </FormItem> 
                                        </Col>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        }
                    </Row>
                    
                </Content>
            </Layout>
            
        );
    }


}
export default withStyles(styles, { withTheme: true })  (withRouter(Form.create()(CenterAuthentication)));
