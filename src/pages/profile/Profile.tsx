import { Button, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { PlusOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
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
  const [isEditModeSkill, setEditModeSkill] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState(-1);

  const { update, response } = useCrudApi(
    "http://127.0.0.1:8000/update-biography/update-biography"
  );
  console.log(selectedExperienceId);

  const onOk = async () => {
    setModalView(false);
    const res = await update(user.id, {
      id: user.id,
      biography: model.biography,
      title: model.title,
      university: model.university,
      address: model.address,
    });
    if (res) dispatch(setUser(res));
  };

  const { create } = useCrudApi("http://127.0.0.1:8000/upload/upload/");
  const { create: loadSkill } = useCrudApi(
    "http://127.0.0.1:8000/skill-list/skill-list/"
  );
  const { create: loadExperiences } = useCrudApi(
    "http://127.0.0.1:8000/experience-list/experience-list/"
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
  };
  useEffect(() => {
    getData();
  }, []);

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

  const submit = async () => {
    const formData = new FormData();
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
    getData();
  };

  const { create: createExp } = useCrudApi(
    "http://127.0.0.1:8000/experiences/experiences/"
  );

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
      <div className="w-1/2 m-auto shadow-lg gap-y-2">
        <div className="flex flex-row justify-between ml-1 mt-6">
          <span className="text-xl font-bold my-2">Experiences</span>
          <PlusOutlined
            onClick={(): void => setExOpen(true)}
            className="mx-4 cursor-pointer text-lg"
          />
        </div>
        {experienceList &&
          experienceList?.map((ex) => (
            <div key={ex.id} className="flex m-4">
              <div className="flex flex-row">
                <div className="h-16 w-16 bg-black" />
                <div className="flex flex-col ml-2">
                  <p className="text-lg">{ex.title}</p>
                  <p className="text-sm">{ex.company}</p>
                  <div className="flex flex-row justify-between">
                    <p className="text-xs mt-1">{`${ex.years} years`}</p>
                    <EditOutlined
                      onClick={(): void => {
                        setExOpen(true);
                        setSelectedExperienceId(ex.id);
                      }}
                      className="ml-4 mt-1.5 cursor-pointer text-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-1/2 m-auto shadow-lg gap-y-2">
        <div className="flex flex-row justify-between ml-1 mt-6">
          <span className="text-xl font-bold my-2">Skills</span>
          <PlusOutlined
            onClick={(): void => setSkillModalOpen(true)}
            className="mx-4 cursor-pointer text-lg"
          />
        </div>
        {skillList &&
          skillList?.map((sk, index) => (
            <div key={index} className="flex m-4">
              <div className="flex flex-row">
                <span className="mt-1.5">{`${index + 1}.`}</span>
                <div className="flex flex-col ml-2">
                  <div className="flex flex-row justify-between">
                    <p className="text-lg mt-1">{sk.title}</p>
                    <EditOutlined
                      onClick={(): void => setSkillModalOpen(true)}
                      className="ml-4 mt-2.5 cursor-pointer text-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
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
