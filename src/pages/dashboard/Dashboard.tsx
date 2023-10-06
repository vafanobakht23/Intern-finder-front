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
  APPLY_POST_API,
  CREATE_POST_API,
  ENROLLMENTS_USER_API,
  POST_DELETE_API,
  POST_LIST_API,
  POST_UPDATE_API,
} from "../../api/url/urls";
import PostCard from "../../pages/profile/PostCard";
import PostModal from "../../pages/profile/PostModal";
import { validateFormData } from "../../utils/validateFormData";
import { Enrollment } from "../../types/Enrollment";

const Dashboard: React.FC = ({}) => {
  const user = useSelector((state: Store) => state.user);
  const [isDeleteButton, setDeleteButton] = useState(false);
  const [post, setPost] = useState<Post>(EMPTY_POST);
  const [selectedPostId, setSelectedPostId] = useState(-1);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
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
  const { remove: remvoePost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${POST_DELETE_API}`
  );
  const removePostFunc = async (): Promise<void> => {
    if (selectedPostId !== -1) {
      const resp = await remvoePost(selectedPostId);
      const allPost = await loadAllPosts();
      setPostList(allPost);
    }
  };
  useEffect(() => {
    if (selectedPostId !== -1) removePostFunc();
    setDeleteButton(false);
    setSelectedPostId(-1);
  }, [selectedPostId]);

  const submitPost = async () => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("category", post.category);
    formData.append("description", post.description);
    formData.append("user_id", JSON.stringify(user.id));
    if (selectedPostId === -1) {
      const isEmpty = validateFormData(formData);
      if (isEmpty) Notification.openErrorNotification("Please fill all input");
      else {
        const resp = await createPost(formData, true);
        setPost(EMPTY_POST);
      }
    } else {
      const resp = await updatePost(selectedPostId, formData);
      setPost(EMPTY_POST);
      setSelectedPostId(-1);
    }
    getData();
    setPostModalOpen(false);
  };
  // const { fetchAll: enrollmentUser } = useCrudApi(
  //   `${import.meta.env.VITE_REACT_APP_API}${ENROLLMENT_USER_API}?user_id=${
  //     user.id
  //   }`
  // );
  const { fetchAll: enrollmentUser } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ENROLLMENTS_USER_API}?user_id=${
      user.id
    }`
  );
  const loadEnrollment = async (): Promise<any> => {
    const resp = await enrollmentUser();
    setEnrollments(resp);
  };
  useEffect(() => {
    getData();
    loadEnrollment();
  }, []);
  const { create: applyPost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${APPLY_POST_API}`
  );

  const applyHandler = async (id: number) => {
    const formData = new FormData();
    formData.append("post_id", String(id));
    formData.append("user_id", String(user.id));
    formData.append("status", "AP");
    const resp = await applyPost(formData, true);
  };

  const { formatter } = useDateFormatter();
  return (
    <>
      <Navbar selectedKey="1" />
      <div className="flex flex-col mt-5 w-full gap-x-4">
        <div className="flex flex-col my-3 w-full h-auto shadow-lg">
          <p className="mx-4">Posts:</p>
          <PostCard
            postList={postList}
            setSelectedPostId={setSelectedPostId}
            setModalView={setPostModalOpen}
            setDeleteButton={setDeleteButton}
            setPost={setPost}
            post={post}
            applyHandler={applyHandler}
          />
          <PostModal
            isModalView={isPostModalOpen}
            post={post}
            setPost={setPost}
            title="Add post"
            setModalView={setPostModalOpen}
            onOk={submitPost}
            selectedPostId={selectedPostId}
            postList={postList}
          />
        </div>
        {enrollments.length > 0 && (
          <div className="flex flex-col my-3 w-full h-auto shadow-lg">
            <p>Enrollments</p>
            <PostCard
              enrollments={enrollments}
              setSelectedPostId={setSelectedPostId}
              setModalView={setPostModalOpen}
              setDeleteButton={setDeleteButton}
              setPost={setPost}
              post={post}
              applyHandler={applyHandler}
            />
          </div>
        )}
      </div>

      {/* Additional content can go here */}
    </>
  );
};
export default Dashboard;
