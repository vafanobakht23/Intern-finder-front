import { Image, Input, Modal } from "antd";
import { useState } from "react";
import { user } from "types/user";
import Navbar from "../../components/Navbar";
import { PlusOutlined } from "@ant-design/icons";

const Profile = () => {
  const [model, setModel] = useState<user>({
    id: "2",
    firstname: "",
    lastname: "",
    biography: "",
    created_at: "",
    email: "",
    photo: "",
    role: "",
  });
  const [isModalView, setModalView] = useState(false);
  console.log(model);

  return (
    <div>
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
