"use client"

import React, { useEffect, useState } from "react"


export default function AccountsList({accounts,loading}:any) {

  const deleteAccount = async (id: string) => {
 console.log("delect action")
};

  // =========================================
  // UI
  // =========================================

  return (
    <div className="row">

      <div className="col-md-12">

        {
          loading ? (

            <div className="box border rounded shadow-sm bg-white">
              <div className="box-body">
                Loading...
              </div>
            </div>

          ) : accounts?.length > 0 ? (

            accounts?.map((item: any) => (

              <div
                key={item._id}
                className="box border rounded shadow-sm bg-white"
                style={{
                  marginBottom: "15px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb"
                }}
              >

                <div
                  className="box-body"
                  style={{
                    padding: "20px"
                  }}
                >

                  {/* Top Row */}
                  <div className="d-flex justify-content-between align-items-start">

                    {/* Left */}
                    <div className="d-flex">

                      {/* Icon */}
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background: "#e8f0ff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "15px"
                        }}
                      >
                        <i
                          className="fa fa-building-o"
                          style={{
                            color: "#3b82f6",
                            fontSize: "22px"
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div>

                        {/* Name */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "10px"
                          }}
                        >

                          <h4
                            style={{
                              margin: 0,
                              fontWeight: "600"
                            }}
                          >
                            {item.account_name}
                          </h4>

                          <span
                            className="label label-default"
                            style={{
                              borderRadius: "20px",
                              padding: "5px 10px",
                              fontSize: "11px"
                            }}
                          >
                            0 locations
                          </span>

                        </div>

                        {/* Email / Phone / Company */}
                        <div className="row">

                          {/* Email */}
                          <div className="col-md-4">
                            <p
                              style={{
                                color: "#6b7280",
                                marginBottom: "10px"
                              }}
                            >
                              <i className="fa fa-envelope-o" />{" "}
                              {
                                item?.primary_contact?.email
                                || "--"
                              }
                            </p>
                          </div>

                          {/* Phone */}
                          <div className="col-md-4">
                            <p
                              style={{
                                color: "#6b7280",
                                marginBottom: "10px"
                              }}
                            >
                              <i className="fa fa-phone" />{" "}
                              {
                                item?.primary_contact?.phone
                                || "--"
                              }
                            </p>
                          </div>

                          {/* Company */}
                          <div className="col-md-4">
                            <p
                              style={{
                                color: "#6b7280",
                                marginBottom: "10px"
                              }}
                            >
                              <i className="fa fa-building" />{" "}
                              {
                                item?.primary_contact?.company
                                || "--"
                              }
                            </p>
                          </div>

                        </div>

                        {/* Notes */}
                        <p
                          style={{
                            color: "#4b5563",
                            marginTop: "10px",
                            marginBottom: 0
                          }}
                        >
                          {
                            item.notes
                            || "No notes available"
                          }
                        </p>

                      </div>

                    </div>

                    {/* Actions */}
                    <div>

                      {/* Edit */}
                      <button
                        className="btn btn-default btn-sm"
                        style={{
                          marginRight: "8px",
                          border: "none",
                          background: "transparent"
                        }}
                      >
                        <i
                          className="fa fa-pencil"
                          style={{
                            color: "#6b7280"
                          }}
                        />
                      </button>

                      {/* Delete */}
                      <button
                        className="btn btn-default btn-sm"
                        style={{
                          border: "none",
                          background: "transparent"
                        }}
                        onClick={(e:any) =>
                          deleteAccount(item._id)
                        }
                      >
                        <i
                          className="fa fa-trash"
                          style={{
                            color: "#f97316"
                          }}
                        />
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))

          ) : (

            <div className="box border rounded shadow-sm bg-white">
              <div className="box-body text-center">
                No Accounts Found
              </div>
            </div>

          )
        }

      </div>

    </div>
  )
}