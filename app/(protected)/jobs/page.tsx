"use client";

import React, { useState } from "react";

import OneTimeJob from "@/component/jobs/oneTimeJob";
import RecurringJobs from "@/component/jobs/recurringJobs";
import CompletedJobs from "@/component/jobs/completedJobs";
import NewJobBox from "@/component/jobs/modalBox/NewJobBox";
import NewRecurringJobBox from "@/component/jobs/modalBox/NewRecurringJobBox";

export default function Page() {
  const [activeTab, setActiveTab] = useState("one-time");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [jobCount, setJobCount] = useState(0);
  const [reccuringJobCount, setReccuringJobCount] = useState(0);

  console.log("jobCount====>",jobCount)

  const tabs = [
    {
      key: "one-time",
      label: "One-Time Jobs",
      count: jobCount,
    },
    {
      key: "recurring",
      label: "Recurring Jobs",
      count: reccuringJobCount,
    },
    {
      key: "service",
      label: "Service Requests",
      count: 0,
    },
    {
      key: "completed",
      label: "Completed Jobs",
      count: 0,
    },
    {
      key: "all",
      label: "All Jobs",
      count: 0,
    },
  ];

  // =========================
  // Dynamic Buttons
  // =========================
  const renderButtons = () => {
    switch (activeTab) {
      case "one-time":
        return (
          <button
            className="btn btn-warning"
            onClick={(e:any) => setActiveModal("newJob")}
          >
            + New Job
          </button>
        );

      case "recurring":
        return (
          <div className="d-flex gap-2 pull-left">
            <button
              className="btn btn-success pull-left"
              onClick={(e:any) => setActiveModal("importExport")}
            >
              Import / Export
            </button>

            <button
              className="btn btn-default pull-left"
              onClick={(e:any) => setActiveModal("generateJobs")}
            >
              Generate Jobs
            </button>

            <button
              className="btn btn-warning pull-left"
              onClick={(e:any) => setActiveModal("recurringJob")}
            >
              + Create Recurring Jobs
            </button>
          </div>
        );

      case "service":
        return (
          <button
            className="btn btn-info"
            onClick={(e:any) => setActiveModal("serviceRequest")}
          >
            + New Service Request
          </button>
        );

      case "completed":
        return (
          <button
            className="btn btn-default"
            onClick={(e:any) => setActiveModal("exportCompleted")}
          >
            Export Completed
          </button>
        );

      case "all":
        return (
          <button
            className="btn btn-primary"
            onClick={(e:any) => setActiveModal("createJob")}
          >
            + Create Job
          </button>
        );

      default:
        return null;
    }
  };

  // =========================
  // Dynamic Tab Content
  // =========================
  const renderContent = () => {
    switch (activeTab) {
      case "one-time":
        return <OneTimeJob onCountChange={setJobCount}/>;

      case "recurring":
        return <RecurringJobs onCountChange={setReccuringJobCount} />;

      case "service":
        return (
          <div className="box-body">
            <h4>Service Requests List</h4>
          </div>
        );

      case "completed":
        return <CompletedJobs />;

      case "all":
        return (
          <div className="box-body">
            <h4>All Jobs List</h4>
          </div>
        );

      default:
        return null;
    }
  };

  // =========================
  // Modal Title
  // =========================
  const modalTitle = () => {
    switch (activeModal) {
      case "newJob":
        return "Create New Job";

      case "importExport":
        return "Import / Export";

      case "generateJobs":
        return "Generate Jobs";

      case "recurringJob":
        return "Create Recurring Job";

      case "serviceRequest":
        return "New Service Request";

      case "exportCompleted":
        return "Export Completed Jobs";

      case "createJob":
        return "Create Job";

      default:
        return "";
    }
  };

  // =========================
  // Modal Content
  // =========================
  const modalContent = () => {
    switch (activeModal) {
      case "newJob":
        return (<NewJobBox/>);

      case "importExport":
        return <p>Import Export Content Here</p>;

      case "generateJobs":
        return <p>Generate Jobs Content Here</p>;

      case "recurringJob":
        return <NewRecurringJobBox/>;

      case "serviceRequest":
        return <p>Service Request Form Here</p>;

      case "exportCompleted":
        return <p>Export Completed Data Here</p>;

      case "createJob":
        return <p>Create Job Form Here</p>;

      default:
        return null;
    }
  };

  return (
    <div className="content-wrapper">
      {/* ================= HEADER ================= */}

      <section className="content-header">
        <h1>Jobs</h1>

        <p>
          Manage service jobs and dispatch to technicians
        </p>

        <ol className="breadcrumb">
          <li>
            <a href="#">
              <i className="fa fa-dashboard" /> Home
            </a>
          </li>

          <li className="active">Jobs</li>
        </ol>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="content">
        <div className="box">
          {/* Box Header */}

          <div className="box-header with-border d-flex justify-content-between align-items-center">
            {/* Tabs */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {tabs.map((tab:any) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`btn pull-left ${
                    activeTab === tab.key
                      ? "btn-danger"
                      : "btn-default"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            <div className="pull-left">{renderButtons()}</div>
            </div>

            {/* Dynamic Buttons */}

          </div>

          {/* Dynamic Content */}

          <div>{renderContent()}</div>
        </div>
      </section>

      {/* ================= MODAL ================= */}

      {activeModal && (
        <>
          {/* Modal */}

          <div
            className="modal fade in"
            style={{
              display: "block",
              paddingRight: "17px",
              overflowY: "auto",
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Header */}

                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setActiveModal(null)
                    }
                  >
                    ×
                  </button>

                  <h4 className="modal-title">
                    {modalTitle()}
                  </h4>
                </div>

                {/* Body */}

                <div className="modal-body">
                  {modalContent()}
                </div>

                {/* Footer */}
 
              </div>
            </div>
          </div>

          {/* Backdrop */}

          <div className="modal-backdrop fade in"></div>
        </>
      )}
    </div>
  );
}