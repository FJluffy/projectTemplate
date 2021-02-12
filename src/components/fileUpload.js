import React, { useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

function FileUpload(props) {
    const [images, setImages] = useState([]);
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type':'multipart/form-data'}
        }
        formData.append("file", files[0])

               //save the Image we chose inside the node server 
        Axios.post('http://localhost:8080/details/images/add/', formData, config)
            .then(Response => {
                if (Response.data.success) {
                    setImages([...images, Response.data.image])
                    props.refreshFunction([...images, Response.data.image])
                }else {
                    alert('Failed to save the images in server')
                }
            })
    }

    const onDelete = (image) => {
        const currentIndex = images.indexOf(image);
        let newImages = [...images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }
    return (
        <div style={{display:'flex', justifyContent:'space-around'}}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={80000000}
            >{({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgrey',
                        display: 'flex', alignItems: 'center', justifyContent:'center'
                    }} {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                    </div>
               ) }
            </Dropzone>
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {images.map((image, index) => (
                    <div onClick={()=> onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                             src={`http://localhost:8080/${image}`}  alt={`productImg-${index}`} />
                    </div>
                ))}
            </div>
        </div>
        )
}

export default FileUpload;