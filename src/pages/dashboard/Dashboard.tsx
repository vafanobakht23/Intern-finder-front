import { Button, Card, Space } from "antd";
import useDateFormatter from "../../pages/profile/hooks/useDateFormatter";
import { Post } from "types/Post";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import { useCrudApi } from "../../api/useLazyApi";
import Notification from "../../components/Notification";
import { useSelector } from "react-redux";
import { Store } from "../../types/Store";
import { COMPANY, EMPTY_POST } from "../../constant/Constant";
import { useEffect, useState } from "react";
import {
  ALL_POST_API,
  CREATE_POST_API,
  POST_LIST_API,
  POST_UPDATE_API,
} from "../../api/url/urls";
import PostCard from "../../pages/profile/PostCard";
import PostModal from "../../pages/profile/PostModal";
import { validateFormData } from "../../utils/validateFormData";

const Dashboard: React.FC = ({}) => {
  const user = useSelector((state: Store) => state.user);
  const [isDeleteButton, setDeleteButton] = useState(false);
  const [post, setPost] = useState<Post>(EMPTY_POST);
  const [selectedPostId, setSelectedPostId] = useState(-1);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const { create: loadPost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${POST_LIST_API}`
  );
  const { fetchAll: loadAllPosts } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ALL_POST_API}`
  );
  const getData = async () => {
    if (user.role === COMPANY) {
      const formData = new FormData();
      formData.append("user_id", JSON.stringify(user.id));
      const postResp = await loadPost(formData, true);
      setPostList(postResp);
    } else {
      const resp = await loadAllPosts();
      setPostList(resp);
    }
  };
  const { create: createPost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${CREATE_POST_API}`
  );
  const { update: updatePost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${POST_UPDATE_API}`
  );

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
          <PostCard
            postList={postList}
            setSelectedPostId={setSelectedPostId}
            setModalView={setPostModalOpen}
            setDeleteButton={setDeleteButton}
            setPost={setPost}
          />
        </div>
      </div>

      {/* Additional content can go here */}
    </>
  );
};
export default Dashboard;
