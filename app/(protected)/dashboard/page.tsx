import React from 'react'

export default function Adminpage() {
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
    <div className="small-box bg-aqua">
      <div className="inner">
        <h3>150</h3>
        <p>New Orders</p>
      </div>
      <div className="icon">
        <i className="ion ion-bag" />
      </div>
      <a href="#" className="small-box-footer">
        More info <i className="fa fa-arrow-circle-right" />
      </a>
    </div>
  </div>
  {/* ./col */}
  <div className="col-lg-3 col-xs-6">
    {/* small box */}
    <div className="small-box bg-green">
      <div className="inner">
        <h3>
          53<sup style={{ fontSize: 20 }}>%</sup>
        </h3>
        <p>Bounce Rate</p>
      </div>
      <div className="icon">
        <i className="ion ion-stats-bars" />
      </div>
      <a href="#" className="small-box-footer">
        More info <i className="fa fa-arrow-circle-right" />
      </a>
    </div>
  </div>
  {/* ./col */}
  <div className="col-lg-3 col-xs-6">
    {/* small box */}
    <div className="small-box bg-yellow">
      <div className="inner">
        <h3>44</h3>
        <p>User Registrations</p>
      </div>
      <div className="icon">
        <i className="ion ion-person-add" />
      </div>
      <a href="#" className="small-box-footer">
        More info <i className="fa fa-arrow-circle-right" />
      </a>
    </div>
  </div>
  {/* ./col */}
  <div className="col-lg-3 col-xs-6">
    {/* small box */}
    <div className="small-box bg-red">
      <div className="inner">
        <h3>65</h3>
        <p>Unique Visitors</p>
      </div>
      <div className="icon">
        <i className="ion ion-pie-graph" />
      </div>
      <a href="#" className="small-box-footer">
        More info <i className="fa fa-arrow-circle-right" />
      </a>
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
      href="#"
      className="text-decoration-none fw-medium text-success pull-right"
    >
      View all
    </a>
  </div>

  {/* Body */}
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
</div>


<div className="box box-solid border rounded shadow-sm bg-white">
  {/* Header */}
  <div className="ui-sortable-handle  content-header  nav nav-tabs nav-tabs-custom border-bottom">
    <p className="pull-left ">
      Today's Jobs
    </p>

    <a
      href="#"
      className="text-decoration-none fw-medium text-success pull-right"
    >
      View all
    </a>
  </div>

  {/* Body */}
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
  <div className="info-box">
    <span className="info-box-icon bg-aqua">
      <i className="fa fa-envelope-o" />
    </span>
    <div className="info-box-content">
      <span className="info-box-text">Messages</span>
      <span className="info-box-number">1,410</span>
    </div> 
  {/* /.info-box */}
</div>


  <div className="info-box">
    <span className="info-box-icon bg-aqua">
      <i className="fa fa-envelope-o" />
    </span>
    <div className="info-box-content">
      <span className="info-box-text">Messages</span>
      <span className="info-box-number">1,410</span>
    </div> 
  {/* /.info-box */}
</div>

  <div className="info-box">
    <span className="info-box-icon bg-aqua">
      <i className="fa fa-envelope-o" />
    </span>
    <div className="info-box-content">
      <span className="info-box-text">Messages</span>
      <span className="info-box-number">1,410</span>
    </div> 
  {/* /.info-box */}
</div>

  <div className="info-box">
    <span className="info-box-icon bg-aqua">
      <i className="fa fa-envelope-o" />
    </span>
    <div className="info-box-content">
      <span className="info-box-text">Messages</span>
      <span className="info-box-number">1,410</span>
    </div> 
  {/* /.info-box */}
</div>

     
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
    <a href="#">
      Projects <span className="pull-right badge bg-blue">31</span>
    </a>
  </li>
  <li>
    <a href="#">
      Tasks <span className="pull-right badge bg-aqua">5</span>
    </a>
  </li>
  <li>
    <a href="#">
      Completed Projects <span className="pull-right badge bg-green">12</span>
    </a>
  </li>
  <li>
    <a href="#">
      Followers <span className="pull-right badge bg-red">842</span>
    </a>
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