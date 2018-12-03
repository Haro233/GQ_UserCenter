import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import '../styles/User.scss';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import CenterAuthentication from './CenterAuthentication';
import { Tabs, Select, Input, Col, DatePicker, Upload, Icon, Modal, Steps, Button, message, Checkbox, } from 'antd';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#fff', 
        color: '#000',
        '& h2':{
            marginBottom: 20,
        }
    },
    rootTwo: {
        width: '60%',
        margin: '50px auto',
        
    },
    centerChange:{
        display: 'flex',
        width: '65%',
        flexWrap: 'wrap',
        '& ul':{
            width: '100%'
        },
        '& li':{
            marginBottom: 10,
            width: '100%',
            display: 'flex',
            alignItems: 'baseline',
        },
    },
    col:{
        textAlign: 'right',
        height: 32,
        lineHeight: '32px',
        marginBottom: 15,
    },
    changeCol:{
        textAlign: 'right',
        height: 60,
        marginBottom: 15,
        '& span':{
            fontSize: 12,
        }
    },
    changeUserAccountMsg:{
        cursor: 'pointer',
        width: 40,
        height: 30,
        color: '#666',
        borderRadius: 5,
        textAlign: 'center',
        border: '1px #d9d9d9 solid',
        lineHeight: '30px',
    },
    dialogContentText:{
        '& span':{
            color: 'red',
        }
    },
    stepsContent:{
        marginBottom: 25,
    },
    btn:{
        marginRight: 15,
    }
})

const TOF = [
    {
      value: '1',
      label: '是',
    },
    {
      value: '2',
      label: '否',
    },
];
const sex = [
    {
      value: '0',
      label: '男',
    },
    {
      value: '1',
      label: '女',
    },
];

const PE = [
    {
        value: '1',
        label: '具有金融机构的相关工作经验',
    },
    {
        value: '2',
        label: '具有金融相关的教育背景和专业资质',
    },
    {
        value: '3',
        label: '没有',
    },
]

const Step = Steps.Step;

const steps =[{
    title: '提交基本资料',
},{
    title: '补充财务信息',
},{
    title: '上传身份证明',
}]

class AllInput extends Component {
    constructor(props){        
        super(props) 
        const that = this; 
        if(this.props.data.customer == null){
            that.state = {
                key: '',
                current: 0,
                userData: that.props.data,
                name: '',
                info: {},
                sex: '0',
                country: [],
                countryId: '1',
                bankCountryId: '1',
                province: [],
                provinceId: '2',
                bankProvinceId: '2',
                city: [],
                cityId: '3',
                bankCityId: '3',
                address: '',
                email: '',
                mobile: '',
                accounts: [],
                previewVisible: false,
                previewImage: '',
                identityFileListA: [],
                identityFileListB: [],
                bankFileListA: [],
                bankFileListB: [],
                isDisabled: true,
                is_otc_or_cfd: '1',
                is_gt_two_month_of_trade_experience: '1',
                is_gt_twenty_times_of_trade: '1',
                professional_experience_and_background: '1',
                assets: [],
                total_assets: '2',
                net_assets: '2',
                invested_quota: '3',
                income_source: [],
                income_sourceId: '1',
                invested_years: [],
                invested_yearsId: '1',
                education: [],
                educationId: '1',
                bank: [],
                bankId: '1',
                identity: [],
                identityNum: '',
                identityId: '1',
                birthday: '',
                postcode: '',
                base_remark: '',
                purpose_of_invested: '',
                bank_card_number: '',
                bank_branch: '',
                investedExperience: [],
                experienceArr: [],
                checked1: false,
                checked2: false,
                checked3: false,
                checked4: false,
                checked5: false,
                financial_remarks: '',
                activeKey: '1',
            };    
        }else{
            that.state = {
                key: '',
                current: 0,
                userData: that.props.data,
                name: that.props.data.customer.info.name,
                info: {},
                sex: that.props.data.customer.info.sex,
                country: [],
                countryId: '1',
                bankCountryId: '1',
                province: [],
                provinceId: that.props.data.customer.info.province,
                bankProvinceId: that.props.data.customer.info.province_of_bank,
                city: [],
                cityId: that.props.data.customer.info.city,
                bankCityId: that.props.data.customer.info.city_of_bank,
                address: that.props.data.customer.info.address,
                email: that.props.data.customer.info.email,
                mobile: that.props.data.customer.info.mobile,
                accounts: [],
                previewVisible: false,
                previewImage: '',
                identityFileListA: [],
                identityFileListB: [],
                bankFileListA: [],
                bankFileListB: [],
                isDisabled: true,
                is_otc_or_cfd: '1',
                is_gt_two_month_of_trade_experience: '1',
                is_gt_twenty_times_of_trade: '1',
                professional_experience_and_background: '1',
                assets: [],
                total_assets: '2',
                net_assets: '2',
                invested_quota: '3',
                income_source: [],
                income_sourceId: '1',
                invested_years: [],
                invested_yearsId: '1',
                education: [],
                educationId: '1',
                bank: [],
                bankId: '1',
                identity: [],
                identityNum: '',
                identityId: '1',
                birthday: '',
                postcode: '',
                base_remark: '',
                purpose_of_invested: '',
                bank_card_number: '',
                bank_branch: '',
                investedExperience: [],
                experienceArr: [],
                checked1: false,
                checked2: false,
                checked3: false,
                checked4: false,
                checked5: false,
                financial_remarks: '',
                activeKey: '1',
            };    
        }
           
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
        Axios.get('/country?parent_code='+this.state.provinceId)
        .then(function (response) {
            that.setState ({
                city: response.data.data,
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
                // configs: response.data.data,
                assets: response.data.data[8].children,
                income_source: response.data.data[9].children,
                invested_years: response.data.data[11].children,
                education: response.data.data[12].children,
                identity: response.data.data[6].children,
                investedExperience: response.data.data[10].children,
            })
        })
    }   
    changeUserAccountMsg = () =>{
        this.setState({ 
            isDisabled: false 
        });
    };

    changeAccountMsgPage = event =>{
        let key = parseInt(this.state.activeKey)
        const that = this;
        if(key < 3){
            that.setState({ 
                activeKey: String(key + 1) 
            });
        }
        else{
            if(that.state.identityFileListA != ''){
                const attachmentArr = [];
                attachmentArr.push(that.state.identityFileListA[0].response.data.id)
                attachmentArr.push(that.state.identityFileListB[0].response.data.id)
                attachmentArr.push(that.state.bankFileListA[0].response.data.id)
                attachmentArr.push(that.state.bankFileListB[0].response.data.id)
                const data = {
                    customerData:{
                        'name': that.state.name,
                        'sex': that.state.sex,
                        'birthday': that.state.birthday,
                        'country': that.state.countryId,
                        'province': that.state.provinceId,
                        'city': that.state.cityId,
                        'postcode': that.state.postcode,
                        'address': that.state.address,
                        'base_remark': that.state.base_remark,
                        'total_assets': that.state.total_assets,
                        'net_assets': that.state.net_assets,
                        'income_source': that.state.income_sourceId,
                        'invested_experience': that.state.experienceArr,
                        'number_of_years_invested': that.state.invested_yearsId,
                        'education': that.state.educationId,
                        'purpose_of_invested': that.state.purpose_of_invested,
                        'invested_quota': that.state.invested_quota,
                        'bank': that.state.bankId,
                        'country_of_bank': that.state.bankCountryId,
                        'province_of_bank': that.state.bankProvinceId,
                        'city_of_bank': that.state.bankCityId,
                        'bank_card_number': that.state.bank_card_number,
                        'bank_branch': that.state.bank_branch,
                        'is_otc_or_cfd': '1',
                        'is_gt_two_month_of_trade_experience': '1',
                        'is_gt_twenty_times_of_trade': '1',
                        'financial_remarks': that.state.financial_remarks,
                        'professional_experience_and_background': '1',
                        'proof_of_identity': that.state.identityId,
                        'proof_of_identity_number': that.state.identityNum,
                        'attachment': attachmentArr,
                    }
                }
                Axios.post('/user/updatedata',data)
                .then(function (response) {
                    swal('修改成功')
                })
                console.log(data)
            }
            
        }
    }
    changeCancel = () =>{
        this.setState({ 
            isDisabled: true 
        });
    };

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

    handleCheckedChange = (name,value) => event =>{
        
        let arr = this.state.experienceArr;
        const that = this;
        if(event.target.checked === true){
            arr.push(value)
            that.setState({
                experienceArr: arr,
            });
        }
        else{
            let Value = value;
            Array.prototype.indexOf = function(val) {
                for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
                }
                return -1;
            };
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                this.splice(index, 1);
                }
            };
            arr.remove(Value.toString());
            that.setState({
                experienceArr: arr,
            });
        }
        
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    handleCancel = () => {this.setState({ previewVisible: false })};

    handlePreview = (file) =>  {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    register = (type) => event =>{
        
        const that = this;
        const attachmentArr = [];
        if(
            that.state.identityFileListA != '' &&
            that.state.identityFileListB != '' &&
            that.state.bankFileListA != '' &&
            that.state.bankFileListB != '' 
        ){
            attachmentArr.push(that.state.identityFileListA[0].response.data.id)
            attachmentArr.push(that.state.identityFileListB[0].response.data.id)
            attachmentArr.push(that.state.bankFileListA[0].response.data.id)
            attachmentArr.push(that.state.bankFileListB[0].response.data.id)
            const data = {
                customerData:{
                    'name': that.state.name,
                    'sex': that.state.sex,
                    'birthday': that.state.birthday,
                    'country': that.state.countryId,
                    'province': that.state.provinceId,
                    'city': that.state.cityId,
                    'postcode': that.state.postcode,
                    'address': that.state.address,
                    'base_remark': that.state.base_remark,
                    'total_assets': that.state.total_assets,
                    'net_assets': that.state.net_assets,
                    'income_source': that.state.income_sourceId,
                    'invested_experience': that.state.experienceArr,
                    'number_of_years_invested': that.state.invested_yearsId,
                    'education': that.state.educationId,
                    'purpose_of_invested': that.state.purpose_of_invested,
                    'invested_quota': that.state.invested_quota,
                    'bank': that.state.bankId,
                    'country_of_bank': that.state.bankCountryId,
                    'province_of_bank': that.state.bankProvinceId,
                    'city_of_bank': that.state.bankCityId,
                    'bank_card_number': that.state.bank_card_number,
                    'bank_branch': that.state.bank_branch,
                    'is_otc_or_cfd': '0',
                    'is_gt_two_month_of_trade_experience': '0',
                    'is_gt_twenty_times_of_trade': '0',
                    'financial_remarks': that.state.financial_remarks,
                    'professional_experience_and_background': '0',
                    'proof_of_identity': that.state.identityId,
                    'proof_of_identity_number': that.state.identityNum,
                    'attachment': attachmentArr,
                }
            }
            Axios.post('/user/account/create',data)
            .then(function (response) {
                that.props.handleState('1');
                swal('开户成功')
            }) 
            .catch(function (error) {
                swal('开户失败，请填写完整信息');
            }); 
        }else{
            swal('请填写完整信息');
        }
              
    }
    handleFileChange1 = ({ fileList }) => this.setState({ identityFileListA: fileList });
    handleFileChange2 = ({ fileList }) => this.setState({ identityFileListB: fileList });
    handleFileChange3 = ({ fileList }) => this.setState({ bankFileListA: fileList });
    handleFileChange4 = ({ fileList }) => this.setState({ bankFileListB: fileList });
    dateChange = (date,dateString) => this.setState({ birthday: dateString });
    onTabsChange = (activeKey) => {
        this.setState({ activeKey });
    }
     render() {
        const { classes } = this.props;
        const { assets, income_source, country, city, province, invested_years, education, bank, identity, current, investedExperience} = this.state;
        
        const { TextArea } = Input;
        const InputGroup = Input.Group;

        let provinceArr = []
        let cityArr = []
        let countryArr = []
        let assetsArr = []
        let incomeSourceArr = []
        let educationArr = []
        let investedYearsArr = []
        let identityArr = []
        let bankArr = []
        let investedExperienceArr = []
        for (let i in bank) {
            bankArr.push(bank[i])
        }
        for (let i in identity) {
            identityArr.push(identity[i])
        }
        for (let i in investedExperience) {
            investedExperienceArr.push(investedExperience[i])
        }
        for (let i in education) {
            educationArr.push(education[i])
        }
        for (let i in invested_years) {
            investedYearsArr.push(invested_years[i])
        }
        for (let i in income_source) {
            incomeSourceArr.push(income_source[i])
        }
        for (let i in assets) {
            assetsArr.push(assets[i])
        }
        for (let i in country) {
            countryArr.push(country[i])
        }
        for (let i in province) {
            provinceArr.push(province[i])
        }
        for (let i in city) {
            cityArr.push(city[i])
        }
        const TabPane = Tabs.TabPane;
        const Option = Select.Option;
        const { previewVisible, previewImage, identityFileListA, identityFileListB, bankFileListA, bankFileListB, isDisabled,  } = this.state;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        const picHeaders = {
            'Authorization': 'Bearer '+this.state.key.access_token,
            'x-api-agent': '32db75a0a1eb11e89f4fcae7d8f1e761'
        }
        return (
            <div>
            {   this.props.pageType === 2 &&
                <div className={classes.root}>
                <h2>账户资料</h2>
                <Tabs activeKey={this.state.activeKey} onChange={this.onTabsChange}>
                    <TabPane tab="帐户基本资料"  
                    key="1"
                    >
                        <div className={classes.centerChange}>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>姓名:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Input
                                    placeholder={this.state.name}
                                    onChange={this.handleMsgChange('name')}
                                    disabled={isDisabled}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>性别:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    defaultValue="请选择"
                                    value={this.state.sex}
                                    onChange={this.handleChange('sex')}
                                    disabled={isDisabled}
                                    >
                                    {sex.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>出生年月:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <DatePicker
                                        onChange={this.dateChange}
                                        disabled={isDisabled}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>居住地:
                                    </span>
                                </Col>
                                <Col span={18}>
                                    <Select
                                    value={this.state.countryId}
                                    onChange={this.handleChange('countryId')}
                                    disabled={isDisabled}
                                    >
                                    {countryArr.map(option => (
                                        <Option value={option.code} key={option.code}>
                                            {option.name}
                                        </Option>
                                    ))}
                                    </Select>
                                    <Select
                                    value={this.state.provinceId}
                                    onChange={this.handleChange('provinceId')}
                                    disabled={isDisabled}
                                    >
                                    {provinceArr.map(option => (
                                        <Option value={option.code} key={option.code}>
                                            {option.name}
                                        </Option>
                                    ))}
                                    </Select>
                                    <Select
                                    value={this.state.cityId}
                                    onChange={this.handleChange('cityId')}
                                    disabled={isDisabled}
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
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>邮编:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Input
                                        placeholder={this.state.postcode}
                                        disabled={isDisabled}
                                        onChange={this.handleMsgChange('postcode')}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>详细地址:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Input
                                    placeholder={this.state.address}
                                    onChange={this.handleMsgChange('address')}
                                    disabled={isDisabled}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        备注:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <TextArea 
                                    autosize 
                                    disabled={isDisabled}
                                    placeholder={this.state.base_remark}
                                    onChange={this.handleMsgChange('base_remark')}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>邮箱:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Input
                                    placeholder={this.state.email}
                                    onChange={this.handleMsgChange('email')}
                                    disabled={isDisabled}
                                    />
                                </Col>
                            </InputGroup>
                        </div>
                    </TabPane>
                    <TabPane tab="帐户财务资料"  
                    key="2"
                    selected={false}
                    >
                        <div className={classes.centerChange}>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>总资产:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    defaultValue="请选择"
                                    value={this.state.total_assets}
                                    onChange={this.handleChange('total_assets')}
                                    disabled={isDisabled}
                                    >
                                    {assetsArr.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.title}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>净资产:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    defaultValue="请选择"
                                    value={this.state.net_assets}
                                    onChange={this.handleChange('net_assets')}
                                    disabled={isDisabled}
                                    >
                                    {assetsArr.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.title}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>收入来源:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    defaultValue="请选择"
                                    value={this.state.income_sourceId}
                                    onChange={this.handleChange('income_sourceId')}
                                    disabled={isDisabled}
                                    >
                                    {incomeSourceArr.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.title}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>投资经验:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    {investedExperienceArr.map((option) => (
                                        <Checkbox
                                        value={this.state.checked+option.value}
                                        key={option.id}
                                        onChange={this.handleCheckedChange('checked'+option.value,option.value)}
                                        >
                                            {option.title}
                                        </Checkbox>
                                    ))}
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>投资年数:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    value={this.state.invested_yearsId}
                                    onChange={this.handleChange('invested_yearsId')}
                                    disabled={isDisabled}
                                    >
                                    {investedYearsArr.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.title}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>知识水平:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    value={this.state.educationId}
                                    onChange={this.handleChange('educationId')}
                                    disabled={isDisabled}
                                    >
                                    {educationArr.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.title}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>投资目的:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Input
                                    placeholder={this.state.purpose_of_invested}
                                    onChange={this.handleMsgChange('purpose_of_invested')}
                                    disabled={isDisabled}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>投资额度:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    value={this.state.invested_quota}
                                    onChange={this.handleChange('invested_quota')}
                                    disabled={isDisabled}
                                    >
                                    {assetsArr.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.title}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>开户银行:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    value={this.state.bankId}
                                    onChange={this.handleChange('bankId')}
                                    disabled={isDisabled}
                                    >
                                    {bankArr.map(option => (
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
                                        <span>*</span>银行所在地:
                                    </span>
                                </Col>
                                <Col span={18}>
                                    <Select
                                    value={this.state.bankCountryId}
                                    onChange={this.handleChange('bankCountryId')}
                                    disabled={isDisabled}
                                    >
                                    {countryArr.map(option => (
                                        <Option value={option.code} key={option.code}>
                                            {option.name}
                                        </Option>
                                    ))}
                                    </Select>
                                    <Select
                                    value={this.state.bankProvinceId}
                                    onChange={this.handleChange('bankProvinceId')}
                                    disabled={isDisabled}
                                    >
                                    {provinceArr.map(option => (
                                        <Option value={option.code} key={option.code}>
                                            {option.name}
                                        </Option>
                                    ))}
                                    </Select>
                                    <Select
                                    value={this.state.bankCityId}
                                    onChange={this.handleChange('bankCityId')}
                                    disabled={isDisabled}
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
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>银行账号:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Input
                                    placeholder={this.state.bank_card_number}
                                    onChange={this.handleMsgChange('bank_card_number')}
                                    disabled={isDisabled}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        备注:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <TextArea
                                    autosize
                                    disabled={isDisabled}
                                    placeholder={this.state.financial_remarks}
                                    onChange={this.handleMsgChange('financial_remarks')}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>银行支行:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Input
                                    placeholder={this.state.bank_branch}
                                    onChange={this.handleMsgChange('bank_branch')}
                                    disabled={isDisabled}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.changeCol}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>过去三年，你曾经通过一个类似的机构，交易过OTC的保证金外汇或CFD交易么:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    value={this.state.is_otc_or_cfd}
                                    onChange={this.handleChange('is_otc_or_cfd')}
                                    disabled={isDisabled}
                                    >
                                    {TOF.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.changeCol}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>是否有至少2个月的交易经验:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    value={this.state.is_gt_two_month_of_trade_experience}
                                    onChange={this.handleChange('is_gt_two_month_of_trade_experience')}
                                    disabled={isDisabled}
                                    >
                                    {TOF.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.changeCol}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>在过去的12个月内，您是否至少交易过20次？
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    value={this.state.is_gt_twenty_times_of_trade}
                                    onChange={this.handleChange('is_gt_twenty_times_of_trade')}
                                    disabled={isDisabled}
                                    >
                                    {TOF.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.changeCol}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>请提供可以帮助您理解我们服务的专业经验和背景:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    value={this.state.professional_experience_and_background}
                                    onChange={this.handleChange('professional_experience_and_background')}
                                    disabled={isDisabled}
                                    >
                                    {PE.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                        </div>
                    </TabPane>
                    <TabPane tab="帐户证件信息"  
                    key="3"
                    selected={false}
                    >
                        <div className={classes.centerChange}>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>身份证明类型:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Select
                                    value={this.state.identityId}
                                    onChange={this.handleChange('identityId')}
                                    disabled={isDisabled}
                                    >
                                    {identityArr.map(option => (
                                        <Option value={option.value} key={option.value}>
                                            {option.title}
                                        </Option>
                                    ))}
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>身份证明号码:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Input
                                        onChange={this.handleMsgChange('identityNum')}
                                        disabled={isDisabled}
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>身份证明正面:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Upload
                                    action="https://api.gqfxcn.com/center/user/attachment/upload?type=3"
                                    headers={picHeaders}
                                    listType="picture-card"
                                    fileList={identityFileListA}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleFileChange1}
                                    disabled={isDisabled}
                                    >
                                    {identityFileListA.length >= 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>身份证明反面:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Upload
                                    action="https://api.gqfxcn.com/center/user/attachment/upload?type=2"
                                    headers={picHeaders}
                                    listType="picture-card"
                                    fileList={identityFileListB}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleFileChange2}
                                    disabled={isDisabled}
                                    >
                                    {identityFileListB.length >= 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>银行卡正面:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Upload
                                    action="https://api.gqfxcn.com/center/user/attachment/upload?type=4"
                                    headers={picHeaders}
                                    listType="picture-card"
                                    fileList={bankFileListA}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleFileChange3}
                                    disabled={isDisabled}
                                    >
                                    {bankFileListA.length >= 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </Col>
                            </InputGroup>
                            <InputGroup>
                                <Col span={5} className={classes.col}>
                                    <span className={classes.dialogContentText} >
                                        <span>*</span>银行卡反面:
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <Upload
                                    action="https://api.gqfxcn.com/center/user/attachment/upload?type=5"
                                    headers={picHeaders}
                                    listType="picture-card"
                                    fileList={bankFileListB}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleFileChange4}
                                    disabled={isDisabled}
                                    >
                                    {bankFileListB.length >= 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </Col>
                            </InputGroup>
                        </div>
                    </TabPane>
                </Tabs>
                {this.state.isDisabled == false &&
                    <div>
                        <Button type="primary" onClick={this.changeAccountMsgPage} className={classes.btn}>提交审核</Button>
                        <Button onClick={this.changeCancel}>取消</Button>
                    </div>
                }
                {this.state.isDisabled == true &&
                    <div className={classes.changeUserAccountMsg} onClick={this.changeUserAccountMsg}>编辑</div>
                }
                
            </div>}
            {   this.props.pageType === 1 &&
                <CenterAuthentication handleState={this.props.handleState} />
            }
            </div>
        );
    }


}
export default  withStyles(styles, { withTheme: true })  (withRouter(AllInput));