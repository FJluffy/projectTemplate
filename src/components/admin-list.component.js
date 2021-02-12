import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Detail = props => (

    <tr>
        <td style={{ width: '200px' }}>
            <img src={`http://localhost:8080/${props.detail.images[0]}`}
                style={{ width: '200px', /*height: '160px',*/
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
        </td>
        <td> <Link to={"/details/" + props.detail._id}>{props.detail.accountname}</Link></td>
        <td><Link to={"/details/" + props.detail._id}>{props.detail.description}</Link></td>
        <td>{props.detail.price}</td>
        <td>{props.detail.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.detail._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDetail(props.detail._id) }}>delete</a>
        </td>
    </tr>
)

export default class DetailList extends Component {
    constructor(props) {
        super(props);

        this.deleteDetail = this.deleteDetail.bind(this);

        this.state = { details: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/details/')
            .then(response => {
                this.setState({ details: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteDetail(id) {
        axios.delete('http://localhost:8080/details/' + id)
            .then(res => console.log(res.data));

        this.setState({
            details: this.state.details.filter(el => el._id !== id)
        })
    }

    detailList() {
        return this.state.details.map(currentdetail => {
            return <Detail detail={currentdetail} deleteDetail={this.deleteDetail} key={currentdetail._id} />
        })
    }
    render() {
        return (
            <div>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>Account Details</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>cover</th>
                            <th>Accountname</th>
                            <th>Description</th>
                            <th>price</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.detailList()}
                    </tbody>
                </table>
            </div>
        )
    }
}