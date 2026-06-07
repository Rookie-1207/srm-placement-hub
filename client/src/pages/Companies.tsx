import { useEffect, useState } from "react";
import API from "../services/api";

interface Company {
  _id: string;
  companyName: string;
  role: string;
  package: number;
  location: string;
  minimumCGPA: number;
  deadline: string;
  eligibleBranches: string[];
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/company", {
        headers: getAuthHeader(),
      });

      setCompanies(res.data);
    } catch (error) {
      console.error("Fetch companies error:", error);
    }
  };

  const applyToCompany = async (companyId: string) => {
    try {
      await API.post(
        "/application",
        {
          company: companyId,
          status: "Applied",
        },
        {
          headers: getAuthHeader(),
        }
      );

      alert("Applied Successfully!");
    } catch (error) {
      console.error("Apply error:", error);
      alert("Application Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Companies</h1>

      {companies.map((company) => (
        <div
          key={company._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            margin: "20px auto",
            width: "80%",
            textAlign: "center",
          }}
        >
          <h2>{company.companyName}</h2>

          <p>
            <strong>Role:</strong> {company.role}
          </p>

          <p>
            <strong>Package:</strong> {company.package} LPA
          </p>

          <p>
            <strong>Location:</strong> {company.location}
          </p>

          <p>
            <strong>Minimum CGPA:</strong> {company.minimumCGPA}
          </p>

          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(company.deadline).toLocaleDateString()}
          </p>

          <p>
            <strong>Branches:</strong>{" "}
            {company.eligibleBranches.join(", ")}
          </p>

          <button
            onClick={() => applyToCompany(company._id)}
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}