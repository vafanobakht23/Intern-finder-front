import { Image } from "antd";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { PlusOutlined } from "@ant-design/icons";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "types/Store";
import { useCrudApi } from "../../api/useLazyApi";
import Popup from "./Modal";
import { setUser } from "../../redux/actions";

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
    "http://127.0.0.1:8000/update-biography/update-biography",
  );
  const onOk = async () => {
    setModalView(false);
    // setExOpen(false);
    // setSkOpen(false);
    const res = await update(user.id, {
      id: user.id,
      biography: model.biography,
      university: model.university,
      address: model.address,
    });
    if (res) {
      setPerson(res as User);
      dispatch(setUser(res));
    }
  };

  return (
    <div className={`${isModalView ? "opacity-40" : "opacity-100"}`}>
      <div className="mb-10">
        <Navbar selectedKey="2" />
      </div>
      <div className="w-1/2 h-96 border-red-400 m-auto shadow-lg">
        <div className="flex flex-col ml-16">
          <Image src="../assets/react.svg" />
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
        title="Add biography"
      />
      {/* <Popup
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
      /> */}
    </div>
  );
};
export default Profile;
