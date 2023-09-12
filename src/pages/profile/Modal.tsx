import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { User } from "types/User";

type Props = {
  isModalView: boolean;
  setModalView: (isModalView: boolean) => void;
  onOk: () => void;
  model: User;
  setModel: (model: User) => void;
  user: User;
  title: string;
};

const Popup: React.FC<Props> = ({
  isModalView,
  setModalView,
  onOk,
  model,
  setModel,
  user,
  title,
}: Props) => {
  return isModalView ? (
    <Modal
      title={title}
      open={isModalView}
      onCancel={(): void => setModalView(false)}
      onOk={onOk}
      okText="Save"
    >
      <div className="flex flex-col my-3">
        <h1 className="font-bold">Biography:</h1>
        <TextArea
          className="mb-4"
          defaultValue={user.biography}
          onChange={(e): void => {
            // should be changed
            if (model) setModel({ ...model, biography: e.target.value });
          }}
        />
        <h1 className="font-bold">Role:</h1>
        <Input
          className="mb-4"
          defaultValue={user.title}
          onChange={(e): void => {
            // should be changed
            if (model) setModel({ ...model, title: e.target.value });
          }}
        />
        <h1 className="font-bold">Address:</h1>
        <Input
          className="mb-4"
          defaultValue={user.address}
          onChange={(e): void => {
            // should be changed
            if (model) setModel({ ...model, address: e.target.value });
          }}
        />
        <h1 className="font-bold">University:</h1>
        <Input
          defaultValue={user.university}
          onChange={(e): void => {
            // should be changed
            if (model) setModel({ ...model, university: e.target.value });
          }}
        />
      </div>
    </Modal>
  ) : null;
};
export default Popup;
