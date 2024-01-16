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
      title={
        postList.find((post) => post.id === selectedPostId)?.title
          ? "Edit post"
          : title
      }
      open={isModalView}
      okButtonProps={{
        className: "!h-10 !font-semibold bg-blue-500 rounded-sm",
      }}
      onCancel={(): void => {
        setSelectedId(-1);
        setModalView(false);
        setPost(EMPTY_POST);
      }}
      onOk={onOk}
      okText="Save"
    >
      <div className="flex flex-col my-3">
        <span className="font-bold mt-3 mb-1">Title</span>
        <Input
          className="mb-4"
          placeholder="Enter your post's title"
          defaultValue={
            postList.find((post) => post.id === selectedPostId)?.title
          }
          onChange={(e): void => {
            setPost({ ...post, title: e.target.value });
          }}
        />
        <span className="font-bold mb-1">Category</span>
        <Input
          className="mb-4"
          placeholder="Enter post's category"
          defaultValue={
            postList.find((post) => post.id === selectedPostId)?.category
          }
          onChange={(e): void => {
            setPost({ ...post, category: e.target.value });
          }}
        />
        <span className="font-bold mb-1">Description</span>
        <TextArea
          rows={7}
          className="mb-4"
          placeholder="Enter post's description"
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
