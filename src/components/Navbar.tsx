import { HomeOutlined, ProfileOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Pages } from "../settings/Pages";

const { Header } = Layout;

type Props = {
  selectedKey: string;
};

const Navbar: React.FC<Props> = ({ selectedKey }: Props) => {
  const isLeftMenuOpen = window.matchMedia("(max-width: 700px)").matches;
  return (
    <div className="">
      <Layout className="layout">
        <Header className="flex justify-between bg-white">
          <Menu
            className="text-green-900"
            mode="horizontal"
            defaultSelectedKeys={[selectedKey ? selectedKey : "1"]}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/register">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ProfileOutlined />}>
              <Link to={Pages.PROFILE}>Profile</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </div>
  );
};

export default Navbar;
