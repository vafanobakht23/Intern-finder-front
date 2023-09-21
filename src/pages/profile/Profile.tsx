import { Button, Card, Col, Row, Upload } from "antd";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "types/Store";
import { useCrudApi } from "../../api/useLazyApi";
import Popup from "./Modal";
import Notification from "../../components/Notification";
import { setExperience, setUser } from "../../redux/actions";
import { Experience } from "types/Experience";
import { Skill } from "types/Skill";
import SkillModal from "./SkillModal";
import ExperienceModal from "./ExperienceModal";
import {
  COMPANY,
  EMPTY_EXPERIENCE,
  EMPTY_POST,
  EMPTY_SKILL,
  INTERN,
} from "../../constant/Constant";
import { Post } from "types/Post";
import PostModal from "./PostModal";
import PostCard from "./PostCard";
import {
  CREATE_EXPERIENCE_API,
  CREATE_POST_API,
  CREATE_SKILL_API,
  EXAM_LIST_API,
  EXPERIENCE_LIST_API,
  POST_DELETE_API,
  POST_LIST_API,
  POST_UPDATE_API,
  REMOVE_SKILL_API,
  SKILL_LIST_API,
  UPDATE_EXPERIENCE_API,
  UPDATE_SELF_INFORMATION_API,
  UPLOAD_PICTURE_API,
} from "../../api/url/urls";
import { validateFormData } from "../../utils/validateFormData";
import.meta.env.BASE_URL;

const Profile = () => {
  const user = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();
  const [model, setModel] = useState<User>({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    biography: user.biography,
    created_at: user.created_at,
    username: user.username,
    title: user.title,
    university: user.university,
    address: user.address,
    photo: user.photo,
    role: user.role,
  });

  const [isModalView, setModalView] = useState(false);
  const [isExOpen, setExOpen] = useState(false);
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [skillList, setSkillList] = useState<Skill[]>([]);
  const [exp, setExp] = useState<Experience>(EMPTY_EXPERIENCE);
  const [skill, setSkill] = useState<Skill>(EMPTY_SKILL);
  const [isSkillModalOpen, setSkillModalOpen] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState(-1);
  const [selectedSkillId, setSelectedSkillId] = useState(-1);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [isDeleteButton, setDeleteButton] = useState(false);
  const [post, setPost] = useState<Post>(EMPTY_POST);
  const [postList, setPostList] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(-1);
  const { update: updateInformation } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${UPDATE_SELF_INFORMATION_API}`
  );
  const { fetchAll: loadExams } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${EXAM_LIST_API}`
  );
  const { create } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${UPLOAD_PICTURE_API}`
  );
  const { create: loadSkill } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${SKILL_LIST_API}`
  );
  const { create: loadExperiences } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${EXPERIENCE_LIST_API}`
  );
  const { create: loadPost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${POST_LIST_API}`
  );
  const { create: createSkill } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${CREATE_SKILL_API}`
  );
  const { update: updateExperience } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${UPDATE_EXPERIENCE_API}`
  );
  const { remove: removeSkill } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${REMOVE_SKILL_API}`
  );
  const { remove: removePost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${POST_DELETE_API}`
  );
  const { update: updatePost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${POST_UPDATE_API}`
  );
  const { create: createExp } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${CREATE_EXPERIENCE_API}`
  );
  const { create: createPost } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${CREATE_POST_API}`
  );
  const onOk = async () => {
    setModalView(false);
    const formData = new FormData();
    formData.append("id", JSON.stringify(user.id));
    formData.append("biography", model.biography);
    formData.append("title", model.title);
    formData.append("university", model.university);
    formData.append("address", model.address);
    const res = await updateInformation(user.id, formData);
    Notification.openSuccessNotification("Information updated successfully");
    if (res) dispatch(setUser(res));
  };

  const getData = async () => {
    const formData = new FormData();
    formData.append("user_id", JSON.stringify(user.id));
    if (user.role === INTERN) {
      const experienceResp = await loadExperiences(formData, true);
      setExperienceList(experienceResp);
      dispatch(setExperience(experienceResp));
      const skillResp = await loadSkill(formData, true);
      setSkillList(skillResp);
    } else {
      const postResp = await loadPost(formData, true);
      const res = await loadExams();
      setPostList(postResp);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleFileUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    const response = await create(formData, true);
    const res = await updateInformation(user.id, {
      id: user.id,
    });
    dispatch(setUser(res));
  };

  const submit = async () => {
    const formData = new FormData();
    if (
      selectedExperienceId === -1 &&
      selectedSkillId === -1 &&
      selectedPostId === -1
    ) {
      if (isSkillModalOpen) {
        formData.append("user_id", JSON.stringify(user.id));
        formData.append("title", skill?.title);
        setSkillModalOpen(false);
        const isEmpty = validateFormData(formData);
        if (isEmpty)
          Notification.openErrorNotification("Please fill all input");
        else {
          const response = await createSkill(formData, true);
          Notification.openSuccessNotification("Skill added successfully");
        }
      } else {
        formData.append("user_id", JSON.stringify(user.id));
        formData.append("title", exp?.title);
        formData.append("company", exp?.company);
        formData.append("years", exp?.years);
        setExOpen(false);
        const isEmpty = validateFormData(formData);
        if (isEmpty)
          Notification.openErrorNotification("Please fill all input");
        else {
          const response = await createExp(formData, true);
          setExp(EMPTY_EXPERIENCE);
          Notification.openSuccessNotification("Experience added successfully");
        }
      }
    } else if (selectedExperienceId !== -1 && selectedSkillId === -1) {
      formData.append("user_id", JSON.stringify(user.id));
      formData.append("title", exp?.title);
      formData.append("company", exp?.company);
      formData.append("years", exp?.years);
      const resp = await updateExperience(selectedExperienceId, formData);
      Notification.openSuccessNotification("Experience updated successfully");
      setExOpen(false);
      setSelectedExperienceId(-1);
    } else if (selectedSkillId !== -1) {
      const resp = await removeSkill(selectedSkillId);
      Notification.openSuccessNotification("Skill deleted successfully");
      setSelectedSkillId(-1);
      setSelectedExperienceId(-1);
    } else if (selectedPostId !== -1 && isDeleteButton) {
      const resp = await removePost(selectedPostId);
      Notification.openSuccessNotification("Post deleted successfully");
      setSelectedPostId(-1);
    }
    getData();
  };

  useEffect(() => {
    if (selectedSkillId !== -1) submit();
    if (selectedPostId !== -1 && isDeleteButton) {
      submit();
      setDeleteButton(false);
    }
  }, [selectedSkillId, selectedPostId]);

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
  const isModalOpen =
    isModalView || isPostModalOpen || isSkillModalOpen || isExOpen;
  return (
    <div
      className={`overflow-y-auto h-screen ${
        isModalOpen ? "opacity-40" : "opacity-100"
      }`}
    >
      <div className="mb-10">
        <Navbar selectedKey="2" />
      </div>
      <div className="w-1/2 m-auto shadow-lg flex flex-col">
        <div className="flex flex-col">
          <img
            className="rounded-full h-44 w-44 mx-16"
            src={"http://127.0.0.1:8000" + user.photo}
          />
          <div className="flex flex-row justify-between mx-16">
            <Upload
              className="ml-4 mt-2"
              name="file"
              customRequest={({ file }) => handleFileUpload(file)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload picture</Button>
            </Upload>
            <EditOutlined
              onClick={(): void => setModalView(true)}
              className="mt-2 ml-4 cursor-pointer text-xl"
            />
          </div>
        </div>
        <div className="flex flex-col mx-20">
          <div className="flex flex-row justify-between mt-4">
            <p className="text-2xl">{`${user.firstname} ${user.lastname}`}</p>
            {user.role === INTERN && (
              <p className="text-xl">{`${user.university} university`}</p>
            )}
          </div>
          <span className="text-sm mt-1">{user.title}</span>
          <span className="text-xs mt-1">{user.address}</span>
        </div>
        <div className="mx-20 mt-6 mb-7">
          <h3 className="font-bold">About me</h3>
          <p className="ml-1.5">{user.biography}</p>
        </div>
      </div>
      {user.role === COMPANY && (
        <div>
          <div className="flex w-1/2 shadow-lg m-auto h-20">
            <div className="flex flex-row justify-center m-auto gap-x-5 ">
              <p className="mt-1">You can share the post</p>
              <Button
                onClick={(): void => setPostModalOpen(true)}
                className="bg-green-400"
              >
                {" "}
                Share post
              </Button>
            </div>
          </div>
          <PostCard
            postList={postList}
            setSelectedPostId={setSelectedPostId}
            setModalView={setPostModalOpen}
            setDeleteButton={setDeleteButton}
            setPost={setPost}
          />
        </div>
      )}

      {user.role === COMPANY && (
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
      )}
      {user.role === INTERN && (
        <>
          <div className="w-1/2 m-auto shadow-lg gap-y-2">
            <div className="flex flex-row justify-between ml-1 mt-6">
              <span className="text-xl font-bold my-2 mx-7">Experiences</span>
              <PlusOutlined
                onClick={(): void => setExOpen(true)}
                className="mx-4 cursor-pointer text-lg"
              />
            </div>
            <Row gutter={16}>
              {experienceList &&
                experienceList.map((ex, index) => (
                  <Col span={12} key={index}>
                    <Card
                      title={
                        <div className="flex flex-row justify-between">
                          <span>{ex.title}</span>
                          <EditOutlined
                            className="text-lg"
                            onClick={(): void => {
                              setExOpen(true);
                              setSelectedExperienceId(ex.id);
                              setExp({
                                id: ex.id,
                                title: ex.title,
                                company: ex.company,
                                years: ex.years,
                                user_id: user.id,
                              });
                            }}
                          />
                        </div>
                      }
                      bordered={false}
                      className="shadow-md mx-7 my-2"
                      style={{ borderColor: "#d9d9d9" }}
                    >
                      <div className="flex flex-col">
                        <span className="text-base">{ex.company}</span>
                        <div className="flex flex-row justify-between">
                          <span className="mt-1 text-xs">{`${ex.years} years`}</span>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
          <div className="w-1/2 m-auto shadow-lg gap-y-2">
            <div className="flex flex-row justify-between ml-1 mt-6">
              <span className="text-xl font-bold my-2 mx-7">Skills</span>
              <PlusOutlined
                onClick={(): void => setSkillModalOpen(true)}
                className="mx-4 cursor-pointer text-lg"
              />
            </div>
            <div className="flex flex-wrap">
              {skillList &&
                skillList?.map((sk, index) => (
                  <div
                    key={sk.id}
                    className="w-full sm:w-full md:w-2/5 p-6 border rounded mx-8 my-2"
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-lg mt-1">{`${index + 1}. ${
                        sk.title
                      }`}</p>
                      <div className="flex flex-row justify-between">
                        <DeleteOutlined
                          onClick={(): void => {
                            setSelectedSkillId(sk.id);
                          }}
                          className="ml-4 mt-1 cursor-pointer text-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      {user.role === INTERN && (
        <>
          <SkillModal
            isModalView={isSkillModalOpen}
            setModalView={setSkillModalOpen}
            onOk={submit}
            skill={skill}
            setSkill={setSkill}
            title="Add skill"
          />
          <ExperienceModal
            isModalView={isExOpen}
            setModalView={setExOpen}
            onOk={submit}
            exp={exp}
            setExp={setExp}
            selectedExperienceId={selectedExperienceId}
            experienceList={experienceList}
            setSelectedExperienceId={setSelectedExperienceId}
            title="Add Experience"
          />
        </>
      )}

      <Popup
        isModalView={isModalView}
        setModalView={setModalView}
        onOk={onOk}
        model={model}
        setModel={setModel}
        user={user}
        title="Edit information"
      />
    </div>
  );
};
export default Profile;
