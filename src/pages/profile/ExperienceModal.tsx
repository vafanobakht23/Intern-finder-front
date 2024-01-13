import { Input, Modal } from "antd";
import { Experience } from "types/Experience";

type Props = {
  isModalView: boolean;
  setModalView: (isModalView: boolean) => void;
  onOk: () => void;
  exp: Experience;
  setExp: (exp: Experience) => void;
  title: string;
  selectedExperienceId: number;
  experienceList: Experience[];
  setSelectedExperienceId: (selectedExperienceId: number) => void;
};

const ExperienceModal: React.FC<Props> = ({
  isModalView,
  setModalView,
  onOk,
  exp,
  setExp,
  title,
  selectedExperienceId,
  experienceList,
  setSelectedExperienceId,
}: Props) => {
  return isModalView ? (
    <Modal
      title={title}
      open={isModalView}
      okButtonProps={{
        className: "!h-10 !font-semibold bg-blue-500 rounded-sm",
      }}
      onCancel={(): void => {
        setSelectedExperienceId(-1);
        setModalView(false);
      }}
      onOk={onOk}
      okText="Save"
    >
      <div className="flex flex-col my-3">
        <span className="font-bold mt-3">Title</span>
        <Input
          className="mb-4"
          defaultValue={
            experienceList.find((e) => e.id === selectedExperienceId)?.title
          }
          onChange={(e): void => {
            setExp({ ...exp, title: e.target.value });
          }}
        />
        <span className="font-bold">Company</span>
        <Input
          className="mb-4"
          defaultValue={
            experienceList.find((e) => e.id === selectedExperienceId)?.company
          }
          onChange={(e): void => {
            setExp({ ...exp, company: e.target.value });
          }}
        />
        <span className="font-bold">Years</span>
        <Input
          defaultValue={
            experienceList.find((e) => e.id === selectedExperienceId)?.years
          }
          onChange={(e): void => {
            setExp({ ...exp, years: e.target.value });
          }}
          className="mb-4"
        />
      </div>
    </Modal>
  ) : null;
};
export default ExperienceModal;
