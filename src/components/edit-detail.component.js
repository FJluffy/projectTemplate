import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { Link } from 'react-router-dom';
import FileUpload from './fileUpload';

export default class EditDetail extends Component {
    constructor(props) {
        super(props);
    this.onChangeAccountname = this.onChangeAccountname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateImages = this.updateImages.bind(this);

    this.state = {
        accountname: '',
        description: '',
        price: 0,
        date: new Date(),
        images: []
    }
}

    componentDidMount() {
        axios.get('http://localhost:8080/details/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    accountname: response.data.accountname,
                    description: response.data.description,
                    price: response.data.price,
                    date: new Date(response.data.date),
                    images: response.data.images
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        ////associate to account
        //axios.get('http://localhost:8080/accounts/')
        //    .then(response => {
        //        if (response.data.length > 0) {
        //            this.setState({
        //                accounts: response.data.map(account => account.accountname),
        //            })
        //        }
        //    })
    }

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

    updateImages(newImages) {
        console.log(newImages);
        this.setState({
            images: newImages
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const detail = {
            accountname: this.state.accountname,
            description: this.state.description,
            price: this.state.price,
            date: this.state.date,
            images: this.state.images
        }
        console.log(detail);

        axios.post('http://localhost:8080/details/update/'+ this.props.match.params.id, detail)
            //.then(res => console.log(res.data));
            .then(res => {
                if (!res.data.errcode) {
                    alert('Successsfully edited detail')
                } else {
                    alert('Failed to edit account detail')
                }
            });
                //window.location.href = '/'
    }
    render() {
        return (
            <div>
                <h3>Edit {this.state.accountname}</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"  required  className="form-control"
                            value={this.state.description}  onChange={this.onChangeDescription}   />
                    </div>
                    <div className="form-group">
                        <label>Price (in RMB): </label>
                        <input type="text"  required  className="form-control"
                            value={this.state.price}  onChange={this.onChangePrice}  />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker  selected={this.state.date}  onChange={this.onChangeDate}  />
                        </div>
                    </div>
                    <br />
                    <div><FileUpload refreshFunction={this.updateImages} /></div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Edit Detail Log" className="btn btn-primary" />
                    </div>                  
                    <div className="form-group">
                        <Link to="/admin" className="btn btn-primary">Go Back</Link>
                    </div>   
                </form>
            </div>
        )
    }
}