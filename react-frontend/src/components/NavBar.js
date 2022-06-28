// Essential module
import * as React from "react"
import { Layout, Menu, Button, Space, Dropdown, Divider } from 'antd';

// Component
import { EnvironmentOutlined, CaretDownOutlined } from '@ant-design/icons';

// Custom module
import Logo from './Logo';

// CSS style
import "antd/dist/antd.css";

const { Header, Content, Footer, Sider } = Layout;

const NavBar = () => {
    const [size, setSize] = React.useState('large');

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

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: "white" }} >
            <Logo color="#E21C23" />

            <Space size={size} style={{ float: "right" }}>

                <Divider type="vertical" />
                <Button type="link" style={{ fontFamily: 'Kanit' }}>
                    <EnvironmentOutlined /> กรุณาเลือกที่อยู่จัดส่ง <CaretDownOutlined />
                </Button>

                <Divider type="vertical" />
                <Button shape="round" size={size} href="/register" style={{ fontFamily: 'Kanit' }} danger>
                    สมัครสมาชิก
                </Button>
                <Button type="primary" shape="round" size={size} href="/login" style={{ fontFamily: 'Kanit' }} danger>
                    เข้าสู่ระบบ
                </Button>

                <Divider type="vertical" />
                <Dropdown overlay={menu}>
                    <Button onClick={e => e.preventDefault()}>
                        <Space>
                            TH
                            <CaretDownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Space>

            

            
        </Header>
        /*<nav className={styles.container} >
            <ul className={styles.nav_links}>
                <li className={styles.nav_link_item}>
                    <Button shape="round" size={size} href="/register" danger>
                        สมัครสมาชิก
                    </Button>                  
                </li>
                <li className={styles.nav_link_item}>
                    <Button type="primary" shape="round" size={size} href="/login" danger>
                        เข้าสู่ระบบ
                    </Button>
                </li>
            </ul>
        </nav>*/
    )
}

export default NavBar