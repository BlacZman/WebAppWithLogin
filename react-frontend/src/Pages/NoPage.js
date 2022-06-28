import React from 'react';
import { Card, Button } from 'antd';

// Component
import { ExclamationCircleOutlined } from '@ant-design/icons';

const NoPage = () => {
    return (
        <Card
            style={{ width: "480px", textAlign: "center", marginTop: "70px" }}
            cover={<img alt="example" src="https://swensens1112.com/images/card-head.png" />}
        >
            <ExclamationCircleOutlined style={{ fontSize: "90px", color: "#DBE1EC" }} />
            <br />
            <br />
            <div style={{ fontSize: "24px" }}>This page could not be found</div>
            <Button type="link" style={{ fontSize: "14px", color: "grey" }} href="/" >
                Back to the home page
            </Button>
        </Card>
    );
}

export default NoPage