import { Button, Card, Space } from "antd";
import useDateFormatter from "../../pages/profile/hooks/useDateFormatter";
import { Post } from "types/Post";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import { useCrudApi } from "../../api/useLazyApi";
import { useSelector } from "react-redux";
import { Store } from "../../types/Store";
import { COMPANY } from "../../constant/Constant";
import { useEffect, useState } from "react";
import { POST_LIST_API } from "../../api/url/urls";

const Dashboard: React.FC = ({}) => {
  const user = useSelector((state: Store) => state.user);
  const [postList, setPostList] = useState<Post[]>([]);
  const { create: loadPost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${POST_LIST_API}`
  );
  const getData = async () => {
    const formData = new FormData();
    formData.append("user_id", JSON.stringify(user.id));
    if (user.role === COMPANY) {
      const postResp = await loadPost(formData, true);
      setPostList(postResp);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const { formatter } = useDateFormatter();
  return (
    <>
      <Navbar selectedKey="1" />
      <div className="flex flex-row mt-5 w-full gap-x-4">
        <div className="flex flex-col my-3 w-full h-auto shadow-lg">
          <p className="mx-4">Posts:</p>
          <div className="flex flex-wrap justify-around">
            {postList.map((p, index) => (
              <Card
                key={index}
                className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mx-4 mt-4 px-6"
                hoverable
              >
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{p.title}</h2>
                  <p className="text-gray-500 text-base">{p.category}</p>
                </div>
                <p className="mt-2 text-gray-800">{p.description}</p>
                <div className="mt-4 text-gray-500">
                  <p>{`Created at: ${formatter(p.created_at)}`}</p>
                </div>
                <Space className="mt-4">
                  <Button type="primary" icon={<EditOutlined />}>
                    Edit
                  </Button>
                  <Button type="default" icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Space>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Additional content can go here */}
    </>
  );
};
export default Dashboard;
