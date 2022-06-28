// Essential module
import * as React from "react";
import { Layout, Space, Button } from 'antd';

// Custom module
import NavBar from "./NavBar"
import Logo from './Logo';

// CSS style
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;
const MyLayout = ({ pageTitle, children }) => {
    const [size, setSize] = React.useState('default');

    document.title = pageTitle;

    return (
        <div>
            <Layout>
                <NavBar />

                <Content style={{ paddingTop: '64px' }} >
                    <main>
                        {children}
                    </main>
                </Content>

                <Footer  style={{ background: "#e21c23", color: 'white', fontFamily: 'Kanit', height: "100px" }}>
                    <Logo color="#fff" />
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
                </Footer>
            </Layout>
        </div>
    )
}

export default MyLayout