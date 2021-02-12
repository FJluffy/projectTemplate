import React, { Component,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchFeature from '../hocs/searchFeature';

const Detail = props => (

    <tr>
        <td style={{ width: '200px'}}>
            <img src={`http://localhost:8080/${props.detail.images[0]}`}
                style={{
                    width: '200px', /*height: '100%',*/
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} />
        </td>
        <td><Link to={"/details/" + props.detail._id}>{props.detail.accountname}</Link></td>

        <td><Link to={"/details/" + props.detail._id}>{props.detail.description}</Link></td>

        <td>{props.detail.price}</td>
        <td>{props.detail.date.substring(0, 10)}</td>
    </tr>
)

export default class DetailList extends Component {
    constructor(props) {
        super(props);
        this.updateSearchTerms = this.updateSearchTerms.bind(this);

        this.state = {
            searchTerms: "", details: [],
            filters: {
                accountname: [],
                description:[]
            }
        };
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

    updateSearchTerms(newSearchTerm) {


        const variables = {
            filters: this.state.filters,
            searchTerm:newSearchTerm
        }
        this.setState({ searchTerms: newSearchTerm });
    }

    //deleteDetail(id) {
    //    axios.delete('http://localhost:8080/details/' + id)
    //        .then(res => console.log(res.data));

    //    this.setState({
    //        details: this.state.details.filter(el=>el._id !==id)
    //    })
    //}

    detailList() {
        return this.state.details.map(currentdetail => {
            return <Detail detail={currentdetail} deleteDetail={this.deleteDetail} key={currentdetail._id} />
        })
    }
    render() {
        return (
            <div>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>Account Details</h3>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <SearchFeature updateFunction={this.updateSearchTerms}/>
                </div>
                <table className="table ">
                    <thead className="thead-light">
                        <tr>
                            <th style={{ alignContent:"center" }}>cover</th>
                            <th>Accountname</th>
                            <th>Description</th>
                            <th>price</th>
                            <th>Date</th>
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