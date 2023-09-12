import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { Post } from "types/Post";
import useDateFormatter from "./hooks/useDateFormatter";

type Props = {
  postList: Post[];
  setSelectedPostId: (selectedPostId: number) => void;
  setModalView: (modalView: boolean) => void;
  setDeleteButton: (isDeleteButton: boolean) => void;
  setPost: (post: Post) => void;
};

const PostCard: React.FC<Props> = ({
  postList,
  setSelectedPostId,
  setModalView,
  setDeleteButton,
  setPost,
}: Props) => {
  const { formatter } = useDateFormatter();

  return (
    <>
      <div className="flex flex-row m-auto justify-center mt-5 w-1/2 gap-x-4">
        {postList.map((p) => (
          <Card
            className="w-1/2" // Adjust the width as needed
            hoverable
            onClick={() => setSelectedPostId(p.id)}
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-gray-500">{p.category}</p>
            </div>
            <p className="mt-2 text-gray-800">{p.description}</p>
            <div className="mt-4 text-gray-500">
              <p>{`Created at: ${formatter(p.created_at)}`}</p>
            </div>
            <Space className="mt-4">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  setPost({
                    id: p.id,
                    category: p.category,
                    created_at: p.created_at,
                    description: p.description,
                    title: p.title,
                    user_id: p.user_id,
                  });
                  setModalView(true);
                }}
              >
                Edit
              </Button>
              <Button
                type="default"
                icon={<DeleteOutlined />}
                onClick={() => setDeleteButton(true)}
              >
                Delete
              </Button>
            </Space>
          </Card>
        ))}
      </div>
      <div className="flex flex-row justify-around">
        <p>You can share the post</p>
        <Button
          onClick={(): void => setModalView(true)}
          className="text-purple-300"
        >
          {" "}
          Share post
        </Button>
      </div>
    </>
  );
};
export default PostCard;