import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalApplications: 0,
    applied: 0,
    selected: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h2>{stats.totalCompanies}</h2>
          <p>Total Companies</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.totalApplications}</h2>
          <p>Applications</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.applied}</h2>
          <p>Applied</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.selected}</h2>
          <p>Selected</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.rejected}</h2>
          <p>Rejected</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center" as const,
};