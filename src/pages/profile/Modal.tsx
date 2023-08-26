import { Input, Modal } from "antd";
import { User } from "types/User";

type Props = {
  isModalView: boolean;
  setModalView: (isModalView: boolean) => void;
  onOk: () => void;
  model: User;
  setModel: (model: User) => void;
  title: string;
};

const Popup: React.FC<Props> = ({
  isModalView,
  setModalView,
  onOk,
  model,
  setModel,
  title,
}: Props) => {
  return isModalView ? (
    <Modal
      title={title}
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
  ) : null;
};
export default Popup;
