import { Image, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { PlusOutlined } from "@ant-design/icons";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "types/Store";
import { useCrudApi } from "../../api/useLazyApi";
import Popup from "./Modal";

const Profile = () => {
  const user = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();
  const [person, setPerson] = useState<User>(user);
  const [model, setModel] = useState<User>({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    biography: user.biography,
    created_at: user.created_at,
    username: user.username,
    photo: user.photo,
    role: user.role,
  });

  const [isModalView, setModalView] = useState(false);
  const [isExOpen, setExOpen] = useState(false);
  const [isSkOpen, setSkOpen] = useState(false);

  const { update: updateUser } = useCrudApi(
    "http://127.0.0.1:8000/update-biography/update-biography",
  );
  const { fetchOne: loadUser } = useCrudApi(
    "http://127.0.0.1:8000/user-detail/user-detail",
  );
  const onOk = async () => {
    setModalView(false);
    setExOpen(false);
    setSkOpen(false);
    const res = await updateUser(model.id, {
      id: model.id,
      biography: model.biography,
    });
    // const resuserLoad = await loadUser(model.id);
    console.log(res);
    setPerson(res);
  };
  return (
    <div className={`${isModalView ? "opacity-40" : "opacity-100"}`}>
      <Navbar selectedKey="2" />
      <div className="flex justify-around">
        <Image src="../assets/react.svg" />
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-6">
            <span>{user.biography ? user.biography : person.biography}</span>
            <PlusOutlined
              onClick={(): void => setModalView(true)}
              className="mt-1 cursor-pointer"
            />
          </div>
          <div className="flex flex-row gap-x-6">
            <span>{user.biography ? user.biography : person.biography}</span>
            <PlusOutlined
              onClick={(): void => setExOpen(true)}
              className="mt-1 cursor-pointer"
            />
          </div>
          <div className="flex flex-row gap-x-6">
            <span>{user.biography ? user.biography : person.biography}</span>
            <PlusOutlined
              onClick={(): void => setSkOpen(true)}
              className="mt-1 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <Popup
        isModalView={isModalView}
        setModalView={setModalView}
        onOk={onOk}
        model={model}
        setModel={setModel}
        title="Add biography"
      />
      <Popup
        isModalView={isExOpen}
        setModalView={setExOpen}
        onOk={onOk}
        model={model}
        setModel={setModel}
        title="Add experience"
      />
      <Popup
        isModalView={isSkOpen}
        setModalView={setSkOpen}
        onOk={onOk}
        model={model}
        setModel={setModel}
        title="Add skills"
      />
    </div>
  );
};
export default Profile;
