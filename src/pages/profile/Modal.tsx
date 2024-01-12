import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { INTERN } from "../../constant/Constant";
import { User } from "../../types/User";

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
        <h1 className="font-bold mb-1">Biography</h1>
        <TextArea
          className="mb-4 rounded-lg"
          defaultValue={user.biography}
          onChange={(e): void => {
            if (model) setModel({ ...model, biography: e.target.value });
          }}
        />
        <h1 className="font-bold mb-1">Role</h1>
        <Input
          className="mb-4 rounded-lg"
          defaultValue={user.title}
          onChange={(e): void => {
            if (model) setModel({ ...model, title: e.target.value });
          }}
        />
        <h1 className="font-bold mb-1">Address</h1>
        <Input
          className="mb-4 rounded-lg"
          defaultValue={user.address}
          onChange={(e): void => {
            if (model) setModel({ ...model, address: e.target.value });
          }}
        />
        {user.role === INTERN && (
          <>
            <h1 className="font-bold mb-1">University</h1>
            <Input
              className="rounded-lg"
              defaultValue={user.university}
              onChange={(e): void => {
                if (model) setModel({ ...model, university: e.target.value });
              }}
            />
          </>
        )}
      </div>
    </Modal>
  ) : null;
};
export default Popup;
