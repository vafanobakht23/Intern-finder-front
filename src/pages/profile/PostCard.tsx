import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { Pages } from "../../settings/Pages";
import { Post } from "types/Post";
import useDateFormatter from "./hooks/useDateFormatter";
import { useNavigate } from "../../utils/useNavigation";
import { useCrudApi } from "../../api/useLazyApi";
import { EXAM_LIST_API } from "../../api/url/urls";
import { useEffect, useState } from "react";
import { Exam } from "types/Exam";
import { useSelector } from "react-redux";
import { Store } from "../../types/Store";
import { COMPANY } from "../../constant/Constant";
import Notification from "../../components/Notification";
import { Enrollment } from "types/Enrollment";
import {
  renderStatusColor,
  renderStatusFunc,
} from "../../pages/enrollment/utills/renderStatus";

type Props = {
  postList?: Post[];
  setSelectedPostId: (selectedPostId: number) => void;
  setModalView: (modalView: boolean) => void;
  setDeleteButton: (isDeleteButton: boolean) => void;
  setPost: (post: Post) => void;
  post: Post;
  applyHandler?: any;
  enrollments?: Enrollment[];
};

const PostCard: React.FC<Props> = ({
  postList,
  setSelectedPostId,
  setModalView,
  setDeleteButton,
  setPost,
  post,
  applyHandler,
  enrollments,
}: Props) => {
  const { formatter } = useDateFormatter();
  const user = useSelector((state: Store) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [examsList, setExamList] = useState<Exam[]>([]);
  const { fetchAll: loadExams } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${EXAM_LIST_API}`
  );
  const getData = async () => {
    const resp = await loadExams();
    setExamList(resp);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col w-2/3 gap-y-6 m-auto justify-center mt-5 gap-x-4 mb-6">
        {postList &&
          postList.map((p) => (
            <Card className="" hoverable>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p className="text-gray-500">{p.category}</p>
              </div>
              <p className="mt-2 text-gray-800">{p.description}</p>
              <div className="mt-4 text-gray-500">
                <p>{`Created at: ${formatter(p.created_at)}`}</p>
              </div>
              <Space className="mt-4">
                {user.role === COMPANY ? (
                  <div className="m-auto justify-center flex gap-x-3 mt-2">
                    {
                      <>
                        <Button
                          className="flex"
                          icon={<EditOutlined className="flex mt-1" />}
                          onClick={() => {
                            setSelectedPostId(p.id);
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
                          className="flex"
                          loading={loading}
                          type="default"
                          icon={<DeleteOutlined className="flex mt-1" />}
                          onClick={() => {
                            setLoading(true);
                            setDeleteButton(true);
                            setSelectedPostId(p.id);
                            setTimeout(() => {
                              // After some process completes, reset loading state to false
                              setLoading(false);
                            }, 2000); //
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    }
                    <Button
                      type="default"
                      onClick={() => {
                        setSelectedPostId(p.id);
                        navigate(Pages.POST_ENROLLMENT, { id: p.id });
                      }}
                    >
                      Enrollments
                    </Button>{" "}
                    {examsList.filter((exam) => exam.post === p.id).length ===
                    0 ? (
                      <Button
                        type="default"
                        onClick={() => navigate(Pages.MAKE_EXAM, { id: p.id })}
                      >
                        Create exam
                      </Button>
                    ) : (
                      <Button
                        type="default"
                        onClick={() => navigate(Pages.MAKE_EXAM, { id: p.id })}
                      >
                        Show exam
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button
                    className="bg-green-400 w-full"
                    loading={loading}
                    onClick={(): void => {
                      setLoading(true);
                      applyHandler(p.id);
                      Notification.openSuccessNotification(
                        "You applied for this post successfully"
                      );
                      setTimeout(() => {
                        // After some process completes, reset loading state to false
                        setLoading(false);
                      }, 2000); //
                    }}
                  >
                    Apply
                  </Button>
                )}
              </Space>
            </Card>
          ))}
        <div className="flex flex-col w-full gap-y-6 m-auto justify-center mt-5 gap-x-4 mb-6">
          {enrollments &&
            enrollments.map((p) => (
              <Card
                className="w-auto" // Adjust the width as needed
                hoverable
              >
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{p.post__title}</h2>
                  <p className="text-gray-500">{p.post__category}</p>
                </div>
                <p className="mt-2 text-gray-800">{p.post__description}</p>
                <div className="mt-4 text-gray-500">
                  <p>{`Created at: ${formatter(p.post__created_at)}`}</p>
                </div>
                <div className="">
                  <p
                    className={`mt-4 text-sm py-2 text-center rounded-md ${renderStatusColor(
                      p.status
                    )}`}
                  >
                    {renderStatusFunc(p.status)}
                  </p>
                </div>
                <Space className="mt-4">
                  {user.role === COMPANY ? (
                    <>
                      {" "}
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setSelectedPostId(p.id);
                          setPost({
                            id: p.id,
                            category: p.post__category,
                            created_at: p.post__created_at,
                            description: p.post__description,
                            title: p.post__title,
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
                        onClick={() => {
                          setDeleteButton(true);
                          setSelectedPostId(p.id);
                        }}
                      >
                        Delete
                      </Button>{" "}
                      {examsList.filter((exam) => exam.post === p.id).length ===
                      0 ? (
                        <Button
                          type="default"
                          onClick={() =>
                            navigate(Pages.MAKE_EXAM, { id: p.id })
                          }
                        >
                          Create exam
                        </Button>
                      ) : (
                        <Button
                          type="default"
                          onClick={() =>
                            navigate(Pages.MAKE_EXAM, { id: p.id })
                          }
                        >
                          Show exam
                        </Button>
                      )}
                    </>
                  ) : (
                    <div>
                      {p.status === "AC" && (
                        <Button
                          type="default"
                          className="bg-green-400"
                          onClick={(): void => {
                            navigate(Pages.TAKE_EXAM, {
                              id: p.post__id,
                              enrollmentId: p.id,
                              status: "AC",
                            });
                          }}
                        >
                          Enroll exam
                        </Button>
                      )}
                      {p.status === "WF" && (
                        <p className="">Waiting for result</p>
                      )}
                    </div>
                  )}
                </Space>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};
export default PostCard;
