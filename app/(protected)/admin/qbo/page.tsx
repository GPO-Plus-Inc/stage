"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function Page() {

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Not Configured");

  const [form, setForm] = useState({
    client_id: "",
    client_secret: "",
    refresh_token: "",
    realm_id: "",
    default_employee_id: "",
    income_account_id: "",
  });

  const [technicians, setTechnicians] = useState([]);
  const [qboEmployees, setQboEmployees] = useState([]);
  const [mappings, setMappings] = useState<any[]>([]);

  // ================= INIT =================
  useEffect(() => {
    loadInit();
    loadTechnicians();
  }, []);

  // ================= LOAD INIT =================
  const loadInit = async () => {
    try {
      const res = await axios.get("/v1/init");

      if (res.data?.connection) {
        setForm(res.data.connection);
        setStatus("Configured");
      }

      setMappings(res.data?.mappings || []);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= 🔥 REAL TECHNICIANS =================
  const loadTechnicians = async () => {
    try {
      const res = await axios.get("/v1/technicians");

      console.log("TECHNICIANS:", res.data);

      setTechnicians(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Technicians load failed ❌");
    }
  };

  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= CONNECTION =================

  const saveConnection = async () => {
    setLoading(true);
    try {
      await axios.post("/v1/connection", form);
      alert("Saved ✅");
      setStatus("Configured");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
    setLoading(false);
  };

  const testConnection = async () => {
    setLoading(true);
    try {
      await axios.post("/v1/connection/test");
      alert("Connection Successful ✅");
    } catch {
      alert("Connection Failed ❌");
    }
    setLoading(false);
  };

  // ================= 🔥 DYNAMIC SYNC =================
  const syncData = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/v1/sync", {
        entries: technicians.map((t:any) => ({
          technician_id: t._id || t.id,
          hours: 4,
        })),
      });

      alert(`Sync Done 🚀\nProcessed: ${res.data.processed}`);
    } catch {
      alert("Sync failed ❌");
    }
    setLoading(false);
  };

  // ================= 🔥 FIX EMPLOYEE LOAD =================
  const fetchQBOEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/v1/employees");

      console.log("RAW QBO:", res.data);

      const employees = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setQboEmployees(employees);

      alert("Employees Loaded ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to load employees");
    }
    setLoading(false);
  };

  const saveMapping = async (tech:any, qbo:any) => {
    try {
      await axios.post("/v1/mapping", {
        technician_id: tech._id || tech.id,
        technician_name: tech.name,
        technician_email: tech.email,
        qbo_employee_id: qbo.Id,
        qbo_employee_name: qbo.DisplayName,
      });

      await loadInit();
    } catch {
      alert("Mapping error");
    }
  };

  // ================= 🔥 AUTO MAP =================
 const autoMap = async () => {
  if (!qboEmployees.length) {
    alert("पहले QBO Employees load करो");
    return;
  }

  setLoading(true);

  try {
    for (const t of technicians as any[]) {
      const match: any = (qboEmployees as any[]).find(
        (e: any) =>
          e.PrimaryEmailAddr?.Address?.toLowerCase() ===
            t?.email?.toLowerCase() ||
          e.DisplayName?.toLowerCase() ===
            t?.name?.toLowerCase()
      );

      if (match) {
        await axios.post("/v1/mapping", {
          technician_id: t._id || t.id,
          technician_name: t.name,
          technician_email: t.email,
          qbo_employee_id: match.Id,
          qbo_employee_name: match.DisplayName,
        });
      }
    }

    await loadInit();
    alert("Auto Mapping Done ✅");
  } catch (err: any) {
    console.error(err);
    alert("Auto mapping failed ❌");
  } finally {
    setLoading(false);
  }
};

  // ================= UI =================

  return (
    <section className="content">

      {loading && <div style={{ color: "blue" }}>⏳ Processing...</div>}

      {/* CONNECTION */}
      <div className="box box-primary">
        <div className="box-header with-border d-flex justify-content-between">
          <h3 className="box-title">QBO Connection</h3>
          <span className={`label ${status === "Configured" ? "label-success" : "label-danger"}`}>
            {status}
          </span>
        </div>

        <div className="box-body">
          <div className="row">

            <div className="col-md-6 form-group">
              <label>Client ID</label>
              <input className="form-control" name="client_id" value={form.client_id} onChange={handleChange} />
            </div>

            <div className="col-md-6 form-group">
              <label>Client Secret</label>
              <input className="form-control" name="client_secret" value={form.client_secret} onChange={handleChange} />
            </div>

            <div className="col-md-12 form-group">
              <label>Refresh Token</label>
              <input className="form-control" name="refresh_token" value={form.refresh_token} onChange={handleChange} />
            </div>

            <div className="col-md-6 form-group">
              <label>Realm ID</label>
              <input className="form-control" name="realm_id" value={form.realm_id} onChange={handleChange} />
            </div>

            <div className="col-md-6 form-group">
              <label>Default Employee</label>
              <input className="form-control" name="default_employee_id" value={form.default_employee_id} onChange={handleChange} />
            </div>

            <div className="col-md-12 form-group">
              <label>Income Account ID</label>
              <input className="form-control" name="income_account_id" value={form.income_account_id} onChange={handleChange} />
            </div>

          </div>

          <button className="btn btn-primary mr-2" onClick={saveConnection}>Save</button>
          <button className="btn btn-default mr-2" onClick={testConnection}>Test</button>
          <button className="btn btn-success" onClick={syncData}>Sync</button>
        </div>
      </div>

      {/* MAPPING */}
      <div className="box box-info">

        <div className="box-header with-border d-flex justify-content-between">
          <h3 className="box-title">Technician → QBO Mapping</h3>

          <div>
            <button className="btn btn-default mr-2" onClick={fetchQBOEmployees}>
              Load QBO Employees
            </button>

            <button className="btn btn-primary" onClick={autoMap}>
              Auto Map
            </button>
          </div>
        </div>

        <div className="box-body">

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>QBO Employee</th>
                  <th>Status</th>
                </tr>
              </thead>

            <tbody>
  {technicians.map((t: any) => {
    const mapped = mappings.find(
      (m) => m.technician_id === (t._id || t.id)
    );

    return (
      <tr key={t._id || t.id}>
        <td>{t.name}</td>
        <td>{t.email}</td>
        <td>{t.role}</td>

        <td>
          <select
            className="form-control"
            value={mapped?.qbo_employee_id ?? ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const emp = qboEmployees.find(
                (q: any) => q.Id === e.target.value
              );

              if (emp) {
                saveMapping(t, emp);
              }
            }}
          >
            <option value="">Select Employee</option>

            {qboEmployees.map((e: any) => (
              <option key={e.Id} value={e.Id}>
                {e.DisplayName}
              </option>
            ))}
          </select>
        </td>

        <td>
          {mapped ? (
            <span className="label label-success">
              Mapped ({mapped.qbo_employee_name})
            </span>
          ) : (
            <span className="label label-default">
              Not Mapped
            </span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

            </table>
          </div>

        </div>
      </div>

    </section>
  );
}