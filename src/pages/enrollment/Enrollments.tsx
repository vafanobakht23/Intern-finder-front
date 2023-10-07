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
import { Button, Table } from "antd";
import Navbar from "../../components/Navbar";
import { renderStatusFunc } from "./utills/renderStatus";

const Enrollments: React.FC = ({}) => {
  const user = useSelector((state: Store) => state.user);
  const noPagination = false;
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
    setEnrollments((prevEnrollments) => {
      const updatedRecords = prevEnrollments.map((record) =>
        record.id === resp.id ? { ...record, status: resp.status } : record
      );
      return updatedRecords;
    });
  };

  return (
    <div className="w-full h-auto flex flex-col">
      <Navbar selectedKey="1" />
      <Table
        pagination={noPagination}
        className="w-1/2 m-auto mt-10"
        dataSource={enrollments}
        columns={[
          {
            title: "Username",
            key: "username",
            render: function renderUsername(
              value: Enrollment
            ): React.ReactNode {
              return (
                <Link
                  className="gap-4 text-blue-600"
                  onClick={(): void =>
                    navigate(Pages.VIEW_PROFILE, { id: value.user_id })
                  }
                  to={""}
                >
                  {value.user__username}
                </Link>
              );
            },
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: function renderStatus(value): React.ReactNode {
              return renderStatusFunc(value);
            },
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <div>
                {record.status === "AP" && (
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={(): Promise<any> =>
                        handleStatusIntern(record.id, record.user_id, true)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={(): Promise<any> =>
                        handleStatusIntern(record.id, record.user_id, false)
                      }
                    >
                      Reject
                    </Button>
                  </div>
                )}
                {record.status === "WF" && (
                  <Button
                    onClick={() => {
                      navigate(Pages.TAKE_EXAM, {
                        id: id!,
                        enrollmentId: record.id,
                      });
                    }}
                  >
                    Show result
                  </Button>
                )}
                {record.status !== "WF" && record.status !== "AP" && (
                  <span>—</span>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};
export default Enrollments;
