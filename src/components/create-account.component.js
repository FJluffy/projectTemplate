import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.onChangeAccountname = this.onChangeAccountname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            accountname : ""
        }
    }

    onChangeAccountname(e) {
        this.setState({
            accountname: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const account = {
            accountname: this.state.accountname,
        }
        console.log(account);

        axios.post("http://localhost:8080/accounts/add", account)
            .then(res => console.log(res.data));

        this.setState({
            accountname:""
        })
    }

    render() {

        return (
            <div>
                <h3>Create New Account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Accountname: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.accountname}
                            onChange={this.onChangeAccountname}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Account" className="btn btn-primary" />
                    </div>
                </form>
            </div>


        )
    }
}