import {
  HomeOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useCrudApi } from "../api/useLazyApi";
import { Link } from "react-router-dom";
import { Pages } from "../settings/Pages";
import.meta.env.BASE_URL;

const { Header } = Layout;

type Props = {
  selectedKey: string;
};

const Navbar: React.FC<Props> = ({ selectedKey }: Props) => {
  const isLeftMenuOpen = window.matchMedia("(max-width: 700px)").matches;
  const { fetchAll } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}logout/logout/`
  );
  return (
    <div className="">
      <Layout className="layout">
        <Header className="flex justify-between bg-white">
          <Menu
            className="text-green-900 w-full"
            mode="horizontal"
            defaultSelectedKeys={[selectedKey ? selectedKey : "1"]}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to={Pages.LOGIN}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ProfileOutlined />}>
              <Link to={Pages.PROFILE}>Profile</Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<LogoutOutlined />}>
              <Link onClick={fetchAll} to={Pages.LOGIN}>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </div>
  );
};

export default Navbar;
