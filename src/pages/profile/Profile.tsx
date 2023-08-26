import { Image, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { PlusOutlined } from "@ant-design/icons";
import { useApi } from "../../api/useApi";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "types/Store";
import { useCrudApi } from "../../api/useLazyApi";
import { setUser } from "../../redux/actions";

const Profile = () => {
  const user = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();
  const [person, setPerson] = useState<User>(user);
  const [model, setModel] = useState<User>({
    id: user.id,
    firstname: person.firstname,
    lastname: person.lastname,
    biography: person.biography,
    created_at: person.created_at,
    username: person.username,
    photo: person.photo,
    role: person.role,
  });
  console.log(person);

  const [isModalView, setModalView] = useState(false);
  const { update: updateUser } = useCrudApi(
    "http://127.0.0.1:8000/update-biography/update-biography",
  );
  const { fetchOne: loadUser } = useCrudApi(
    "http://127.0.0.1:8000/user-detail/user-detail",
  );
  const onOk = async () => {
    setModalView(false);
    const res = await updateUser(model.id, {
      id: model.id,
      biography: model.biography,
    });
    setPerson(res);

    // setModel({});
  };
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
          onOk={onOk}
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
