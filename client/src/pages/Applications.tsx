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

  const updateStatus = async (id: string, status: string) => {
    try {
      await API.patch(
        `/application/${id}`,
        { status },
        {
          headers: getAuthHeader(),
        }
      );

      fetchApplications();
    } catch (error) {
      console.error("Update status error:", error);
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

          <p
            className={`font-semibold mt-2 ${
              app.status === "Selected"
                ? "text-green-600"
                : app.status === "Rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            Status: {app.status}
          </p>

          {app.company && (
            <div className="flex gap-2 justify-center mt-4">
              <button
                onClick={() => updateStatus(app._id, "Selected")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Select
              </button>

              <button
                onClick={() => updateStatus(app._id, "Rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}