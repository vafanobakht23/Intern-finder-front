import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { User } from "types/User";
import { INTERN } from "../../constant/Constant";

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
      okButtonProps={{
        className: "!h-10 !font-semibold bg-blue-500 rounded-sm",
      }}
      onOk={onOk}
      okText="Save"
    >
      <div className="flex flex-col my-3">
        <span className="font-bold mb-1 mt-3">Role</span>
        <Input
          className="mb-4 rounded-lg"
          placeholder="Enter your role"
          defaultValue={user.title}
          onChange={(e): void => {
            if (model) setModel({ ...model, title: e.target.value });
          }}
        />
        <span className="font-bold mb-1">Address</span>
        <Input
          className="mb-4 rounded-lg"
          placeholder="Enter your address"
          defaultValue={user.address}
          onChange={(e): void => {
            if (model) setModel({ ...model, address: e.target.value });
          }}
        />
        {user.role === INTERN && (
          <>
            <span className="font-bold mb-1">University</span>
            <Input
              className="rounded-lg"
              placeholder="Enter your university"
              defaultValue={user.university}
              onChange={(e): void => {
                if (model) setModel({ ...model, university: e.target.value });
              }}
            />
          </>
        )}
        <span className="font-bold mb-1 mt-5">Biography</span>
        <TextArea
          className="mb-4 rounded-lg"
          placeholder="Enter your address"
          defaultValue={user.biography}
          onChange={(e): void => {
            if (model) setModel({ ...model, biography: e.target.value });
          }}
        />
      </div>
    </Modal>
  ) : null;
};
export default Popup;
