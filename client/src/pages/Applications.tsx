import { useEffect, useState } from "react";
import API from "../services/api";

interface Company {
  companyName: string;
  role: string;
  package: number;
  location: string;
}

interface Application {
  _id: string;
  status: string;
  company: Company;
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchApplications = async () => {
    try {
      const res = await API.get("/application/my", {
        headers: getAuthHeader(),
      });

      setApplications(res.data);
    } catch (error) {
      console.error("Fetch applications error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>My Applications</h1>

      {applications.map((app) => (
        <div
          key={app._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            margin: "20px auto",
            width: "80%",
            textAlign: "center",
          }}
        >
          <h2>{app.company.companyName}</h2>

          <p>
            <strong>Role:</strong> {app.company.role}
          </p>

          <p>
            <strong>Package:</strong> {app.company.package} LPA
          </p>

          <p>
            <strong>Location:</strong> {app.company.location}
          </p>

          <p>
            <strong>Status:</strong> {app.status}
          </p>
        </div>
      ))}
    </div>
  );
}