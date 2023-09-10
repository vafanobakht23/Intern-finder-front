import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Post } from "types/Post";

type Props = {
  isModalView: boolean;
  setModalView: (isModalView: boolean) => void;
  onOk: () => void;
  post: Post;
  setPost: (model: Post) => void;
  title: string;
};

const PostModal: React.FC<Props> = ({
  isModalView,
  setModalView,
  onOk,
  post,
  setPost,
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
          //   defaultValue={user.title}
          onChange={(e): void => {
            setPost({ ...post, title: e.target.value });
          }}
        />
        <h1 className="font-bold">Category:</h1>
        <Input
          className="mb-4"
          //   defaultValue={user.title}
          onChange={(e): void => {
            setPost({ ...post, category: e.target.value });
          }}
        />
        <h1 className="font-bold">Description:</h1>
        <TextArea
          rows={8}
          className="mb-4"
          //   defaultValue={user.title}
          onChange={(e): void => {
            setPost({ ...post, description: e.target.value });
          }}
        />
      </div>
    </Modal>
  ) : null;
};
export default PostModal;
