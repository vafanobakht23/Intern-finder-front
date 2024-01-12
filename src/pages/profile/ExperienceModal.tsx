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
        <h1 className="font-bold">Title:</h1>
        <Input
          className="mb-4"
          defaultValue={
            experienceList.find((e) => e.id === selectedExperienceId)?.title
          }
          onChange={(e): void => {
            setExp({ ...exp, title: e.target.value });
          }}
        />
        <h1 className="font-bold">Company:</h1>
        <Input
          className="mb-4"
          defaultValue={
            experienceList.find((e) => e.id === selectedExperienceId)?.company
          }
          onChange={(e): void => {
            setExp({ ...exp, company: e.target.value });
          }}
        />
        <h1 className="font-bold">Years:</h1>
        <Input
          defaultValue={
            experienceList.find((e) => e.id === selectedExperienceId)?.years
          }
          onChange={(e): void => {
            setExp({ ...exp, years: e.target.value });
          }}
        />
      </div>
    </Modal>
  ) : null;
};
export default ExperienceModal;
