import React, { useEffect,useState } from 'react';
import ImageGallery from 'react-image-gallery';

function DetailImages(props) {
    const [images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:8080/${item}`,
                    thumbnail: `http://localhost:8080/${item}`
                })
            })
            setImages(images)
        }
    },[props.detail])

    return (
        <div>
            <ImageGallery items={images} />
        </div>

        )
}

export default DetailImages;