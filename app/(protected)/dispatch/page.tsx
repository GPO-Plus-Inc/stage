import React from "react";

export default function page() {
  return (
    <div>
      <div className="content-wrapper">

        {/* Content Header */}
        <section className="content-header">
          <h1>Dispatch Dashboard</h1>

          <p>Real-time technician tracking and job management</p>

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

          {/* Top Box */}
          <div className="box box-solid border rounded shadow-sm bg-white">
            <div className="box-body clearfix">

              <div
                className="row"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >

                <div className="col-md-4 col-sm-12">
                  <p
                    style={{
                      margin: 0,
                      lineHeight: "34px",
                    }}
                  >
                    Last updates: 1 min ago
                  </p>
                </div>

                <div className="col-md-4 col-sm-12">
                  <select className="form-control">
                    <option>Manual Refresh</option>
                    <option>Every 15 Seconds</option>
                    <option>Every 30 Seconds</option>
                    <option>Every Minute</option>
                  </select>
                </div>

                <div className="col-md-4 col-sm-12 text-right">
                  <button className="btn btn-warning">
                    Refresh Now
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Stats Boxes */}
          <div className="box-body">
            <div className="row">

              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-green">
                  <div className="inner">
                    <h3>10</h3>
                    <p>Active</p>
                  </div>

                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>

                  <a href="#" className="small-box-footer">
                    More info{" "}
                    <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-aqua">
                  <div className="inner">
                    <h3>08</h3>
                    <p>En Route</p>
                  </div>

                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>

                  <a href="#" className="small-box-footer">
                    More info{" "}
                    <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-yellow">
                  <div className="inner">
                    <h3>1200</h3>
                    <p>Available</p>
                  </div>

                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>

                  <a href="#" className="small-box-footer">
                    More info{" "}
                    <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-gray">
                  <div className="inner">
                    <h3>140</h3>
                    <p>Offline</p>
                  </div>

                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>

                  <a href="#" className="small-box-footer">
                    More info{" "}
                    <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Main Row */}
          <div className="row">

            {/* LEFT SIDE */}
            <section className="pull-left col-md-9">

              <div className="box border rounded shadow-sm bg-white">

                <div className="box-header with-border">
                  <h3 className="box-title">
                    Live Technician Tracking
                  </h3>

                  <div className="box-tools pull-right">
                    <span className="label label-success">
                      GPS LIVE
                    </span>
                  </div>
                </div>

                <div className="box-body">

                  {/* MAP */}
                  <div
                    style={{
                      width: "100%",
                      height: "500px",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      title="live-map"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src="https://maps.google.com/maps?q=26.4499,80.3319&z=12&output=embed"
                      allowFullScreen
                    />
                  </div>

                  {/* LIVE USERS */}
                 
 

                </div>

              </div>

            </section>

          {/* RIGHT SIDE */}
<section className="pull-left col-md-3">

  <div className="box border rounded shadow-sm bg-white">

    <div className="box-header with-border">
      <h3 className="box-title">
        Technician Status
      </h3>

      <div className="box-tools pull-right">
        <span className="label label-success">
          LIVE
        </span>
      </div>
    </div>

    <div className="box-body">

      {/* Technician 1 */}
      <div className="info-box bg-green">
        <span className="info-box-icon">
          <i className="fa fa-user" />
        </span>

        <div className="info-box-content">
          <span className="info-box-text">
            Rahul Sharma
          </span>

          <span className="info-box-number">
            Active
          </span>

          <span className="progress-description">
            GPS Updated 10 sec ago
          </span>
        </div>
      </div>

      {/* Technician 2 */}
      <div className="info-box bg-aqua">
        <span className="info-box-icon">
          <i className="fa fa-truck" />
        </span>

        <div className="info-box-content">
          <span className="info-box-text">
            Amit Verma
          </span>

          <span className="info-box-number">
            En Route
          </span>

          <span className="progress-description">
            ETA: 15 Minutes
          </span>
        </div>
      </div>

      {/* Technician 3 */}
      <div className="info-box bg-yellow">
        <span className="info-box-icon">
          <i className="fa fa-map-marker" />
        </span>

        <div className="info-box-content">
          <span className="info-box-text">
            Vikas Kumar
          </span>

          <span className="info-box-number">
            Available
          </span>

          <span className="progress-description">
            Waiting for Dispatch
          </span>
        </div>
      </div>

      {/* Technician 4 */}
      <div className="info-box bg-red">
        <span className="info-box-icon">
          <i className="fa fa-power-off" />
        </span>

        <div className="info-box-content">
          <span className="info-box-text">
            Sandeep Yadav
          </span>

          <span className="info-box-number">
            Offline
          </span>

          <span className="progress-description">
            Last seen 25 mins ago
          </span>
        </div>
      </div>

    </div>

  </div>

</section>

          </div>

        </section>

      </div>
    </div>
  );
}