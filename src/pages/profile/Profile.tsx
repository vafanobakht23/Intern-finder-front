import { Image, Input, Modal } from "antd";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { PlusOutlined } from "@ant-design/icons";
import { useApi } from "../../api/useApi";
import { User } from "../../types/User";
import { useSelector } from "react-redux";
import { Store } from "types/Store";

const Profile = () => {
  const user = useSelector((state: Store) => state.user);
  console.log(user);

  const [model, setModel] = useState<User>({
    id: "2",
    firstname: "",
    lastname: "",
    biography: "",
    created_at: "",
    username: "",
    photo: "",
    role: "",
  });
  const [isModalView, setModalView] = useState(false);
  const { load, data } = useApi("http://127.0.0.1:8000/login/login/", "GET");

  return (
    <div className={`${isModalView ? "opacity-40" : "opacity-100"}`}>
      <Navbar selectedKey="2" />
      <div className="flex justify-around">
        <Image src="../assets/react.svg" />
        <div className="flex flex-row gap-x-6">
          <span>{model.biography}</span>
          <PlusOutlined
            onClick={(): void => setModalView(true)}
            className="mt-1 cursor-pointer"
          />
        </div>
      </div>
      {isModalView && (
        <Modal
          title="Add biography"
          open={isModalView}
          onCancel={(): void => setModalView(false)}
          onOk={(): void => setModalView(false)}
        >
          <div>
            <Input
              onChange={(e): void => {
                // should be changed
                if (model) setModel({ ...model, biography: e.target.value });
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
export default Profile;
