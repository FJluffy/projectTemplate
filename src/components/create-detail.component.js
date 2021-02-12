import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { Link } from 'react-router-dom';
import FileUpload from './fileUpload';

export default class CreateDetail extends Component {
    constructor(props) {
        super(props);

        this.onChangeAccountname = this.onChangeAccountname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateImages = this.updateImages.bind(this);
        this.onChangeCampaign = this.onChangeCampaign.bind(this);

        this.state = {
            accountname :'',
            description: '',
            price: 0,
            date: new Date(),
            images: [],
            campaign:[{key:1, value:"dielianhua"},
                      {key:2, value:"longzhenghudou"},
                      {key:3, value:"changancheng"},
                      {key:4, value:"youyuelun"},
                      {key:5, value:"douzhuanxingyi"},
                      {key:6, value:"jiandanqinxin"},
                      {key:7, value:"qiankunyizhi"},
                      {key:8, value:"weiwoduzun"},
                      {key:9, value:"mengjiangnan"},
                      {key:10, value:"juedaitianjiao"},
                      {key:11, value:"tianepin"},
                      {key:12, value:"pozhenzi"},
                      {key:13, value:"feilongzaitian"},
                      {key:14, value:"qingmeizhujiu"},
                      {key:15, value:"lingxuecangfeng"},
                      {key:16, value:"fengyuetongtian"},
                      {key:17, value:"jianghuguren"}
            ],
            menpai:[{key:1, value:"lingxue"},
                    {key:2, value:"penglai"},
                    {key:3, value:"badao"},
                    {key:4, value:"changge"},
                    {key:5, value:"cangyun"},
                    {key:6, value:"gaibang"},
                    {key:7, value:"mingjiao"},
                    {key:8, value:"tangmen"},
                    {key:9, value:"wudu"},
                    {key:10, value:"cangjian"},
                    {key:11, value:"tiance"},
                    {key:12, value:"chunyang"},
                    {key:13, value:"shaolin"},
                    {key:14, value:"qixiu"},
                    {key:15, value:"wanhua"},
                    {key:16, value:"daxia"}
            ],
            role:[{key:1, value:"chengnan"},
                  {key:1, value:"chengnv"},
                  {key:1, value:"zhengtai"},
                  {key:1, value:"luoli"}

            ]
            //accounts:[]
}
}
    //}

    ////associate with account to use this function
    //componentDidMount() {
    //    axios.get('http://localhost:8080/accounts/')
    //        .then(response => {
    //            if (response.data.length > 0) {
    //                this.setState({
    //                    accounts: response.data.map(account => account.accountname),
    //                    accountname: response.data[0].accountname
    //                })
    //            }
    //        })
    //}

    onChangeAccountname(e) {
        this.setState({
            accountname: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onChangeCampaign(e){
        this.setState({
            campaign: e.target.value
        });
    }

    updateImages(newImages) {
        console.log(newImages);
        this.setState({
            images:newImages
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const detail = {
            accountname: this.state.accountname,
            description: this.state.description,
            price: this.state.price,
            date: this.state.date,
            images: this.state.images,
            campaign: this.state.campaign,
            menpai: this.state.menpai,
            role: this.state.role
        }
        console.log(detail);

        axios.post('http://localhost:8080/details/add/', detail)
            .then(res => {
                if (res.data.errcode) {
                    alert('Failed to create account detail')
                } else {
                    alert('Successsfully created detail')
                }
            });
        //window.location = '/';
    }
    render() {
        return (
            //this is an select box, if I want to associate with account,
            // I will use this,  but I don't need this in this app.
                //    <div className="form-group">
                //        <label>Accountname: </label>
                //        <select ref="accountInput"
                //            required
                //            className="form-control"
                //            value={this.state.accountname}
                //            onChange={this.onChangeAccountname}>
                //            {
                //                this.state.accounts.map(function (account) {
                //                    return <option
                //                        key={account}
                //                        value={account}>{account}
                //                    </option>
                //                })
                //            }
                //            </select>
                //    </div>
             <div>
                <h3>Create New Account Log</h3>
                <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                        <label>Accountname: </label>
                        <input type="text"  required  className="form-control"
                    value={this.state.account}  onChange={this.onChangeAccountname}  />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"  required  className="form-control"
                            value={this.state.description}  onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Price (in RMB): </label>
                        <input type="text"  required  className="form-control"
                            value={(this.state.price)} onChange={this.onChangePrice} />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date}  onChange={this.onChangeDate}  />
                        </div>
                    </div>
                        {/* <select onChange={this.onChangeCampaign}>
                            {this.state.campaign.map((item)=>(
                             <option key={item.key} value={item.key}>{item.value}</option>
                            ))}
                        </select> */}
                    <br />
                    <div><FileUpload refreshFunction={this.updateImages} /></div>
                    <br />
                        <div className="form-group">
                            <input type="submit" value="Create Detail Log" className="btn btn-primary" />
                    </div>
                    <div className="form-group">
                        <Link to="/admin" className="btn btn-primary">Go To Edit</Link>
                    </div>
                </form>
            </div>
        )
    }
}