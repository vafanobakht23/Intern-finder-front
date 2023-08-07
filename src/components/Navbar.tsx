import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const isLeftMenuOpen = window.matchMedia("(max-width: 700px)").matches;
  return (
    <div className="">
      <Layout className="layout">
        <Header className="flex justify-between bg-white">
          <Menu
            className="text-green-900"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/register">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ProfileOutlined />}>
              <Link to="/register">Profile</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </div>
  );
};

export default Navbar;
