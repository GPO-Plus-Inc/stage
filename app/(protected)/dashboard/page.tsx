"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function Adminpage() {
  const [stats, setStats] = useState({
  jobsScheduledToday: 0,
  jobsCompletedToday: 0,
  workersScheduledToday: 0,
  totalWorkers: 0,
  totalServiceLocations: 0,
  newServiceLocationsThisMonth: 0,
  revenueToday: 0,
  revenueThisMonth: 0,
});

  const [recentJobs, setRecentJobs] = useState([]);
  const [todayJobs, setTodayJobs] = useState([]);
const [loading, setLoading] = useState(false);
const [weekStats, setWeekStats] = useState({
  jobsCompleted: 0,
  revenue: 0,
  avgJobTime: 0,
});

const fetchWeekStats = async () => {
  try {
    const { data } = await axios.get("/v1/thisWeek");

    if (data.success) {
      setWeekStats(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchTodayJobs = async () => {
  try {
    setLoading(true);

    const { data } = await axios.get(
      "/v1/jobList?status=scheduled&date=today"
    );

    if (data.success) {
      setTodayJobs(data.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

 
const fetchRecentJobs = async () => {
  try {
    const { data } = await axios.get("/v1/recentJobs");

    if (data.success) {
      setRecentJobs(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchDashboard();
  fetchRecentJobs();
  fetchTodayJobs();
  fetchWeekStats();
}, []);

const fetchDashboard = async () => {
  try {
    const { data } = await axios.get("/v1/dashboardStats");

    if (data.success) {
      setStats(data.data);
    }
  } catch (err) {
    console.log(err);
  }
};
	return ( 
			 <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
      <h1>
        Welcome back, Bryan !! 
      </h1>
      <ol className="breadcrumb">
        <li>
          <a href="#">
            <i className="fa fa-dashboard" /> Home
          </a>
        </li>
        <li>
          <a href="#">Examples</a>
        </li>
        <li className="active">Blank page</li>
      </ol>
    </section>
    {/* Main content */}
    <section className="content">
      {/* Default box */}
      <div className="box"> 

        <div className="box-body">
          <div className="row">
  <div className="col-lg-3 col-xs-6">
    {/* small box */}
    <div className="small-box bg-blue">
      <div className="inner">
        <h3>{stats.jobsScheduledToday}</h3>
        <p>Jobs Scheduled Today</p>
        
      </div>
      <div className="icon">
        <i className="ion ion-bag" />
      </div>
      <p className="small-box-footer">
        Jobs Completed: {stats.jobsCompletedToday}
      </p>
    </div>
  </div>
  {/* ./col */}
  <div className="col-lg-3 col-xs-6">
    {/* small box */}
    <div className="small-box bg-green">
      <div className="inner">
        <h3>{stats.workersScheduledToday}</h3>
        <p>Workers Scheduled Today</p>
      </div>
      <div className="icon">
        <i className="ion ion-stats-bars" />
      </div>
      <p className="small-box-footer">
        {stats.totalWorkers} clocked in
      </p>
    </div>
  </div>
  {/* ./col */}
  <div className="col-lg-3 col-xs-6">
    {/* small box */}
    <div className="small-box bg-green">
      <div className="inner">
   <h3>{stats.totalServiceLocations}</h3>
        <p>Service Locations</p>
      </div>
      <div className="icon">
        <i className="ion ion-person-add" />
      </div>
      <p className="small-box-footer">
        {stats.newServiceLocationsThisMonth} new this month
      </p>
    </div>
  </div>
  {/* ./col */}
  <div className="col-lg-3 col-xs-6">
    {/* small box */}
    <div className="small-box bg-blue">
      <div className="inner">
        <h3>${stats.revenueToday}</h3>
        <p>Revenue Today</p>
      </div>
      <div className="icon">
        <i className="ion ion-pie-graph" />
      </div>
      <p className="small-box-footer">
        ${stats.revenueThisMonth} this month
      </p>
    </div>
  </div>
  {/* ./col */}
</div>

        </div>

        <div className="box-footer">Footer</div>
        {/* /.box-footer*/}
      </div>
        {/* /.box-body */}

<div className="row">
  <section className="col-lg-7 connectedSortable ui-sortable">
  {/* Custom tabs (Charts with tabs)*/}
   {/* Map box */}
<div className="box box-solid border rounded shadow-sm bg-white">
  {/* Header */}
  <div className="ui-sortable-handle  content-header  nav nav-tabs nav-tabs-custom border-bottom">
    <p className="pull-left ">
      Recent Jobs
    </p>

    <a
      href="/jobs"
      className="text-decoration-none fw-medium text-success pull-right"
    >
      View all
    </a>
  </div>

  {/* Body */}

<div className="box-body">
  {recentJobs.length === 0 ? (
   
  <div
    className="box-body d-flex flex-column justify-content-center align-items-center text-center"
    style={{ minHeight: "320px" }}
  >
    {/* Icon */}
    <div
      className="d-flex align-items-center justify-content-center rounded-circle bg-light mb-3"
      style={{
        width: "90px",
        height: "90px",
      }}
    >
      <i
        className="bi bi-briefcase text-secondary"
        style={{ fontSize: "40px" }}
      ></i>
    </div>

    {/* Empty text */}
    <h5 className="text-secondary mb-3 fw-normal">
      No jobs yet
    </h5>

    {/* Button */}
    <button className="btn btn-outline-success px-4 py-2 rounded-pill">
      <i className="bi bi-plus-lg me-2"></i>
      Create your first job
    </button>
  </div>
  ) : (
    recentJobs.map((job: any) => (
      <div className="recent-job-card" key={job._id}>
        <div className="job-left">
          <div className="job-icon">
            <i className="fa fa-check-circle"></i>
          </div>

          <div>
            <h4>{job.jobTemplate?.title || job.title}</h4>

            <div className="job-subtitle">
              <span>{job.client?.location_name}</span>

              <span>
                <i className="fa fa-map-marker"></i>

                {job?.client.city}
              </span>
            </div>
          </div>
        </div>

        <div className="job-right">
          <span
            className={`job-status ${
              job.status === "Completed"
                ? "completed"
                : "pending"
            }`}
          >
            {job.status}
          </span>

          <div className="job-date">
            {new Date(job.scheduleStart).toLocaleDateString()}
          </div>
        </div>
      </div>
    ))
  )}
</div>


</div>


<div className="box box-solid border rounded shadow-sm bg-white">
  {/* Header */}
  <div className="ui-sortable-handle  content-header  nav nav-tabs nav-tabs-custom border-bottom">
    <p className="pull-left ">
      Today's Jobs
    </p>

    <a
      href="/jobs?status=scheduled&date=today"
      className="text-decoration-none fw-medium text-success pull-right"
    >
      View all
    </a>
  </div>

  <div className="box-body">
  {loading ? (
    <p>Loading...</p>
  ) : todayJobs.length === 0 ? ( 
  <div
    className="box-body d-flex flex-column justify-content-center align-items-center text-center"
    style={{ minHeight: "320px" }}
  >
    {/* Icon */}
    <div
      className="d-flex align-items-center justify-content-center rounded-circle bg-light mb-3"
      style={{
        width: "90px",
        height: "90px",
      }}
    >
      <i
        className="bi bi-briefcase text-secondary"
        style={{ fontSize: "40px" }}
      ></i>
    </div>

    {/* Empty text */}
    <h5 className="text-secondary mb-3 fw-normal">
      No job scheduled for today
    </h5>

  </div>
  ) : (
    todayJobs.map((job: any) => (
      <div
        key={job._id}
        className="recent-job-card"
      >
        <div className="job-left">
          <div className="job-icon">
            <i className="fa fa-calendar-check-o"></i>
          </div>

          <div>
            <h4>{job.title}</h4>

            <p>
              {job.client?.location_name}
            </p>

            <span>
              <i className="fa fa-map-marker"></i>{" "}
              {job.client?.city}
            </span>
          </div>
        </div>

        <div className="job-right">
          <span
            className={`label ${
              job.status === "Completed"
                ? "label-success"
                : job.status === "Pending"
                ? "label-warning"
                : job.status === "Assigned"
                ? "label-primary"
                : "label-info"
            }`}
          >
            {job.status}
          </span>

          <br />

          <small>
            {new Date(job.scheduleStart).toLocaleDateString()}
          </small>
        </div>
      </div>
    ))
  )}
</div>


</div>
      
   
  {/* /.box (chat box) */}
  {/* TO DO List */}
 
</section>









<section className="col-lg-5 connectedSortable">
  {/* Map box */}
  <div className="box box-solid ">
    <div className="ui-sortable-handle  content-header  nav nav-tabs nav-tabs-custom border-bottom">
    <p className="pull-left ">
      Today's Jobs
    </p>
 
  </div>

    
    <div className="box-body">  
    <a href="/jobs">
     <div
        className="recent-job-card"
      >
        <div className="job-left">
          <div className="job-icon">
            <i className="fa fa-plus"></i>
          </div>

          <div>
            <h4>New Jobs</h4>

            <p>
              Create a service jobs
            </p> 
          </div>
        </div>
 
      </div>
    </a>  


 <a href="/clients">
     <div
        className="recent-job-card"
      >
        <div className="job-left">
          <div className="job-icon">
            <i className="fa fa-user"></i>
          </div>

          <div>
            <h4>New Service Location</h4>

            <p>
            Add a location
            </p> 
          </div>
        </div>
 
      </div>
    </a> 

 <a href="/inventory">
     <div
        className="recent-job-card"
      >
        <div className="job-left">
          <div className="job-icon">
            <i className="fa fa-plus"></i>
          </div>

          <div>
            <h4>Inventory</h4>

            <p>
             Manage your parts and materials
            </p> 
          </div>
        </div>
 
      </div>
    </a>  
 

     
    </div>

  </div>


  {/* Map box */}
  <div className="box box-solid ">
    <div className="ui-sortable-handle  content-header  nav nav-tabs nav-tabs-custom border-bottom">
    <p className="pull-left ">
      This  Week
    </p> 
  </div>

    
    <div className="box-body">
<ul className="nav nav-stacked">
  <li>
    <p>
      Jobs Completed
      <span className="pull-right badge bg-blue">
        {weekStats.jobsCompleted}
      </span>
    </p>
  </li>

  <li>
    <p>
      Revenue
      <span className="pull-right badge bg-aqua">
        ${weekStats.revenue}
      </span>
    </p>
  </li>

  <li>
    <p>
      Avg. Job Time
      <span className="pull-right badge bg-green">
        {weekStats.avgJobTime} min
      </span>
    </p>
  </li>
</ul>

     
    </div>

  </div>


 
  
  {/* /.box */}
</section>


</div>

      {/* /.box */}
    </section>
    {/* /.content */}

  </div> 
	)
}