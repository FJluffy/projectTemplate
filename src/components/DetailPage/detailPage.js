import React, { useEffect,Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import DetailImages from '../../hocs/detailImages';
import DetailInfo from '../../hocs/detailInfo';
import MoreDetails from '../../hocs/moreDetails';
import Comments from '../../hocs/comments';

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.updateComment = this.updateComment.bind(this);

        this.state = {
            _id:0,
            accountname: '',
            description: '',
            price: 0,
            date: new Date(),
            images: [],
            daishou:"orange",
            commentList:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/details/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
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
    }
    updateComment(newComment){
        this.setState({commentList:this.state.commentList.push(newComment)})
    }

        render(){
            return (
            <div className="postPage" style={{width: '100%', padding: '2rem 3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h3>{this.state.accountname}</h3>
                    </div>
                    <br />
                    <table className="detailPage">
                        <tr>
                            <td style={{width:'60%'}}> <DetailImages detail={this.state} /></td>
                            <td style={{ display: 'flex' }}><DetailInfo detail={this.state} /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><MoreDetails /></td>
                        </tr>
                        {/* <tr>
                            <td colSpan={2}><Comments comments={this.state.commentList}  postId={this.state._id} refreshFunction={this.updateComment}/></td>
                        </tr> */}
                    </table>
                </div>
            )
        }
    }
//    <Row gutter={[16, 16]}>
//        <Col span={9}>
//            <DetailImages detail={this.state} />
//        </Col>
//        <Col span={9}>
//            <DetailInfo detail={this.state} />
//        </Col>
//    </Row>

