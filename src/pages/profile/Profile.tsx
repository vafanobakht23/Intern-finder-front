import { Button, Image, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "types/Store";
import { useCrudApi } from "../../api/useLazyApi";
import Popup from "./Modal";
import Notification from "../../components/Notification";
import { setExperience, setUser } from "../../redux/actions";
import { Experience } from "types/Experience";

const Profile = () => {
  const user = useSelector((state: Store) => state.user);
  const experience = useSelector((state: Store) => state.experience);

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
  const [exp, setExp] = useState<Experience>({
    id: 0,
    title: "",
    company: "",
    years: "0",
    user_id: user.id,
  });
  // const [isSkOpen, setSkOpen] = useState(false);

  const { update, response } = useCrudApi(
    "http://127.0.0.1:8000/update-biography/update-biography"
  );
  const { create: loadExperiences } = useCrudApi(
    "http://127.0.0.1:8000/experience-list/experience-list/"
  );
  const onOk = async () => {
    setModalView(false);
    // setExOpen(false);
    // setSkOpen(false);
    const res = await update(user.id, {
      id: user.id,
      biography: model.biography,
      title: model.title,
      university: model.university,
      address: model.address,
    });
    if (res) {
      dispatch(setUser(res));
    }
  };
  const { create } = useCrudApi("http://127.0.0.1:8000/upload/upload/");
  const getData = async () => {
    const formData = new FormData();
    formData.append("user_id", JSON.stringify(user.id));
    const resp = await loadExperiences(formData, true);
    setExp(resp);
    dispatch(setExperience(resp));
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
  const { create: createExp } = useCrudApi(
    "http://127.0.0.1:8000/experiences/experiences/"
  );

  const experienceHandler = async () => {
    const formData = new FormData();
    formData.append("user_id", JSON.stringify(user.id));
    formData.append("title", exp?.title);
    formData.append("company", exp?.company);
    formData.append("years", exp?.years);
    setExOpen(false);
    const response = await createExp(formData, true);
    dispatch(setExperience([...experience, response]));
  };

  return (
    <div className={`${isModalView ? "opacity-40" : "opacity-100"}`}>
      <div className="mb-10">
        <Navbar selectedKey="2" />
      </div>
      <div className="w-1/2 h-1/3 border-red-400 m-auto shadow-lg">
        <div className="flex flex-col ml-16">
          <div className="rounded-3xl my-3">
            <img
              className="rounded-full h-44 w-44"
              src={"http://127.0.0.1:8000" + user.photo}
            />
          </div>
          <div className="flex flex-col">
            <Upload
              className="ml-4"
              name="file"
              customRequest={({ file }) => handleFileUpload(file)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload picture</Button>
            </Upload>

            <div className="flex flex-row justify-around mt-4">
              <div className="flex flex-col">
                <p className="text-2xl">{`${user.firstname} ${user.lastname}`}</p>
                <span className="text-sm">{user.title}</span>
                <span className="text-xs">{user.address}</span>
              </div>
              <div className="flex flex-row">
                <PlusOutlined
                  onClick={(): void => setModalView(true)}
                  className="mt-2 ml-4 cursor-pointer"
                />
              </div>
              {/* <div className="flex flex-col">
                {experience.map((ex, index) => (
                  <div className="" key={index}>
                    {ex.title}
                  </div>
                ))}
              </div> */}
            </div>
          </div>
          <div>
            <h4 className="font-bold mt-16">About me</h4>
            <p className="text-xs">{user.biography}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-96 w-1/2 m-auto shadow-lg">
        {/* {exp.id !== 0 && <p>{experience.title ? experience.title : " vafa"}</p>} */}
        <PlusOutlined
          onClick={(): void => setExOpen(true)}
          className="mt-2 ml-4 cursor-pointer"
        />
      </div>

      {isExOpen ? (
        <Modal title="Vafa" onOk={experienceHandler} open={isExOpen}>
          <Input
            onChange={(e): void => {
              setExp({ ...exp, title: e.target.value });
            }}
          />
          <Input
            onChange={(e): void => {
              setExp({ ...exp, company: e.target.value });
            }}
          />
          <Input
            onChange={(e): void => {
              setExp({ ...exp, years: e.target.value });
            }}
          />
        </Modal>
      ) : null}
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
