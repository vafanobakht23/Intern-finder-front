import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Experience } from "types/Experience";
import { User } from "types/User";

type Props = {
  isModalView: boolean;
  setModalView: (isModalView: boolean) => void;
  onOk: () => void;
  exp: Experience;
  setExp: (exp: Experience) => void;
  title: string;
};

const ExperienceModal: React.FC<Props> = ({
  isModalView,
  setModalView,
  onOk,
  exp,
  setExp,
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
        <h1 className="font-bold">Title:</h1>
        <Input
          className="mb-4"
          //   defaultValue={exp.title}
          onChange={(e): void => {
            setExp({ ...exp, title: e.target.value });
          }}
        />
        <h1 className="font-bold">Company:</h1>
        <Input
          className="mb-4"
          //   defaultValue={user.address}
          onChange={(e): void => {
            setExp({ ...exp, company: e.target.value });
          }}
        />
        <h1 className="font-bold">Years:</h1>
        <Input
          //   defaultValue={user.university}
          onChange={(e): void => {
            setExp({ ...exp, years: e.target.value });
          }}
        />
      </div>
    </Modal>
  ) : null;
};
export default ExperienceModal;
