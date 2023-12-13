import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { EMPTY_POST } from "../../constant/Constant";
import { Post } from "../../types/Post";

type Props = {
  isModalView: boolean;
  setModalView: (isModalView: boolean) => void;
  onOk: () => void;
  post: Post;
  setPost: (model: Post) => void;
  title: string;
  selectedPostId: number;
  postList: Post[];
  setSelectedId: (id: number) => void;
};

const PostModal: React.FC<Props> = ({
  isModalView,
  setModalView,
  onOk,
  post,
  setPost,
  title,
  selectedPostId,
  postList,
  setSelectedId,
}: Props) => {
  return isModalView ? (
    <Modal
      title={title}
      open={isModalView}
      onCancel={(): void => {
        setSelectedId(-1);
        setModalView(false);
        setPost(EMPTY_POST);
      }}
      onOk={onOk}
      okText="Save"
    >
      <div className="flex flex-col my-3">
        <h1 className="font-bold">Title:</h1>
        <Input
          className="mb-4"
          defaultValue={
            postList.find((post) => post.id === selectedPostId)?.title
          }
          onChange={(e): void => {
            setPost({ ...post, title: e.target.value });
          }}
        />
        <h1 className="font-bold">Category:</h1>
        <Input
          className="mb-4"
          defaultValue={
            postList.find((post) => post.id === selectedPostId)?.category
          }
          onChange={(e): void => {
            setPost({ ...post, category: e.target.value });
          }}
        />
        <h1 className="font-bold">Description:</h1>
        <TextArea
          rows={8}
          className="mb-4"
          defaultValue={
            postList.find((post) => post.id === selectedPostId)?.description
          }
          onChange={(e): void => {
            setPost({ ...post, description: e.target.value });
          }}
        />
      </div>
    </Modal>
  ) : null;
};
export default PostModal;
