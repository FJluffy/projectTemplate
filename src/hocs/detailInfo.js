import React, {useEffect, useState } from 'react';
import { Button, Descriptions } from 'antd';

function DetailInfo(props) {

    const [detail, setDetail] = useState({});

    useEffect(() => {
        setDetail(props.detail)
    },[props.detail])

    return (
        <div>
            
            <div style={{ display: 'flex' }}>
                <Button size="large" shape="round" type="danger" onClick>
                    Contact representative
                </Button>
            </div>
            <br /><br />
            <Descriptions title="Account Info">
                <Descriptions.Item label="Price: ">{detail.price}</Descriptions.Item>
                <Descriptions.Item label="daishou: ">{detail.daishou}</Descriptions.Item>
                <Descriptions.Item label="tixing: "></Descriptions.Item>
                <Descriptions.Item label="Description: ">{detail.description}</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />
        </div>

    )
}
//<Descriptions.Item label="View">{detail.views}</Descriptions.Item>
export default DetailInfo;