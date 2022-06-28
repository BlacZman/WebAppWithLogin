// Essential module
import * as React from "react"
import { Layout, Menu, Button, Space, Dropdown, Divider, Card, Modal } from 'antd';

// Component
import {
    EnvironmentOutlined, CaretDownOutlined, InboxOutlined, HeartOutlined, ShoppingOutlined,
    QrcodeOutlined, MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined
} from '@ant-design/icons';

// Custom module
import Logo from './Logo';
import { useAuth, getPayload } from "../TokenProvider"

// CSS style
import "antd/dist/antd.css";


const { Header, Content, Footer, Sider } = Layout;

const NavBar = () => {
    const [size, setSize] = React.useState('large');
    const [visible, setVisible] = React.useState(false);
    const [name, setName] = React.useState('')

    const [loggedIn] = useAuth();

    const getname = async () => {
        let temp = await getPayload().then(obj => setName(obj.Name))
    }

    React.useEffect(() => {
        if (loggedIn) {
            getname()
        }
    });

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="/">
                            TH
                        </a>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="/">
                            EN
                        </a>
                    ),
                    key: '1',
                },
            ]}
        />
    );

    const inbox = (
        <Menu
            items={[
                {
                    label: (
                        <Card
                            bordered={false }
                            style={{ width: "400px", justifyContent: "center"}}
                            cover={
                                <>
                                    <div style={{ fontFamily: "Kanit", width:"100%", display: "flex"}}>
                                        <div style={{ display: "inline-flex", textAlign: "center" }}>
                                            <h3 style={{marginBottom: 0} }>
                                                ข้อความ
                                            </h3>
                                        </div>
                                        <div style={{ display: "inline-flex", flex: 1, justifyContent:"flex-end"}}>
                                            <Button type="link">
                                                ดูทั้งหมด
                                            </Button>
                                        </div>
                                    
                                    </div>
                                    <hr />
                                </>
                            }
                        >
                            
                            <div>
                                ยังไม่มีการแจ้งเตือน
                            </div>
                            
                        </Card>
                    ),
                    key: '0',
                }
            ]}
        />
    );

    const [collapsed, setCollapsed] = React.useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: "white", height: "70px" }} >
                <Logo color="#E21C23" />

                <Space size={size} style={{ float: "right" }}>

                    <Divider type="vertical" />
                    <Button type="link" style={{ fontFamily: 'Kanit', color: "black" }}>
                        <EnvironmentOutlined style={{ fontSize: "20px", marginTop: "auto", marginRight: "6px" }} /> กรุณาเลือกที่อยู่จัดส่ง <CaretDownOutlined />
                    </Button>
                    <Divider type="vertical" />

                    {!loggedIn &&
                        <Space size={size} style={{ float: "right" }}>
                            <Button shape="round" size={size} href="/register" style={{ fontFamily: 'Kanit' }} danger>
                                สมัครสมาชิก
                            </Button>
                            <Button type="primary" shape="round" size={size} href="/login" style={{ fontFamily: 'Kanit' }} danger>
                                เข้าสู่ระบบ
                            </Button>
                        </Space>
                    }
                    {loggedIn &&
                        <>
                        <Button shape="round" size={size} style={{ fontFamily: 'Kanit', display: "flex" }} danger>
                            <QrcodeOutlined style={{ fontSize: "20px", color: "red", marginTop: "auto", marginRight: "6px" }} />
                            <div>สแกน</div>
                        </Button>
                        <Divider type="vertical" />
                        <div style={{ display: "flex" }}>
                            <Button type="link" onClick={e => e.preventDefault()} style={{ height: "100%" }}>
                                <Space>
                                <ShoppingOutlined style={{ fontSize: "30px", color: "black" }} />
                                </Space>
                            </Button>
                        </div>
                        <div style={{ display: "flex" }}>
                            <Button type="link" onClick={e => e.preventDefault()} style={{ height: "100%" }}>
                                <Space>
                                <HeartOutlined style={{ fontSize: "30px", color: "black" }} />
                                </Space>
                            </Button>
                        </div>
                        <div>
                            <Dropdown overlay={inbox}>
                                <div style={{ display: "flex" }}>
                                    <Button type="link" onClick={e => e.preventDefault()} style={{ height: "100%" }}>
                                        <Space>
                                        <InboxOutlined style={{ fontSize: "30px", color: "grey" }} />
                                        </Space>
                                    </Button>
                                </div>
                            </Dropdown>
                        </div>
                        </>
                    }
                

                    <Divider type="vertical" />
                    <Dropdown overlay={menu}>
                        <Button onClick={e => e.preventDefault()}>
                            <Space>
                                TH
                                <CaretDownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Divider type="vertical" />

                    {loggedIn &&

                        <div>
                            <Button
                                type="link"
                                onClick={() => setVisible(true)}
                                style={{
                                    fontSize: "32px",
                                    color: "black",
                                    marginBottom: 16,
                                }}
                            >
                                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            </Button>
                            <Modal
                                title={
                                    <div style={{ fontFamily: "Kanit" }}>
                                        <h1>ยินดีต้อนรับ</h1>
                                        <span>{name}</span>
                                    </div>
                                }
                                closable={false}
                                footer={null}
                                style={{ top: "auto", float: "right", height: "100%" }}
                                bodyStyle={{ height: "94vh" }}
                                visible={visible}
                                onOk={() => setVisible(false)}
                                onCancel={() => setVisible(false)}
                                width={320}
                            >
                                <div>
                                    <Button type="link" href="./logout" style={{ fontFamily: "Kanit", padding:0}}>
                                        <Space>
                                            <LogoutOutlined style={{ fontSize: "20px", marginRight: "6px" }} />
                                            ออกจากระบบ
                                        </Space>
                                    </Button>
                                </div>
                            </Modal>
                        </div>
                    }
                </Space>
            </Header>
        </>
    )
}

export default NavBar