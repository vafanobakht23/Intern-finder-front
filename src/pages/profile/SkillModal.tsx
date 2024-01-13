import { Input, Modal } from "antd";
import { Skill } from "types/Skill";

type Props = {
  isModalView: boolean;
  setModalView: (isModalView: boolean) => void;
  onOk: () => void;
  skill: Skill;
  setSkill: (model: Skill) => void;
  title: string;
};

const SkillModal: React.FC<Props> = ({
  isModalView,
  setModalView,
  onOk,
  skill,
  setSkill,
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
        <span className="font-bold mt-3 mb-1">Skill</span>
        <Input
          className="mb-4"
          placeholder="Enter your skill"
          onChange={(e): void => {
            setSkill({ ...skill, title: e.target.value });
          }}
        />
      </div>
    </Modal>
  ) : null;
};
export default SkillModal;
