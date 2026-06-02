"use client";

import React, { useState } from "react";

function Tabs({ active, setActive }:any) {
  const tabs = [
    { key: "account", label: "Account Fields" },
    { key: "service_location", label: "Service Location Fields" },
    { key: "equipment", label: "Equipment Fields" },
    { key: "asset", label: "Asset Fields" },
  ];

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      {tabs.map((tab:any) => (
        <button
          key={tab.key}
          onClick={() => setActive(tab.key)}
          style={{
            padding: "8px 16px",
            border: active === tab.key ? "2px solid blue" : "1px solid #ccc",
            background: active === tab.key ? "#eef" : "#fff",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Reusable Component
function CustomFieldManager({ module }:any) {
const [fields, setFields] = useState<any[]>([]);

const [form, setForm] = useState<{
  key: string;
  label: string;
  type: string;
  required: boolean;
}>({
  key: "",
  label: "",
  type: "text",
  required: false,
});

  const addField = () => {
    if (!form.key || !form.label) return;

    setFields([...fields, form]);

    // 🔥 API call yaha karega
    // POST /custom-fields

    setForm({
      key: "",
      label: "",
      type: "text",
      required: false,
    });
  };

  return (
    <div className="box">
      <div className="box-header">
        <h3>{module.replace("_", " ")} Fields</h3>
      </div>

      <div className="box-body">

        <div className="row">
        <div className="col-md-4">

                <div className="form-group">
                  <label>Field Name Key *</label>
          <input
          className="form-control "
            placeholder="Field Key"
            value={form.key}
            onChange={(e:any) => setForm({ ...form, key: e.target.value })}
          />
          </div>
          </div>
          <div className="col-md-4">

                <div className="form-group">
                  <label>Field Label</label>
          <input
          className="form-control"
            placeholder="Label"
            value={form.label}
            onChange={(e:any) => setForm({ ...form, label: e.target.value })}
          />
          </div>
          </div>
          <div className="col-md-4">

                <div className="form-group">
                  <label>Type</label>
          <select
          className="form-control"
            value={form.type}
            onChange={(e:any) => setForm({ ...form, type: e.target.value })}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
          </div>
          </div>

          <div className="col-md-4">
           <div className="form-group">
                  
        <label>
  <input
    type="checkbox"
    className="minimal"
    checked={form.required}
    onChange={(e:any) =>
      setForm({ ...form, required: e.target.checked })
    }
  />
  Required
</label>
          </div>
          <button className="btn btn-primary" onClick={addField}>Add Field</button>
          </div>


               


        </div>


        <div style={{ marginTop: 20 }}>
          {fields.length === 0 ? (
            <p>No fields yet</p>
          ) : (
            fields.map((f:any, i:any) => (
              <div key={i}>
                {f.label} ({f.type}) {f.required && "*"}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("service_location");

  return (
    <section className="content">
      <Tabs active={activeTab} setActive={setActiveTab} />

      {activeTab === "account" && (
        <CustomFieldManager module="account" />
      )}
      {activeTab === "service_location" && (
        <CustomFieldManager module="service_location" />
      )}
      {activeTab === "equipment" && (
        <CustomFieldManager module="equipment" />
      )}
      {activeTab === "asset" && (
        <CustomFieldManager module="asset" />
      )}
    </section>
  );
}