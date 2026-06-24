"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import EditJobModal from "./modalBox/EditJobModel"

export default function OneTimeJob({ onCountChange }:any) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [templateFilter, setTemplateFilter] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
const [selectedJob, setSelectedJob] = useState<any>(null);

  // ==========================
  // Get Jobs
  // ==========================
  const getJobs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/v1/jobList", {
        params: {
          search,
          location,
          status,
          locationFilter,
          templateFilter,
        },
      });

      setJobs(response.data.data || []);
      onCountChange(response?.data?.data?.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  // ==========================
  // Clear Filters
  // ==========================
  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setStatus("");
    setLocationFilter("");
    setTemplateFilter("");

    setTimeout(() => {
      getJobs();
    }, 100);
  };

  // ==========================
  // Update Status
  // ==========================
const updateJobStatus = async (
  jobId: any,
  newStatus: any
) => {
  try {
    await api.patch(
      `/v1/jobStatus/${jobId}`,
      {
        status: newStatus,
      }
    );

    getJobs();
  } catch (error) {
    console.log(error);
  }
};
  const getPriorityClass = (priority:any) => {
    switch (priority) {
      case "High":
        return {
          background: "#fdecec",
          color: "#d93025",
        };

      case "Medium":
        return {
          background: "#fff4e5",
          color: "#f57c00",
        };

      default:
        return {
          background: "#e8f5e9",
          color: "#2e7d32",
        };
    }
  };

  return (
    <div>
      {/* ================= FILTERS ================= */}

      <div className="box-body">
        <div className="col-xs-2 form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search Jobs"
            value={search}
            onChange={(e:any) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-xs-2 form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search Locations"
            value={location}
            onChange={(e:any) => setLocation(e.target.value)}
          />
        </div>

        <div className="col-xs-2 form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e:any) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Completed">
              Completed
            </option>
            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>

        <div className="col-xs-2 form-group">
          <select
            className="form-control"
            value={locationFilter}
            onChange={(e:any) =>
              setLocationFilter(e.target.value)
            }
          >
            <option value="">
              All Locations
            </option>
          </select>
        </div>

        <div className="col-xs-2 form-group">
          <select
            className="form-control"
            value={templateFilter}
            onChange={(e:any) =>
              setTemplateFilter(e.target.value)
            }
          >
            <option value="">
              All Templates
            </option>
          </select>
        </div>

        <div className="col-xs-2 form-group">
          <button
            className="btn btn-primary"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="clearfix"></div>

      {/* ================= JOB LIST ================= */}

      {loading ? (
        <section className="box">
          <div className="box-body text-center">
            <h4>Loading Jobs...</h4>
          </div>
        </section>
      ) : jobs.length === 0 ? (
        <section className="box">
          <div className="box-body text-center">
            <h4>No Jobs Found !!</h4>
          </div>
        </section>
      ) : (
        jobs.map((job:any) => (
          <div
            key={job._id}
            className="box no-border"
            style={{ 
              border: "1px solid #e5e7eb",
              marginBottom: "15px",
            }}
          >
            <div className="box-body">
              <div className="row">
                {/* LEFT SIDE */}

                <div className="col-md-7">
                  <h4
                    style={{
                      fontWeight: 600,
                      marginTop: 0,
                    }}
                  >
                    <i
                      className="fa fa-clock-o"
                      style={{
                        color: "#f39c12",
                        marginRight: 10,
                      }}
                    />

                    {job.title}
                  </h4>

                  <div
                    style={{
                      marginTop: 10,
                      color: "#555",
                    }}
                  >
                    <span
                      style={{
                        marginRight: 15,
                      }}
                    >
                      <i className="fa fa-user-o"></i>{" "}
                      {job.client?.location_name ||
                        "Service location not found"}
                    </span>

                    <span
                      style={{
                        marginRight: 15,
                      }}
                    >
                      <i className="fa fa-map-marker"></i>{" "}
                      {job.city},{" "}
                      {job.state}
                    </span>

                    <span>
                      <i className="fa fa-calendar"></i>{" "}
                      {job.scheduleStart
                        ? new Date(
                            job.scheduleStart
                          ).toLocaleString()
                        : "Not Scheduled"}
                    </span>
                  </div>

                  <p
                    style={{
                      marginTop: 12,
                      marginBottom: 0,
                    }}
                  >
                    {job.description}
                  </p>
                </div>

                {/* RIGHT SIDE */}

                <div
                  className="col-md-5 text-right"
                  style={{
                    display: "flex",
                    justifyContent:
                      "flex-end",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Priority */}

                  <span
                    style={{
                      ...getPriorityClass(
                        job.priority
                      ),
                      padding:
                        "6px 12px",
                      borderRadius:
                        "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {job.priority}
                  </span>

                  {/* Status Badge */}

                  <span
                    style={{
                      background:
                        "#fff4cc",
                      color: "#856404",
                      padding:
                        "6px 12px",
                      borderRadius:
                        "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {job.status}
                  </span>

                  {/* Status Dropdown */}

                  <select
                    className="form-control"
                    style={{
                      width: "130px",
                    }}
                    value={job.status}
                    onChange={(e: any) =>
                     updateJobStatus(
                          job._id,
                          e.target.value
                        )
                      }
                     >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Assigned">
                      Assigned
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>

                  {/* Actions */}

                  <button className="btn btn-default btn-sm">
                    <i className="fa fa-bell-o"></i>
                  </button>

                  <button className="btn btn-default btn-sm">
                    <i className="fa fa-file-text-o"></i>
                  </button>

                 <button
  className="btn btn-default btn-sm"
  onClick={() => {
    setSelectedJob(job);
    setShowEditModal(true);
  }}
>
  <i className="fa fa-pencil"></i>
</button>

                  <button className="btn btn-default btn-sm">
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

{showEditModal && (
  <>
<div
  className="modal fade in"
  style={{
    display: "block",
    background: "rgba(0,0,0,.5)",
    overflowY: "auto",
    padding: "20px 0",
  }}
>
     <div
  className="modal-dialog modal-lg"
  style={{
    width: "50%",
    maxWidth: "1100px",
    margin: "20px auto",
  }}
>
 <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={() => {
                setShowEditModal(false);
                setSelectedJob(null);
              }}
            >
              ×
            </button>

            <h4 className="modal-title">
              Edit Job
            </h4>
          </div>

          <div className="modal-body"> 
  <EditJobModal
    job={selectedJob}
    onClose={() => {
      setShowEditModal(false);
      setSelectedJob(null);
      getJobs();
    }}
  /> 
          </div>
        </div>
      </div>
    </div>

    <div className="modal-backdrop fade in"></div>
  </>
)}


    </div>
  );
}