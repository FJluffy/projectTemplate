import React,{useState} from 'react';
import {Button, Input} from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux';
const {TextArea} = Input;

function Comments(props){
    const user = useSelector(state =>state.user)
    const [Comment, setComment] = useState("")

    const handleChange=(e)=>{
        setComment(e.currentTarget.value)
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        const variables ={
            content:Comment,
            writer:user.userDate._id,
            postId: props.postId
        }
        Axios.post('/api/comment.saveComment', variables)
        .then(response=>{
            if(response.data.success){
                setComment("")
                props.refreshFunction(response.data.result)
            }else{
                alert('Failed to save Comment')
            }
        })
    }


    return(
        <div>
            <br />
            <p> replies</p>
            {/*Comment Lists  */}
            <hr />
            {console.log(props.comments)}
            {/* Root Comment Form */}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <TextArea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{width:'20%', height:'52px'}}>Submit</Button>
            </form>
        </div>
    )
}

export default Comments;