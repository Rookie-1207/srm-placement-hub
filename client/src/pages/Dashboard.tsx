import { useEffect, useState } from "react";
import API from "../services/api";

interface Company {
  _id: string;
  companyName: string;
  role: string;
  deadline: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalApplications: 0,
    applied: 0,
    selected: 0,
    rejected: 0,
  });

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetchStats();
    fetchCompanies();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchStats = async () => {
    const res = await API.get("/dashboard", {
      headers: getAuthHeader(),
    });
    setStats(res.data);
  };

  const fetchCompanies = async () => {
    const res = await API.get("/company", {
      headers: getAuthHeader(),
    });

    const upcoming = res.data
      .sort(
        (a: Company, b: Company) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      )
      .slice(0, 5);

    setCompanies(upcoming);
  };

  const cards = [
    { title: "Total Companies", value: stats.totalCompanies },
    { title: "My Applications", value: stats.totalApplications },
    { title: "Applied", value: stats.applied },
    { title: "Selected", value: stats.selected },
    { title: "Rejected", value: stats.rejected },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-center text-slate-900">
        SRM Placement Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-200"
          >
            <h2 className="text-3xl font-bold text-blue-600">{card.value}</h2>
            <p className="text-slate-600 mt-2">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow-md p-6 border border-slate-200">
        <h2 className="text-2xl font-bold mb-5 text-slate-900">
          Upcoming Deadlines
        </h2>

        <div className="space-y-4">
          {companies.map((company) => (
            <div
              key={company._id}
              className="flex justify-between items-center border border-slate-200 rounded-xl p-4"
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  {company.companyName}
                </h3>
                <p className="text-slate-500">{company.role}</p>
              </div>

              <p className="text-red-500 font-medium">
                {new Date(company.deadline).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}