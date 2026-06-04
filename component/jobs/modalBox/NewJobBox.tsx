"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios"; // Your axios instance

export default function NewJob() {
  const [checklist, setChecklist] = useState([
    {
      id: 1,
      type: "section",
      title: "Section",
    },
    {
      id: 2,
      type: "item",
      title: "Checklist item #2",
    },
  ]);

  // Form States
  const [formData, setFormData] = useState({
    jobTemplate: "",
    title: "",
    client: "",
    assignedTechnician: "",
    priority: "Medium",
    scheduleStart: "",
    scheduleEnd: "",
    description: "",
    address: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const [clients, setClients] = useState<any[]>([]);
const [clientLoading, setClientLoading] = useState(false);

  const [technician, setTechnician] = useState<any[]>([]);
const [technicianLoading, setTechnicianLoading] = useState(false);

useEffect(() => {
  getClients();
  getTechnicians();
}, []);

const getClients = async () => {
  try {
    setClientLoading(true);

    const { data } = await axios.get(
      "/v1/getServiceLocation"
    );

    setClients(data?.data || []);
  } catch (error) {
    console.error(error);
  } finally {
    setClientLoading(false);
  }
};

const getTechnicians = async () => {
  try {
    setTechnicianLoading(true);

    const { data } = await axios.post(
      "/v1/getUsersByRole",{role:"Technician"}
    );

    setTechnician(data?.data || []);
  } catch (error) {
    console.error(error);
  } finally {
    setTechnicianLoading(false);
  }
};

  // =========================
  // Add Section
  // =========================
  const addSection = () => {
    setChecklist([
      ...checklist,
      {
        id: Date.now(),
        type: "section",
        title: "Section",
      },
    ]);
  };

  // =========================
  // Add Item
  // =========================
  const addItem = () => {
    setChecklist([
      ...checklist,
      {
        id: Date.now(),
        type: "item",
        title: `Checklist item #${checklist.length + 1}`,
      },
    ]);
  };

  // =========================
  // Update Item
  // =========================
  const updateChecklist = (id: any, value: any) => {
    setChecklist(
      checklist.map((item: any) =>
        item.id === id ? { ...item, title: value } : item
      )
    );
  };

  // =========================
  // Delete Item
  // =========================
  const deleteChecklist = (id: any) => {
    setChecklist(checklist.filter((item: any) => item.id !== id));
  };

  // =========================
  // Handle Input Change
  // =========================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // =========================
  // Submit Form
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        ...formData,
        checklist: checklist, // Sending checklist as array
      };

      const { data } = await axios.post("/v1/jobAdd", payload); // Adjust endpoint if needed

      setMessage({ type: "success", text: "Job created successfully!" });
      
      // Optional: Reset form after success
      // setFormData({ ...initialState });
      // setChecklist([...initialChecklist]);

    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to create job",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form role="form" onSubmit={handleSubmit}>
        <div className="box-body">
          {/* ================= FORM ================= */}
          <div className="form-group">
            <label>Job Template</label>
            <input
              type="text"
              name="jobTemplate"
              value={formData.jobTemplate}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter template"
            />
          </div>

          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., HVAC Maintenance, Plumbing Repair"
              required
            />
          </div>

          {/* ================= ROW ================= */}
          <div className="row">
            <div className="col-xs-6 form-group">
              <label>Client</label>
             <select
  name="client"
  value={formData.client}
  onChange={handleChange}
  className="form-control"
>
  <option value="">
    {clientLoading
      ? "Loading..."
      : "Select Client"}
  </option>

  {clients.map((client: any) => (
    <option
      key={client._id}
      value={client._id}
    >
      {client.location_name}
    </option>
  ))}
</select>
            </div>
            <div className="col-xs-6 form-group">
              <label>Assigned Technician</label>
               <select
  name="assignedTechnician"
  value={formData.assignedTechnician}
  onChange={handleChange}
  className="form-control"
>
  <option value="">
    {technicianLoading
      ? "Loading..."
      : "Select Technician"}
  </option>

  {technician.map((technician: any) => (
    <option
      key={technician._id}
      value={technician._id}
    >
      {technician.name}
    </option>
  ))}
</select>

            </div>
          </div>

          {/* ================= PRIORITY & SCHEDULE ================= */}
          <div className="row">
            <div className="col-xs-4 form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="col-xs-4 form-group">
              <label>Schedule Start</label>
              <input
                type="datetime-local"
                name="scheduleStart"
                value={formData.scheduleStart}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-xs-4 form-group">
              <label>Schedule End</label>
              <input
                type="datetime-local"
                name="scheduleEnd"
                value={formData.scheduleEnd}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows={4}
              placeholder="Describe the work to be performed..."
            />
          </div>

          {/* ================= CHECKLIST ================= */}
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <label style={{ marginBottom: 0 }}>Checklist</label>
              <div>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={addSection}
                >
                  + Add section
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={addItem}
                >
                  + Add item
                </button>
              </div>
            </div>

            {/* ================= LIST ================= */}
            {checklist.map((item: any) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <span style={{ cursor: "grab", fontSize: "18px" }}>⋮⋮</span>
                <input type="checkbox" />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateChecklist(item.id, e.target.value)}
                  className="form-control"
                  style={{
                    fontWeight: item.type === "section" ? "600" : "400",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteChecklist(item.id)}
                >
                  <i className="fa fa-trash" />
                </button>
              </div>
            ))}

            <p style={{ color: "#777", marginTop: "10px" }}>
              Drag the handle to reorder. Add sections to group items. Collapse
              a section to focus while editing. Use the checkboxes to bulk-delete
              items.
            </p>

            {/* ================= PREVIEW ================= */}
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "15px",
                marginTop: "20px",
                background: "#fafafa",
              }}
            >
              <h4>Preview</h4>
              {checklist.map((item: any) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
                  {item.type === "section" ? (
                    <h5
                      style={{
                        fontWeight: "700",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.title}
                    </h5>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input type="checkbox" />
                      <span>{item.title}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ================= ADDRESS ================= */}
          <div className="form-group">
            <label>Job Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Address"
            />
          </div>

          {/* ================= CITY STATE ================= */}
          <div className="row">
            <div className="col-xs-6 form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="col-xs-6 form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control"
                placeholder="State"
              />
            </div>
          </div>

          {/* ================= SUBMIT BUTTON ================= */}
          <div className="form-group" style={{ marginTop: "25px" }}>
            {message && (
              <div
                className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Creating Job..." : "Create Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}