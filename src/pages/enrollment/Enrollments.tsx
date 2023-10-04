import { useCrudApi } from "../../api/useLazyApi";
import Notification from "../../components/Notification";
import { useSelector } from "react-redux";
import { Store } from "../../types/Store";
import { Link, useParams } from "react-router-dom";
import {
  ENROLLMENTS_POST_API,
  ENROLLMENTS_UPDATE_API,
} from "../../api/url/urls";
import { useEffect, useState } from "react";
import { Enrollment } from "../../types/Enrollment";
import { Pages } from "../../settings/Pages";
import { useNavigate } from "../../utils/useNavigation";
import { Button } from "antd";

const Enrollments: React.FC = ({}) => {
  const user = useSelector((state: Store) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const { fetchAll: loadEnrollments } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ENROLLMENTS_POST_API}?post_id=${id}`
  );
  const { update: updateEnrollment } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ENROLLMENTS_UPDATE_API}`
  );
  const loadEnrollment = async () => {
    const res = await loadEnrollments();
    setEnrollments(res);
  };
  useEffect(() => {
    loadEnrollment();
  }, []);
  console.log(enrollments);
  const handleStatusIntern = async (
    enrollmentId: number,
    userId: number,
    isAccepted: boolean
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("user_id", String(userId));
    formData.append("post_id", String(Number(id)));
    formData.append("status", isAccepted ? " AC" : "R");

    const resp = await updateEnrollment(enrollmentId, formData);
  };

  return (
    <div className="w-full h-auto flex flex-col">
      {enrollments.map((e) => (
        <div>
          <Link
            className="gap-4"
            onClick={(): void =>
              navigate(Pages.VIEW_PROFILE, { id: e.user_id })
            }
            to={""}
          >
            {e.user__username}
          </Link>
          <Button
            onClick={(): Promise<any> =>
              handleStatusIntern(e.id, e.user_id, true)
            }
          >
            Accept
          </Button>
          <Button
            onClick={(): Promise<any> =>
              handleStatusIntern(e.id, e.user_id, false)
            }
          >
            Reject
          </Button>
        </div>
      ))}
    </div>
  );
};
export default Enrollments;
