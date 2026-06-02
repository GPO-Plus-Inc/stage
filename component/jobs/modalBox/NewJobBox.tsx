"use client";

import React, { useState } from "react";

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
  const updateChecklist = (id:any, value:any) => {
    setChecklist(
      checklist.map((item:any) =>
        item.id === id
          ? { ...item, title: value }
          : item
      )
    );
  };

  // =========================
  // Delete Item
  // =========================
  const deleteChecklist = (id:any) => {
    setChecklist(
      checklist.filter((item:any) => item.id !== id)
    );
  };

  return (
    <div>
      <form role="form">
        <div className="box-body">
          {/* ================= FORM ================= */}

          <div className="form-group">
            <label>Job Template</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter template"
            />
          </div>

          <div className="form-group">
            <label>Job Title *</label>

            <input
              type="text"
              className="form-control"
              placeholder="e.g., HVAC Maintenance, Plumbing Repair"
            />
          </div>

          {/* ================= ROW ================= */}

          <div className="row">
            <div className="col-xs-6 form-group">
              <label>Customer</label>

              <input
                type="text"
                className="form-control"
                placeholder="Customer"
              />
            </div>

            <div className="col-xs-6 form-group">
              <label>Assigned Technician</label>

              <input
                type="text"
                className="form-control"
                placeholder="Technician"
              />
            </div>
          </div>

          {/* ================= PRIORITY ================= */}

          <div className="row">
            <div className="col-xs-4 form-group">
              <label>Priority</label>

              <select className="form-control">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="col-xs-4 form-group">
              <label>Schedule Start</label>

              <input
                type="datetime-local"
                className="form-control"
              />
            </div>

            <div className="col-xs-4 form-group">
              <label>Schedule End</label>

              <input
                type="datetime-local"
                className="form-control"
              />
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}

          <div className="form-group">
            <label>Description</label>

            <textarea
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
              <label
                style={{
                  marginBottom: 0,
                }}
              >
                Checklist
              </label>

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

            {checklist.map((item:any) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                {/* Drag */}

                <span
                  style={{
                    cursor: "grab",
                    fontSize: "18px",
                  }}
                >
                  ⋮⋮
                </span>

                {/* Checkbox */}

                <input type="checkbox" />

                {/* Input */}

                <input
                  type="text"
                  value={item.title}
                  onChange={(e:any) =>
                    updateChecklist(
                      item.id,
                      e.target.value
                    )
                  }
                  className="form-control"
                  style={{
                    fontWeight:
                      item.type === "section"
                        ? "600"
                        : "400",
                  }}
                />

                {/* Delete */}

                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteChecklist(item.id)
                  }
                >
                  <i className="fa fa-trash" />
                </button>
              </div>
            ))}

            {/* ================= HELP TEXT ================= */}

            <p
              style={{
                color: "#777",
                marginTop: "10px",
              }}
            >
              Drag the handle to reorder. Add sections
              to group items. Collapse a section to
              focus while editing. Use the checkboxes
              to bulk-delete items.
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

              {checklist.map((item:any) => (
                <div
                  key={item.id}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {item.type === "section" ? (
                    <h5
                      style={{
                        fontWeight: "700",
                        textTransform:
                          "uppercase",
                      }}
                    >
                      {item.title}
                    </h5>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
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
                className="form-control"
                placeholder="City"
              />
            </div>

            <div className="col-xs-6 form-group">
              <label>State</label>

              <input
                type="text"
                className="form-control"
                placeholder="State"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}