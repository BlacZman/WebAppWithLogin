import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, Button, Form, Input, Modal, Space } from 'antd';

// Component
import { MessageOutlined } from '@ant-design/icons';
import { useAuth, login } from "../TokenProvider"

const Login = () => {
    // Modal
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isErrModalVisible, SetIsErrModalVisible] = React.useState(false);

    const [confirmLoading, setConfirmLoading] = React.useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showErrorModal = () => {
        SetIsErrModalVisible(true);
    };

    const handleErrCancel = () => {
        SetIsErrModalVisible(false);
    };

    

    // Checking login
    function handleErrors(response) {
        if (!response.ok) throw new Error(response.status);
        return response;
    }

    const onFinish = async (values) => {
        setConfirmLoading(true)
        await fetch('api/token', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(handleErrors)
            .then(r => r.json())
            .then(token => {
                login(token);
                <Navigate to='/' />
            })
            .catch(err => {
                console.log(err)
                showErrorModal()
            })
            .finally(() => {
                setConfirmLoading(false)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Custom Header for login card
    const header = (
        <div style={{ height: "240px", padding: "40px", backgroundImage: `url("https://swensens1112.com/images/card-head.png")`, backgroundSize: "480px" }} >
            <h1 style={{ fontFamily: "Kanit", fontSize:"32px", fontWeight:600, color: "white" }}>ยินดีต้อนรับ</h1>
            <p style={{ fontFamily: "Kanit", color: "white" }}>เข้าสู่ระบบเพื่อใช้งาน</p>
        </div>        
    );

    return (
        <Card
            style={{ width: "480px", textAlign: "left", marginTop: "40px" }}
            cover={ header }
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ fontFamily: "Kanit" }}
            >
                <Form.Item
                    label="อีเมล"
                    name="email"
                    rules={[{ required: true, message: 'กรุณาใส่อีเมล' }]}
                >
                    <Input style={{ borderRadius: "10px", height: "48px" }} />
                </Form.Item>

                <Form.Item
                    label="รหัสผ่าน"
                    name="password"
                    rules={[{
                        required: true, message: 'กรุณาใส่รหัสผ่าน' }]}
                >
                    <Input.Password style={{ borderRadius:"10px", height:"48px" }} />
                </Form.Item>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="link" onClick={showModal}>
                        ลืมรหัสผ่าน
                    </Button>
                </div>
                <br/>
                <Form.Item wrapperCol={{ offset: 1 }} >
                    <Button type="primary" shape="round" htmlType="submit" style={{ width: "400px", height: "48px" }} danger loading={confirmLoading}>
                        เข้าสู่ระบบ
                    </Button>
                </Form.Item>
            </Form>

            <div>
                <Modal
                    onCancel={handleCancel}
                    footer={null}
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                    visible={isModalVisible}>
                    <h2 style={{ fontSize: "24px", color: "#e21c23" }}>รีเซ็ตรหัสผ่าน</h2>
                    <p>เลือกช่องทางส่งการยืนยันรีเซ็ตรหัสผ่านของคุณ</p>
                    <Button type="primary" shape="round"
                        style={{ width: "100%", height: "85px", backgroundColor: "#fff5f3", border: "none", marginBottom: "20px" }} >

                        <div style={{ display: "inline-flex", float: "left" }}>
                            <Space>
                                <MessageOutlined style={{ display: "flex", fontSize: "40px", color: "#e21c23" }} />
                                <div style={{ display: "block", color: "black" }}>
                                    <h3>ยืนยันผ่านเบอร์โทรศัพท์</h3>
                                    <p>ระบบจะส่งรหัสยืนยันผ่าน SMS</p>
                                </div>
                            </Space>
                        </div>
                    </Button>
                    <Button type="primary" shape="round"
                        style={{ width: "100%", height: "85px", backgroundColor: "#fff5f3", border: "none" }} >

                        <div style={{ display: "inline-flex", float: "left" }}>
                            <Space>
                                <MessageOutlined style={{ display: "flex", fontSize: "40px", color: "#e21c23" }} />
                                <div style={{ display: "block", color: "black" }}>
                                    <h3>ยืนยันผ่านอีเมล</h3>
                                    <p>ระบบจะส่งลิ้งค์รีเซ็ตรหัสผ่านทางอีเมล</p>
                                </div>
                            </Space>
                        </div>
                    </Button>
                </Modal>

                <Modal
                    onCancel={handleErrCancel}
                    footer={null}
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                    visible={isErrModalVisible}>
                    <h2 style={{ fontSize: "24px"}}>ไม่สามารถดำเนินการคำขอ</h2>
                    <p style={{ color:"#787878" }}>คำขอที่ส่งเข้ามายังระบบไม่ถูกต้อง หรือไม่สามารถทำตามคำขอนั้นได้</p>
                    <Button type="primary" shape="round" onClick={handleErrCancel}
                        style={{ width: "100%", height: "48px", backgroundColor: "#e21c23", border: "none", marginTop:"20px" }} >
                        <div style={{ display: "inline-flex", float: "left" }}>
                            ตกลง
                        </div>
                    </Button>
                </Modal>
            </div>
        </Card>
    );
}

export default Login