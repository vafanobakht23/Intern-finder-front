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
import { setExperience, setSkill, setUser } from "../../redux/actions";
import { Experience } from "types/Experience";
import { Skill } from "types/Skill";
import SkillModal from "./SkillModal";
import ExperienceModal from "./ExperienceModal";
import { COMPANY, INTERN } from "../../constant/Constant";
import { Post } from "types/Post";
import PostModal from "./PostModal";

const Profile = () => {
  const user = useSelector((state: Store) => state.user);
  // const experience = useSelector((state: Store) => state.experience);
  // const skills = useSelector((state: Store) => state.skill);

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

  const [exp, setExp] = useState<Experience>({
    id: 0,
    title: "",
    company: "",
    years: "0",
    user_id: user.id,
  });
  const [skill, setSkil] = useState<Skill>({
    id: 0,
    title: "",
    user_id: user.id,
  });
  const [isSkillModalOpen, setSkillModalOpen] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState(-1);
  const [selectedSkillId, setSelectedSkillId] = useState(-1);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [post, setPost] = useState<Post>({
    id: 0,
    title: "",
    category: "",
    created_at: "",
    description: "",
    user_id: user.id,
  });
  const [postList, setPostList] = useState<Post[]>([]);
  const { update, response } = useCrudApi(
    "http://127.0.0.1:8000/update-biography/update-biography"
  );
  const onOk = async () => {
    setModalView(false);
    const formData = new FormData();
    formData.append("id", JSON.stringify(user.id));
    formData.append("biography", model.biography);
    formData.append("title", model.title);
    formData.append("university", model.university);
    formData.append("address", model.address);

    const res = await update(user.id, formData);
    if (res) dispatch(setUser(res));
  };

  const { create } = useCrudApi("http://127.0.0.1:8000/upload/upload/");
  const { create: loadSkill } = useCrudApi(
    "http://127.0.0.1:8000/skill-list/skill-list/"
  );
  const { create: loadExperiences } = useCrudApi(
    "http://127.0.0.1:8000/experience-list/experience-list/"
  );
  const { create: loadPost } = useCrudApi(
    "http://127.0.0.1:8000/api/post/post-list/"
  );
  const getData = async () => {
    const formData = new FormData();
    formData.append("user_id", JSON.stringify(user.id));
    const experienceResp = await loadExperiences(formData, true);
    setExperienceList(experienceResp);
    dispatch(setExperience(experienceResp));
    const skillResp = await loadSkill(formData, true);
    setSkillList(skillResp);
    dispatch(setSkill(skillResp));
    const postResp = await loadPost(formData, true);
    setPostList(postResp);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(postList);

  const handleFileUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    const response = await create(formData, true);
    const res = await update(user.id, {
      id: user.id,
    });
    dispatch(setUser(res));
  };

  const { create: createSkill } = useCrudApi(
    "http://127.0.0.1:8000/skill/skill/"
  );
  const { update: updateExperience } = useCrudApi(
    "http://127.0.0.1:8000/experiences/experiences"
  );
  const { remove: removeSkill } = useCrudApi(
    "http://127.0.0.1:8000/skill/skill"
  );
  const submit = async () => {
    const formData = new FormData();
    if (selectedExperienceId === -1 && selectedSkillId === -1) {
      if (isSkillModalOpen) {
        formData.append("user_id", JSON.stringify(user.id));
        formData.append("title", skill?.title);
        setSkillModalOpen(false);
        const response = await createSkill(formData, true);
        Notification.openSuccessNotification("Skill added successfully");
      } else {
        formData.append("user_id", JSON.stringify(user.id));
        formData.append("title", exp?.title);
        formData.append("company", exp?.company);
        formData.append("years", exp?.years);
        setExOpen(false);
        const response = await createExp(formData, true);
        Notification.openSuccessNotification("Experience added successfully");
      }
    } else if (selectedExperienceId !== -1 && selectedSkillId === -1) {
      console.log(exp);
      formData.append("user_id", JSON.stringify(user.id));
      formData.append("title", exp?.title);
      formData.append("company", exp?.company);
      formData.append("years", exp?.years);
      console.log(typeof formData);

      const resp = await updateExperience(selectedExperienceId, formData);
      Notification.openSuccessNotification("Experience updated successfully");
      setExOpen(false);
    } else if (selectedSkillId !== -1) {
      const resp = await removeSkill(selectedSkillId);
      Notification.openSuccessNotification("Skill deleted successfully");
      setSelectedSkillId(-1);
    }
    getData();
  };
  useEffect(() => {
    if (selectedSkillId !== -1) submit();
  }, [selectedSkillId]);

  const { create: createExp } = useCrudApi(
    "http://127.0.0.1:8000/experiences/experiences/"
  );
  const { create: createPost } = useCrudApi(
    "http://127.0.0.1:8000/api/post/create-post/"
  );
  const submitPost = async () => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("category", post.category);
    formData.append("description", post.description);
    formData.append("user_id", JSON.stringify(user.id));
    const resp = await createPost(formData, true);
    setPost(resp);
    setPostModalOpen(false);
  };

  return (
    <div
      className={`overflow-y-auto h-screen ${
        isModalView ? "opacity-40" : "opacity-100"
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
            <p className="text-xl">{`${user.university} university`}</p>
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
        <div className="flex flex-row m-auto justify-center mt-5">
          <p>You can share the post</p>
          <Button
            onClick={(): void => setPostModalOpen(true)}
            className="text-purple-300"
          >
            Share post
          </Button>
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
            setSkill={setSkil}
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
