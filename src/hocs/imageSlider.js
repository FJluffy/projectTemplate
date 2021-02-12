import React from 'react';
import { Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>{/
                props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '200px', height: '160px' }}
                            src={`http://localhost:8080/${image}`} alt="No images" />
                    </div>
                ))}
            </Carousel>
        </div>
        )
}

export default ImageSlider;