// components/JobTypes.jsx
"use client";
import React, { useState } from "react";

export default function JobTypes() {
  const [newJobName, setNewJobName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [jobTypes, setJobTypes] = useState([
    { id: 1, name: "test rahul", active: false },
  ]);

  const addJobType = () => {
    if (!newJobName.trim()) return;
    const newType = {
      id: Date.now(),
      name: newJobName.trim(),
      active: isActive,
    };
    setJobTypes([...jobTypes, newType]);
    setNewJobName("");
    setIsActive(false);
  };

  const toggleActive = (id:any) => {
    setJobTypes(
      jobTypes.map((jt:any) =>
        jt.id === id ? { ...jt, active: !jt.active } : jt
      )
    );
  };

  const deleteJobType = (id:any) => {
    setJobTypes(jobTypes.filter((jt:any) => jt.id !== id));
  };

  return (
    <div>
      <div className="box-header with-border">
        <h3 className="box-title">Job Types</h3>
        <div className="box-tools pull-right">
          <button className="btn btn-info btn-xs">New</button>
        </div>
      </div>

      <div className="box-body">
        {/* Add new */}
        <div className="row" style={{ marginBottom: 15 }}>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newJobName}
              onChange={(e:any) => setNewJobName(e.target.value)}
            />
             <div style={{ marginTop: 10 }}>
             <div >
            <label className="checkbox-inline">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e:any) => setIsActive(e.target.checked)}
              />{" "}
              Active
            </label>
            </div>
            <div style={{ marginTop: 10 }}>

              <button className="btn btn-success btn-xs" onClick={addJobType}>
              Save
            </button>{" "}
            <button className="btn btn-default btn-xs" onClick={() => setNewJobName("")}>
              Clear
            </button>
          </div>
          </div>
          </div>
          
        </div>

        {/* List */}
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobTypes.map((jt:any) => (
              <tr key={jt.id}>
                <td>{jt.name}</td>
                <td>{jt.active ? "Yes" : "No"}</td>
                <td>
                  <button className="btn btn-xs btn-warning">Edit</button>{" "}
                  <button
                    className={`btn btn-xs ${jt.active ? "btn-danger" : "btn-success"}`}
                    onClick={(e:any) => toggleActive(jt.id)}
                  >
                    {jt.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className="btn btn-xs btn-danger"
                    style={{ marginLeft: 5 }}
                    onClick={(e:any) => deleteJobType(jt.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {jobTypes.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-muted">
                  No job types added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}