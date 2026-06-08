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
  company: Company | null;
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
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
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        My Applications
      </h1>

      {applications.map((app) => (
        <div
          key={app._id}
          className="bg-white border border-slate-200 rounded-xl p-6 mb-4 shadow-md max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold">
            {app.company?.companyName || "Company Deleted"}
          </h2>

          <p>Role: {app.company?.role || "N/A"}</p>
          <p>Package: {app.company?.package ?? "N/A"} LPA</p>
          <p>Location: {app.company?.location || "N/A"}</p>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}