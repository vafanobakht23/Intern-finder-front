import { Input } from "antd";
import { Post } from "types/Post";
import Navbar from "../../components/Navbar";
import { useCrudApi } from "../../api/useLazyApi";
import Notification from "../../components/Notification";
import { useSelector } from "react-redux";
import { Store } from "../../types/Store";
import { COMPANY, EMPTY_POST, INTERN } from "../../constant/Constant";
import { useEffect, useState } from "react";
import {
  ALL_POST_API,
  APPLY_POST_API,
  CREATE_POST_API,
  ENROLLMENTS_USER_API,
  MORE_POST_API,
  POST_DELETE_API,
  POST_LIST_API,
  POST_UPDATE_API,
  SEARCH_POST_API,
} from "../../api/url/urls";
import PostCard from "../../pages/profile/PostCard";
import PostModal from "../../pages/profile/PostModal";
import { validateFormData } from "../../utils/validateFormData";
import { Enrollment } from "../../types/Enrollment";
import List from "../../pages/enrollment/List";
import NoData from "../../components/Nodata";

const Dashboard: React.FC = ({}) => {
  const user = useSelector((state: Store) => state.user);
  const [isDeleteButton, setDeleteButton] = useState(false);
  const [post, setPost] = useState<Post>(EMPTY_POST);
  const [selectedPostId, setSelectedPostId] = useState(-1);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [hideSeeMore, setHideSeeMore] = useState(false);
  const [isNeedToSeeMore, setNeedToSeeMore] = useState(false);
  const { create: loadPost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${POST_LIST_API}`
  );
  const { fetchAll: LoadRelevantPosts } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ALL_POST_API}?user_id=${String(
      user?.id
    )}`
  );
  const { fetchAll: loadMorePosts } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${MORE_POST_API}?user_id=${String(
      user?.id
    )}`
  );
  const getData = async () => {
    const formData = new FormData();
    formData.append("user_id", JSON.stringify(user?.id));
    if (user?.role === COMPANY) {
      const postResp = await loadPost(formData, true);
      setPostList(postResp);
    } else {
      const resp = await LoadRelevantPosts();
      if (resp.length === 0) {
        const resp = await loadMorePosts();
        setPostList(resp);
        setHideSeeMore(false);
        setNeedToSeeMore(false);
      } else {
        setPostList(resp);
        setNeedToSeeMore(true);
      }
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
    if (selectedPostId !== -1 && isDeleteButton) {
      const resp = await remvoePost(selectedPostId);
      const allPost = await LoadRelevantPosts();
      setNeedToSeeMore(true);
      setPostList(allPost);
    }
  };
  useEffect(() => {
    if (selectedPostId !== -1 && isDeleteButton) removePostFunc();
    setDeleteButton(false);
    setSelectedPostId(-1);
  }, [selectedPostId]);

  const submitPost = async () => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("category", post.category);
    formData.append("description", post.description);
    formData.append("user_id", JSON.stringify(user?.id));
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

  const { fetchAll: enrollmentUser } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ENROLLMENTS_USER_API}?user_id=${
      user?.id
    }`
  );
  const { fetchAll: search } = useCrudApi(
    `${
      import.meta.env.VITE_REACT_APP_API
    }${SEARCH_POST_API}?search=${searchValue}`
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
    formData.append("user_id", String(user?.id));
    formData.append("status", "AP");
    const resp = await applyPost(formData, true);
    loadEnrollment();
    setSelectedPostId(-1);
  };
  const showPostList = async (isHide: boolean) => {
    if (isHide) {
      const resp = await loadMorePosts();
      if (resp.length === 0) {
        setNeedToSeeMore(false);
      }
      setPostList([...postList, ...resp]);
      setHideSeeMore(true);
    } else {
      const resp = await LoadRelevantPosts();
      setNeedToSeeMore(true);
      setPostList([...resp]);
      setHideSeeMore(false);
    }
  };

  const handleSearch = async () => {
    // if (searchValue) {
    const resp = await search();
    setPostList(resp);
    setSearchValue("");
    // }
  };
  const handleEnterKeyPress = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const resp = await search();
      setPostList(resp);
      setSearchValue("");
    }
  };
  return (
    <div className="overflow-y-auto h-screen">
      {user ? (
        <>
          <Navbar selectedKey="1" />
          <div className="flex flex-col mt-5 w-full gap-x-4">
            <div className="flex flex-col my-3 w-1/2 m-auto h-auto shadow-lg">
              <p className="mx-4 p-5 text-xl">Posts:</p>
              <div className="w-1/2 m-auto flex flex-row mb-4">
                <Input
                  className="px-3 rounded-lg"
                  placeholder="Search an post"
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleEnterKeyPress}
                />
                <button
                  className="h-10 mx-2 bg-blue-500 text-sm w-24 rounded-md text-white hover:bg-blue-600"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              {postList.length > 0 ? (
                <>
                  <PostCard
                    postList={postList}
                    setSelectedPostId={setSelectedPostId}
                    setModalView={setPostModalOpen}
                    setDeleteButton={setDeleteButton}
                    setNeedMorePost={setNeedToSeeMore}
                    setPost={setPost}
                    post={post}
                    applyHandler={applyHandler}
                  />
                  {!hideSeeMore ? (
                    <button
                      className="bg-blue-500 w-2/3 mx-auto text-white hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out mb-10 h-8 rounded-md"
                      onClick={(): Promise<void> => showPostList(true)}
                      hidden={!isNeedToSeeMore || !!searchValue}
                    >
                      Show more
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 w-2/3 mx-auto text-white hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out mb-10 h-8 rounded-md"
                      onClick={(): Promise<void> => showPostList(false)}
                      hidden={!isNeedToSeeMore || !!searchValue}
                    >
                      Relavent posts
                    </button>
                  )}
                  <PostModal
                    isModalView={isPostModalOpen}
                    post={post}
                    setPost={setPost}
                    title="Add post"
                    setModalView={setPostModalOpen}
                    onOk={submitPost}
                    selectedPostId={selectedPostId}
                    postList={postList}
                    setSelectedId={setSelectedPostId}
                  />
                </>
              ) : (
                <NoData />
              )}
            </div>
            {user?.role === INTERN && (
              <List
                enrollments={enrollments}
                setSelectedPostId={setSelectedPostId}
                setModalView={setPostModalOpen}
                setDeleteButton={setDeleteButton}
                setPost={setPost}
                post={post}
                applyHandler={applyHandler}
              />
            )}
          </div>
        </>
      ) : (
        <NoData text="Not found!" size="88" />
      )}
    </div>
  );
};
export default Dashboard;
