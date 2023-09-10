import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Input, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Post } from "types/Post";
import useDateFormatter from "./hooks/useDateFormatter";

type Props = {
  postList: Post[];
};

const PostCard: React.FC<Props> = ({ postList }: Props) => {
  const { formatter } = useDateFormatter();

  return (
    <>
      <div className="flex flex-row m-auto justify-center mt-5 w-1/2 gap-x-4">
        {postList.map((p) => (
          <Card
            className="w-1/2" // Adjust the width as needed
            hoverable
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
                // onClick={() => handleEdit()}
              >
                Edit
              </Button>
              <Button
                type="default"
                icon={<DeleteOutlined />}
                // onClick={() => handleDelete()}
              >
                Delete
              </Button>
            </Space>
          </Card>
        ))}
      </div>
      {/* <div className="flex flex-row justify-around">
      <p>You can share the post</p>
      <Button
        onClick={(): void => setPostModalOpen(true)}
        className="text-purple-300"
      >
        {" "}
        Share post
      </Button>
    </div> */}
    </>
  );
};
export default PostCard;
