import NoData from "../../components/Nodata";
import PostCard from "../../pages/profile/PostCard";
import { Enrollment } from "../../types/Enrollment";
import { Post } from "../../types/Post";

type Props = {
  setSelectedPostId: (selectedPostId: number) => void;
  setModalView: (modalView: boolean) => void;
  setDeleteButton: (isDeleteButton: boolean) => void;
  setPost: (post: Post) => void;
  post: Post;
  applyHandler?: any;
  enrollments?: Enrollment[];
};

const List: React.FC<Props> = ({
  enrollments,
  setPost,
  post,
  applyHandler,
  setModalView,
  setDeleteButton,
  setSelectedPostId,
}: Props) => {
  return (
    <div>
      {enrollments && enrollments.length > 0 ? (
        <div className="flex flex-col my-3 h-auto shadow-lg w-1/2 m-auto">
          <p className="mx-4">Enrollments: </p>
          <PostCard
            enrollments={enrollments}
            setSelectedPostId={setSelectedPostId}
            setModalView={setModalView}
            setDeleteButton={setDeleteButton}
            setPost={setPost}
            post={post}
            applyHandler={applyHandler}
          />
        </div>
      ) : (
        <div className="flex flex-col my-3 h-auto shadow-lg w-1/2 m-auto">
          <p className="mx-4 mt-2">Enrollments: </p>

          <NoData />
        </div>
      )}
    </div>
  );
};

export default List;
