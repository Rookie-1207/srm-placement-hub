import { useState } from "react";
import API from "../services/api";

export default function Admin() {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [minimumCGPA, setMinimumCGPA] = useState("");
  const [branches, setBranches] = useState("");

  const addCompany = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/admin/company", {
        companyName,
        role,
        package: Number(packageValue),
        location,
        deadline,
        minimumCGPA: Number(minimumCGPA),
        eligibleBranches: branches.split(","),
      });

      alert("Company Added!");

      setCompanyName("");
      setRole("");
      setPackageValue("");
      setLocation("");
      setDeadline("");
      setMinimumCGPA("");
      setBranches("");
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Company</h1>

      <form
        onSubmit={addCompany}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          placeholder="Package"
          value={packageValue}
          onChange={(e) => setPackageValue(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <input
          placeholder="Minimum CGPA"
          value={minimumCGPA}
          onChange={(e) => setMinimumCGPA(e.target.value)}
        />

        <input
          placeholder="Branches (CSE,IT,ECE)"
          value={branches}
          onChange={(e) => setBranches(e.target.value)}
        />

        <button type="submit">Add Company</button>
      </form>
    </div>
  );
}