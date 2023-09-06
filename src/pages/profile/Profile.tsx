import { Button, Image, Upload } from "antd";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "types/Store";
import { useCrudApi } from "../../api/useLazyApi";
import Popup from "./Modal";
import Notification from "../../components/Notification";
import { setUser } from "../../redux/actions";

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
  // const [isExOpen, setExOpen] = useState(false);
  // const [isSkOpen, setSkOpen] = useState(false);

  const { update, response } = useCrudApi(
    "http://127.0.0.1:8000/update-biography/update-biography"
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

  const handleFileUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    const response = await await create(formData, true);
    const res = await update(user.id, {
      id: user.id,
    });
  };

  return (
    <div className={`${isModalView ? "opacity-40" : "opacity-100"}`}>
      <div className="mb-10">
        <Navbar selectedKey="2" />
      </div>
      <div className="w-1/2 h-96 border-red-400 m-auto shadow-lg">
        <div className="flex flex-col ml-16">
          <div className="rounded-3xl">
            <img src={"http://127.0.0.1:8000" + user.photo} />
          </div>
          <Upload
            name="file"
            customRequest={({ file }) => handleFileUpload(file)}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload File</Button>
          </Upload>

          <div className="flex flex-row justify-around mt-4">
            <div className="flex flex-col">
              <p className="text-2xl">{`${user.firstname} ${user.lastname}`}</p>
              <span className="text-sm">{user.title}</span>
              <span className="text-xs">{user.address}</span>
            </div>
            <div className="flex flex-row">
              <p className="text-2xl">{user.university}</p>
              <PlusOutlined
                onClick={(): void => setModalView(true)}
                className="mt-2 ml-4 cursor-pointer"
              />
            </div>
          </div>
          <div>
            <h4 className="font-bold mt-16">About me</h4>
            <p className="text-xs">{user.biography}</p>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col">
        <div className="flex flex-row gap-x-6">
          <span>{person?.biography ? person.biography : user.biography}</span>
          <PlusOutlined
            onClick={(): void => setModalView(true)}
            className="mt-1 cursor-pointer"
          />
        </div>
      </div> */}
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
