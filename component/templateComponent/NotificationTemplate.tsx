// components/NotificationTemplates.jsx
"use client";
import React, { useState } from "react";

export default function NotificationTemplates() {
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [visibleTo, setVisibleTo] = useState({
    technicians: false,
    customerService: false,
    dispatch: false,
    techSupport: false,
  });

  const [templates, setTemplates] = useState<any[]>([]);

  const handleVisibleChange = (field:any) => {
    setVisibleTo((prev:any) => ({ ...prev, [field]: !prev[field] }));
  };

  const createTemplate = () => {
    if (!name.trim() || !content.trim()) {
      alert("Name and Content are required");
      return;
    }

    const visibleList = (
  Object.keys(visibleTo) as Array<keyof typeof visibleTo>
).filter((k) => visibleTo[k]);

    const newTemplate = {
      id: Date.now(),
      key: key.trim() || "(no key)",
      name: name.trim(),
      content: content.trim(),
      visibleTo: visibleList.length > 0 ? visibleList : ["All"],
    };

    setTemplates([...templates, newTemplate]);
    // reset form
    setKey("");
    setName("");
    setContent("");
    setVisibleTo({
      technicians: false,
      customerService: false,
      dispatch: false,
      techSupport: false,
    });
  };

  return (
    <div className="">
      <div className="box-header with-border">
        <h3 className="box-title">Notification Templates</h3>
        <div className="box-tools pull-right">
          <button className="btn btn-info btn-xs">New</button>
        </div>
      </div>

      <div className="box-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Key (optional, e.g. on_the_way)</label>
              <input
                className="form-control"
                value={key}
                onChange={(e:any) => setKey(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e:any) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                className="form-control"
                rows={5}
                value={content}
                onChange={(e:any) => setContent(e.target.value)}
                placeholder="Use {customer_name}, {address}, {date} or {eta_time}"
              />
            </div>

            <div className="form-group">
              <label>Visible To</label>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={visibleTo.technicians}
                    onChange={(e:any) => handleVisibleChange("technicians")}
                  />{" "}
                  Technicians
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={visibleTo.customerService}
                    onChange={(e:any) => handleVisibleChange("customerService")}
                  />{" "}
                  Customer Service
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={visibleTo.dispatch}
                    onChange={(e:any) => handleVisibleChange("dispatch")}
                  />{" "}
                  Dispatch
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={visibleTo.techSupport}
                    onChange={(e:any) => handleVisibleChange("techSupport")}
                  />{" "}
                  Tech Support
                </label>
              </div>
            </div>

            <button className="btn btn-success" onClick={createTemplate}>
              Create
            </button>
          </div>

          {/* Existing Templates Table */}
          <div className="col-md-6">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Key</th>
                  <th>Visible To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((t:any) => (
                  <tr key={t.id}>
                    <td>{t.name}</td>
                    <td>{t.key}</td>
                    <td>{t.visibleTo.join(", ")}</td>
                    <td>
                      <button className="btn btn-xs btn-info">Edit</button>
                    </td>
                  </tr>
                ))}
                {templates.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted">
                      No notification templates yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}