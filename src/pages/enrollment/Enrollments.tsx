import { useCrudApi } from "../../api/useLazyApi";
import Notification from "../../components/Notification";
import { useSelector } from "react-redux";
import { Store } from "../../types/Store";
import { Link, useParams } from "react-router-dom";
import { ENROLLMENTS_POST_API } from "../../api/url/urls";
import { useEffect, useState } from "react";
import { Enrollment } from "../../types/Enrollment";
import { Pages } from "../../settings/Pages";
import { useNavigate } from "../../utils/useNavigation";

const Enrollments: React.FC = ({}) => {
  const user = useSelector((state: Store) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const { fetchAll: loadEnrollments } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ENROLLMENTS_POST_API}?post_id=${id}`
  );
  const loadEnrollment = async () => {
    const res = await loadEnrollments();
    setEnrollments(res);
  };
  useEffect(() => {
    loadEnrollment();
  }, []);
  console.log(enrollments);

  return (
    <div className="w-full h-auto ">
      {enrollments.map((e) => (
        <Link
          className="gap-4"
          onClick={(): void => navigate(Pages.VIEW_PROFILE, { id: e.user_id })}
          to={""}
        >
          {e.user__username}
        </Link>
      ))}
    </div>
  );
};
export default Enrollments;
