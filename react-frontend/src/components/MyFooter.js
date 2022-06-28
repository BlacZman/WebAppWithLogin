import * as React from "react"
import { Layout, Space, Button } from 'antd';

// Custom module
import Logo from './Logo';

// CSS style
import "antd/dist/antd.css";


const MyFooter = () => {
    const [size, setSize] = React.useState('large');

    return (
        <div>
            <Layout.Footer style={{ background: "#e21c23", color: 'white', fontFamily: 'Kanit', height: "88.38px", paddingRight: 0 }}>
                <Logo color="#fff"/>
                <Space size={size} style={{ float: "right", alignItems: 'center', height: "100%" }}>
                    <Button type="link" style={{ color: "white", fontSize: "20px", fontWeight: "400" }} >
                        ไอศกรีมของเรา
                    </Button>
                    <Button type="link" style={{ color: "white", fontSize: "20px", fontWeight: "400" }} >
                        สิทธิพิเศษ
                    </Button>
                    <Button type="link" style={{ color: "white", fontSize: "20px", fontWeight: "400" }} >
                        รีวอร์ด
                    </Button>
                    <Button type="link" style={{ color: "white", fontSize: "20px", fontWeight: "400" }} >
                        คูปองของฉัน
                    </Button>
                    <Button type="link" style={{ color: "white", fontSize: "20px", fontWeight: "400" }} >
                        บัตรกำนัลเงินสด
                    </Button>
                    <Button type="link" style={{ color: "white", fontSize: "20px", fontWeight: "400" }} >
                        บัตรสเวนเซ่นส์การ์ด
                    </Button>
                    <Button type="link" style={{ color: "white", fontSize: "20px", fontWeight: "400" }} >
                        ข้อมูลของฉัน
                    </Button>
                </Space>
            </Layout.Footer>
            <Layout.Footer style={{ background: "#cb191f", color: 'white', fontFamily: 'Kanit', height: "57px", padding: 0 }}>
                <div style={{ height: "100%", display: "flex", justifyContent: "flex-end", marginButtom: "auto" }}>
                    <Button type="link" style={{ height: "100%", color: "white", fontSize: "16px", fontWeight: "400" }} >
                        คำถามที่พบบ่อย
                    </Button>
                    <Button type="link" style={{ height: "100%", color: "white", fontSize: "16px", fontWeight: "400" }} >
                        ข้อกำหนดการใช้งาน
                    </Button>
                    <Button type="link" style={{ height: "100%", color: "white", fontSize: "16px", fontWeight: "400" }} >
                        นโยบายความเป็นส่วนตัว
                    </Button>
                </div>
            </Layout.Footer>
        </div>
    )
}

export default MyFooter