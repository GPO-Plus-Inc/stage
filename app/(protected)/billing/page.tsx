"use client";

import React, { useState } from "react";

export default function Billing() {
  const [activeTab, setActiveTab] =
    useState("invoices");

  const invoices: any[] = [];

  return (
     <div>
      <div className="content-wrapper">
         <section className="content">
    <div className="box box-primary">
      <div className="box-header with-border">
        <h3 className="box-title">
          Billing
        </h3>
      </div>

      <div className="box-body">
        {/* Tabs */}

        <div
          style={{
            marginBottom: 25,
          }}
        >
          <button
            className={`btn ${
              activeTab ===
              "invoices"
                ? "btn-success"
                : "btn-default"
            }`}
            onClick={() =>
              setActiveTab(
                "invoices"
              )
            }
          >
            Invoices
          </button>

          {" "}

          <button
            className={`btn ${
              activeTab ===
              "reports"
                ? "btn-success"
                : "btn-default"
            }`}
            onClick={() =>
              setActiveTab(
                "reports"
              )
            }
          >
            Service Reports
          </button>
        </div>

        {/* Invoice Tab */}

        {activeTab ===
          "invoices" && (
          <div className="box box-default">
            <div className="box-body">
              <div className="clearfix">
                <div
                  className="pull-left"
                  style={{
                    fontSize:
                      "18px",
                    marginTop: 8,
                  }}
                >
                  {
                    invoices.length
                  }{" "}
                  invoices
                </div>

                <div className="pull-right">
                  <button className="btn btn-default">
                    <i className="fa fa-refresh"></i>{" "}
                    Refresh
                  </button>

                  {" "}

                  <button
                    className="btn btn-default"
                    disabled
                  >
                    <i className="fa fa-check"></i>{" "}
                    Sync
                    Selected to
                    QuickBooks
                  </button>
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
                }}
              >
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>
                        <input type="checkbox" />
                      </th>

                      <th>
                        Invoice #
                      </th>

                      <th>
                        Client
                      </th>

                      <th>
                        Total
                      </th>

                      <th>
                        Terms
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoices.length ===
                    0 ? null : (
                      <>
                        {invoices.map(
                          (
                            invoice
                          ) => (
                            <tr
                              key={
                                invoice._id
                              }
                            >
                              <td>
                                <input type="checkbox" />
                              </td>

                              <td>
                                {
                                  invoice.invoiceNumber
                                }
                              </td>

                              <td>
                                {
                                  invoice.client
                                }
                              </td>

                              <td>
                                $
                                {
                                  invoice.total
                                }
                              </td>

                              <td>
                                {
                                  invoice.terms
                                }
                              </td>

                              <td>
                                <span className="label label-success">
                                  {
                                    invoice.status
                                  }
                                </span>
                              </td>

                              <td>
                                <button className="btn btn-xs btn-primary">
                                  View
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Service Reports Tab */}

        {activeTab ===
          "reports" && (
          <div className="box box-default">
            <div className="box-body">
              <div className="text-center text-muted">
                No Service
                Reports Found
              </div>

              <table
                className="table table-hover"
                style={{
                  marginTop: 20,
                }}
              >
                <thead>
                  <tr>
                    <th>
                      Report #
                    </th>
                    <th>
                      Customer
                    </th>
                    <th>
                      Technician
                    </th>
                    <th>
                      Date
                    </th>
                    <th>
                      Status
                    </th>
                    <th>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody></tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
    </section>
    </div>
    </div>
  );
}