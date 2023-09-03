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
    >
      <div className="flex flex-col my-3">
        <TextArea
          className="my-2"
          defaultValue={user.biography}
          onChange={(e): void => {
            // should be changed
            if (model) setModel({ ...model, biography: e.target.value });
          }}
        />
        <Input
          className="my-2"
          defaultValue={user.address}
          onChange={(e): void => {
            // should be changed
            if (model) setModel({ ...model, address: e.target.value });
          }}
        />
        <Input
          className="my-2"
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
