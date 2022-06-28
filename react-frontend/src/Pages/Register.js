import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, Button, Form, Input, Modal, Space, Radio, DatePicker, Checkbox } from 'antd';

// Component

const Register = () => {
    // Modal
    const [isToSModalVisible, setIsToSModalVisible] = React.useState(false);
    const [isPrivacyModalVisible, setIsPrivacyModalVisible] = React.useState(false);
    const [isPDPAModalVisible, setIsPDPAModalVisible] = React.useState(false);
    const [isErrModalVisible, setIsErrModalVisible] = React.useState(false);


    const [confirmLoading, setConfirmLoading] = React.useState(false);

    // Register
    function handleErrors(response) {
        if (!response.ok) throw new Error(response.status);
        return response;
    }

    const onFinish = async (values) => {
        setConfirmLoading(true)

        delete values.agreement;
        values.dateOfBirth = null;
        values.createdDate = new Date(Date.now()).toISOString();

        await fetch('api/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(handleErrors)
            .then(r => r.json())
            .then(obj => {
                console.log(obj);
                window.location.replace("../login")
            })
            .catch(err => {
                console.log(err)
                setIsErrModalVisible(true);
                
            })
            .finally(() => {
                setConfirmLoading(false)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Custom Header for register card
    const header = (
        <div style={{ height: "240px", padding: "40px", backgroundImage: `url("https://swensens1112.com/images/card-head.png")`, backgroundSize: "480px" }} >
            <h1 style={{ fontFamily: "Kanit", fontSize: "32px", fontWeight: 600, color: "white" }}>สร้างบัญชี</h1>
            <p style={{ fontFamily: "Kanit", color: "white" }}>สมัครสมาชิกและเริ่มใช้งาน</p>
        </div>
    );

    return (
        <Card
            style={{ width: "480px", textAlign: "left", marginTop: "40px", marginBottom: "40px" }}
            cover={header}
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
                    label="ชื่อ"
                    name="firstName"
                    rules={[{
                        required: true, message: 'กรุณาใส่ชื่อและใส่ไม่เกิน 25 ตัว', max: 25
                    }]}
                    style={{display: "inline-flex", marginRight: "24px"} }
                >
                    <Input style={{ borderRadius: "10px", height: "48px" }} />
                </Form.Item>
                <Form.Item
                    label="นามสกุล"
                    name="lastName"
                    rules={[{
                        required: true, message: 'กรุณาใส่นามสกุลและใส่ไม่เกิน 25 ตัว', max: 25
                    }]}
                    style={{ display: "inline-flex" }}
                >
                    <Input style={{ borderRadius: "10px", height: "48px" }} />
                </Form.Item>
                <Form.Item
                    label="เบอร์โทรศัพท์"
                    name="telephoneNumber"
                    rules={[{
                        required: true, message: 'กรุณาใส่เบอร์โทรศัพท์และใส่ไม่เกิน 10 ตัว', max: 10
                    }]}
                >
                    <Input style={{ borderRadius: "10px", height: "48px" }} />
                </Form.Item>
                <Form.Item
                    label="อีเมล"
                    name="email"
                    rules={[{ required: true, message: 'กรุณาใส่อีเมลและใส่ไม่เกิน 50 ตัว', max: 50 }]}
                >
                    <Input style={{ borderRadius: "10px", height: "48px" }} />
                </Form.Item>

                <Form.Item
                    label="รหัสผ่าน"
                    name="password"
                    rules={[{
                        required: true, message: 'กรุณาใส่รหัสผ่านใส่ไม่เกิน 20 ตัว', max: 20
                    }]}
                >
                    <Input.Password style={{ borderRadius: "10px", height: "48px" }} />
                </Form.Item>
                <Form.Item
                    label="เพศ (ไม่ระบุได้)"
                    name="gender"
                    rules={[{
                        required: true, message: 'กรุณาระบุเพศ'
                    }]}
                >
                    <Radio.Group defaultValue="a">
                        <Radio.Button value={1}>ชาย</Radio.Button>
                        <Radio.Button value={2}>หญิง</Radio.Button>
                        <Radio.Button value={3}>ไม่ระบุ</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="ของขวัญวันเกิดรอคุณอยู่"
                    name="dateOfBirth"
                >
                    <DatePicker style={{ borderRadius: "10px", height: "48px", width: "100%" }} />
                </Form.Item>
                <Form.Item valuePropName="checked"
                    name="agreement"
                    rules={[{
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    }]}
                >
                    <Checkbox>
                        <span>
                            ฉันได้อ่านและยอมรับ
                            <Button type="link" style={{ padding: 2, color: "#e21c23" }}
                                onClick={() => setIsToSModalVisible(true)}>
                                ข้อกำหนดการใช้งาน
                            </Button>
                            และ
                            <Button type="link" style={{ padding: 2, color: "#e21c23" }}
                                onClick={() => setIsPrivacyModalVisible(true)}>
                                นโยบายความเป็นส่วนตัว
                            </Button>
                            ของสเวนเซ่นส์
                        </span>
                    </Checkbox>
                </Form.Item>
                <Form.Item valuePropName="checked">
                    <Checkbox>
                        <span>
                            ฉันยินยอมรับข้อมูลข่าวสาร กิจกรรมส่งเสริมการขายต่างๆ จากสเวนเซ่นส์และ
                            <Button type="link" style={{ padding: 0, color: "#e21c23" }}
                                onClick={() => setIsPDPAModalVisible(true)}>
                                บริษัทในเครือ
                            </Button>
                            โดยเราจะเก็บข้อมูลของท่านไว้เป็นความลับ สามารถศึกษาเงื่อนไขหรือข้อตกลง
                            <Button type="link" style={{ padding: 2, color: "#e21c23" }}
                                onClick={() => setIsPrivacyModalVisible(true)}>
                                นโยบายความเป็นส่วนตัว
                            </Button>
                            เพิ่มเติมได้ที่เว็บไซต์ของบริษัทฯ
                        </span>
                    </Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 1 }} >
                    <Button type="primary" shape="round" htmlType="submit" style={{ width: "100%", height: "48px" }} danger loading={confirmLoading}>
                        สมัครสมาชิก
                    </Button>
                </Form.Item>

                {/* Term of Service */}
                <Modal
                    onCancel={() => setIsToSModalVisible(false)}
                    footer={null}
                    style={{ fontFamily: "Kanit", textAlign: "left" }}
                    visible={isToSModalVisible}>
                    <h2 style={{ fontSize: "24px" }}>ข้อกำหนดการใช้งาน</h2>
                    <p style={{ fontSize: "14px", color: "#787878" }}>
                        นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (“นโยบาย”) ใช้อธิบายว่า บริษัท สเวนเซ่นส์ (ไทย) จำกัด (“เรา” หรือ “บริษัท”)
                        และบริษัทร่วม บริษัทย่อย (รวมเรียกว่า “กลุ่มบริษัท”) จัดเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลของท่าน
                        ผ่านการใช้งานแอปพลิเคชันในโทรศัพท์เคลื่อนที่และเว็บไซต์และการให้บริการออนไลน์ของเรา รวมถึง www.swensens1112.com
                        และเว็บไซต์ แอปพลิเคชั่น หรือการให้บริการออนไลน์อื่นๆ ที่บริษัทเป็นเจ้าของหรือเป็นผู้ดำเนินการ (รวมเรียกว่า “ไซต์”) หรือกิจกรรมการตลาดอื่นใด
                        ดำเนินการโดยบริษัท, ผลิตภัณฑ์, ฟีเจอร์ และบริการใดๆ ทั้งหมดทั่วโลก (รวมเรียกว่า “บริการ”) โดยนโยบายนี้ใช้กับลูกค้า
                        พาร์ทเนอร์ เอเจนซี่ ผู้รับจ้าง และผู้ให้บริการ
                    </p>
                    <p style={{ fontSize: "14px", color: "#787878" }}>
                        “ข้อมูลส่วนบุคคล” หมายถึง ข้อมูลใดๆ เกี่ยวกับบุคคลที่ทำให้สามารถใช้ระบุตัวบุคคลนั้นได้
                        ไม่ว่าทางตรงหรือทางอ้อม ซึ่งรวมถึงแต่ไม่จำกัดเพียง ชื่อ ที่อยู่ หมายเลขโทรศัพท์ อีเมลล์ และข้อมูลส่วนบุคคลอื่นๆ
                        อย่างไรก็ตาม ข้อมูลส่วนบุคคลไม่รวมถึงตำแหน่ง สถานที่ทำงาน ที่อยู่ทางธุรกิจ หรือข้อมูลอื่นใดที่ไม่รวมอยู่ในคำจำกัดความของข้อมูลส่วนบุคคลตามกฎหมายไทย
                    </p>
                    <p style={{ fontSize: "14px", color: "#787878" }}>
                        เมื่อท่านใช้เว็บไซต์และแอปพลิเคชันของเราถือว่าท่านยอมรับ ให้ความยินยอม และตกลงตามเงื่อนไขและข้อกำหนดของนโยบายนี้แล้ว
                    </p>
                </Modal>

                {/* Privacy policy */}
                <Modal
                    onCancel={() => setIsPrivacyModalVisible(false)}
                    footer={null}
                    style={{ fontFamily: "Kanit", textAlign: "left" }}
                    visible={isPrivacyModalVisible}>
                    <h2 style={{ fontSize: "24px" }}>นโยบายความเป็นส่วนตัว</h2>
                    <p style={{ fontSize: "14px", color: "#787878" }}>
                        นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (“นโยบาย”) ใช้อธิบายว่า บริษัท สเวนเซ่นส์ (ไทย) จำกัด (“เรา” หรือ “บริษัท”)
                        และบริษัทร่วม บริษัทย่อย (รวมเรียกว่า “กลุ่มบริษัท”) จัดเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลของท่าน
                        ผ่านการใช้งานแอปพลิเคชันในโทรศัพท์เคลื่อนที่และเว็บไซต์และการให้บริการออนไลน์ของเรา รวมถึง www.swensens1112.com
                        และเว็บไซต์ แอปพลิเคชั่น หรือการให้บริการออนไลน์อื่นๆ ที่บริษัทเป็นเจ้าของหรือเป็นผู้ดำเนินการ (รวมเรียกว่า “ไซต์”) หรือกิจกรรมการตลาดอื่นใด
                        ดำเนินการโดยบริษัท, ผลิตภัณฑ์, ฟีเจอร์ และบริการใดๆ ทั้งหมดทั่วโลก (รวมเรียกว่า “บริการ”) โดยนโยบายนี้ใช้กับลูกค้า
                        พาร์ทเนอร์ เอเจนซี่ ผู้รับจ้าง และผู้ให้บริการ
                    </p>
                    <p style={{ fontSize: "14px", color: "#787878" }}>
                        “ข้อมูลส่วนบุคคล” หมายถึง ข้อมูลใดๆ เกี่ยวกับบุคคลที่ทำให้สามารถใช้ระบุตัวบุคคลนั้นได้
                        ไม่ว่าทางตรงหรือทางอ้อม ซึ่งรวมถึงแต่ไม่จำกัดเพียง ชื่อ ที่อยู่ หมายเลขโทรศัพท์ อีเมลล์ และข้อมูลส่วนบุคคลอื่นๆ
                        อย่างไรก็ตาม ข้อมูลส่วนบุคคลไม่รวมถึงตำแหน่ง สถานที่ทำงาน ที่อยู่ทางธุรกิจ หรือข้อมูลอื่นใดที่ไม่รวมอยู่ในคำจำกัดความของข้อมูลส่วนบุคคลตามกฎหมายไทย
                    </p>
                    <p style={{ fontSize: "14px", color: "#787878" }}>
                        เมื่อท่านใช้เว็บไซต์และแอปพลิเคชันของเราถือว่าท่านยอมรับ ให้ความยินยอม และตกลงตามเงื่อนไขและข้อกำหนดของนโยบายนี้แล้ว
                    </p>
                </Modal>

                {/* PDPA policy */}
                <Modal
                    onCancel={() => setIsPDPAModalVisible(false)}
                    footer={null}
                    style={{ fontFamily: "Kanit", textAlign: "left" }}
                    visible={isPDPAModalVisible}>
                    <h2 style={{ fontSize: "24px" }}>PDPA</h2>
                    <div style={{ display: "flex", justifyContent: "center"}}>
                        <img src="https://swensens1112.com/images/pdpa.svg" alt="PDPA picture" />
                    </div>
                    <br/>
                    <p style={{ fontSize: "14px", color: "#787878" }}>
                        นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (“นโยบาย”) ใช้อธิบายว่า บริษัท สเวนเซ่นส์ (ไทย) จำกัด (“เรา” หรือ “บริษัท”)
                        และบริษัทร่วม บริษัทย่อย (รวมเรียกว่า “กลุ่มบริษัท”) จัดเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลของท่าน
                        ผ่านการใช้งานแอปพลิเคชันในโทรศัพท์เคลื่อนที่และเว็บไซต์และการให้บริการออนไลน์ของเรา รวมถึง www.swensens1112.com
                        และเว็บไซต์ แอปพลิเคชั่น หรือการให้บริการออนไลน์อื่นๆ ที่บริษัทเป็นเจ้าของหรือเป็นผู้ดำเนินการ (รวมเรียกว่า “ไซต์”) หรือกิจกรรมการตลาดอื่นใด
                        ดำเนินการโดยบริษัท, ผลิตภัณฑ์, ฟีเจอร์ และบริการใดๆ ทั้งหมดทั่วโลก (รวมเรียกว่า “บริการ”) โดยนโยบายนี้ใช้กับลูกค้า
                        พาร์ทเนอร์ เอเจนซี่ ผู้รับจ้าง และผู้ให้บริการ
                    </p>
                </Modal>

                <Modal
                    onCancel={() => setIsErrModalVisible(false)}
                    footer={null}
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                    visible={isErrModalVisible}>
                    <h2 style={{ fontSize: "24px" }}>ไม่สามารถดำเนินการคำขอ</h2>
                    <p style={{ color: "#787878" }}>คำขอที่ส่งเข้ามายังระบบไม่ถูกต้อง หรือไม่สามารถทำตามคำขอนั้นได้</p>
                    <Button type="primary" shape="round" onClick={() => setIsErrModalVisible(false)}
                        style={{ width: "100%", height: "48px", backgroundColor: "#e21c23", border: "none", marginTop: "20px" }} >
                        <div style={{ display: "inline-flex", float: "left" }}>
                            ตกลง
                        </div>
                    </Button>
                </Modal>
            </Form>
        </Card>
    );
}

export default Register