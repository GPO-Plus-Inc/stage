"use client"

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function Page() {

  // =========================================
  // STATES
  // =========================================

  const [showModal, setShowModal] = useState(false)

  const [accounts, setAccounts] = useState<any[]>([])

  const [locations, setLocations] =
    useState<any[]>([])

  const [filteredLocations,
    setFilteredLocations] =
      useState<any[]>([])

  const [selectedLocation,
    setSelectedLocation] =
      useState("all")

  const [search,
    setSearch] =
      useState("")

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({

      locationName: "",

      account: "",

      company: "",

      first_name: "",
      last_name: "",

      email: "",
      phone: "",

      secondary_first_name: "",
      secondary_last_name: "",

      secondary_email: "",
      secondary_phone: "",

      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",

      notes: "",

      inviteSms: false
    })

  // =========================================
  // GET ACCOUNTS
  // =========================================

  const getAccounts = async () => {

    try {

      const response = await api.get(
        "/v1/getacc"
      )

      setAccounts(response.data.data)

    } catch (error) {

      console.log(error)
    }
  }

  // =========================================
  // GET LOCATIONS
  // =========================================

  const getLocations = async () => {

    try {

      const response = await api.get(
        "/v1/getServiceLocation"
      )

      setLocations(
        response.data.data
      )

      setFilteredLocations(
        response.data.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (
    e: any
  ) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value
    })
  }

  // =========================================
  // ACCOUNT CHANGE
  // =========================================

  const handleAccountChange = (
    e: any
  ) => {

    const value = e.target.value

    const account = accounts.find(
      (item: any) =>
        item._id === value
    )

    setFormData({

      ...formData,

      account: value,

      company:
        account?.primary_contact
          ?.company || "",

      first_name:
        account?.primary_contact
          ?.first_name || "",

      last_name:
        account?.primary_contact
          ?.last_name || "",

      email:
        account?.primary_contact
          ?.email || "",

      phone:
        account?.primary_contact
          ?.phone || ""
    })
  }

  // =========================================
  // CREATE LOCATION
  // =========================================

  const createLocation = async () => {

    try {

      setLoading(true)

      const response = await api.post(
        "/v1/createServiceLocation",
        formData
      )

      if (response.data.success) {

        alert(
          "Location Created Successfully"
        )

        getLocations()

        setShowModal(false)

        setFormData({

          locationName: "",

          account: "",

          company: "",

          first_name: "",
          last_name: "",

          email: "",
          phone: "",

          secondary_first_name: "",
          secondary_last_name: "",

          secondary_email: "",
          secondary_phone: "",

          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",

          notes: "",

          inviteSms: false
        })
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // FILTER LOCATION
  // =========================================

  const filterLocation = (
    company: string
  ) => {

    setSelectedLocation(
      company
    )

    // ALL

    if (company === "all") {

      setFilteredLocations(
        locations
      )

      return
    }

    // FILTER

    const filtered =
      locations.filter(
        (item: any) =>

          item.company ===
          company
      )

    setFilteredLocations(
      filtered
    )
  }

  // =========================================
  // UNIQUE ACCOUNTS
  // =========================================

  const uniqueAccounts =
    [...new Set(
      locations.map(
        (item: any) =>
          item.company
      )
    )]

  // =========================================
  // USE EFFECT
  // =========================================

  useEffect(() => {

    getAccounts()

    getLocations()

  }, [])

  return (
    <>
      <div className="content-wrapper">

        {/* HEADER */}

        <section className="content-header">

          <h1>
            Service Locations
          </h1>

          <p>
            Manage your service locations and contacts
          </p>

        </section>

        {/* CONTENT */}

        <section className="content">

          {/* TOP BAR */}

          <div
            className="box box-solid border rounded shadow-sm bg-white"
          >

            <div className="box-body">

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center"
                }}
              >

                <div>

                  <button
                    className="btn btn-default"
                    style={{
                      marginRight: "10px"
                    }}
                  >
                    Import/Export
                  </button>

                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      setShowModal(true)
                    }
                  >
                    New Location
                  </button>

                </div>

                <div>

                  <button
                    className="btn btn-default"
                  >
                    Grid
                  </button>

                  {" "}

                  <button
                    className="btn btn-primary"
                  >
                    List
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* MAIN */}

          <div className="row">

            {/* SIDEBAR */}

            <section className="pull-left col-md-3">

              <div
                className="box border rounded shadow-sm bg-white"
              >

                <div className="box-body">

                  <h4>
                    Accounts
                  </h4>

                  <hr />

                  {/* ALL */}

                  <div
                    style={{
                      padding: "12px",
                      borderBottom:
                        "1px solid #eee",
                      cursor: "pointer",
                      fontWeight:
                        selectedLocation ===
                        "all"
                          ? "600"
                          : "400"
                    }}
                    onClick={() =>
                      filterLocation("all")
                    }
                  >
                    All Accounts
                  </div>

                  {/* ACCOUNT LIST */}
                  {accounts?.map((dt,index)=>(
                    <div key={index}>
                    <div className="flex">
                    <p>{dt?.account_name}</p>
                    <p>{dt?.locations_count}</p>
                    </div>  
                    </div>))} 

                  <div
                    style={{
                      marginTop: "15px",
                      color: "#337ab7",
                      cursor: "pointer"
                    }}
                    onClick={() =>
                      filterLocation("all")
                    }
                  >
                    Clear filter
                  </div>

                </div>

              </div>

            </section>

            {/* CONTENT */}

            <section className="pull-left col-md-9">

              {/* SEARCH */}

              <div
                className="box border rounded shadow-sm bg-white"
              >

                <div className="box-body">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search locations"
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* LOCATION CARDS */}

              {
                filteredLocations

                  .filter((item: any) =>

                    item.location_name

                      ?.toLowerCase()

                      .includes(
                        search.toLowerCase()
                      )
                  )

                  .map(
                    (
                      item: any,
                      index
                    ) => (

                      <div
                        key={index}
                        className="box border rounded shadow-sm bg-white"
                      >

                        <div
                          className="box-body"
                        >

                          {/* TOP */}

                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                "space-between"
                            }}
                          >

                            <div>

                              <h4
                                style={{
                                  marginTop: 0,
                                  fontWeight:
                                    600
                                }}
                              >
                                {
                                  item.location_name
                                }
                              </h4>

                              <span
                                className="label label-success"
                              >
                                Contact
                              </span>

                              {" "}

                              <span
                                className="label label-default"
                              >
                                {
                                  item.company
                                }
                              </span>

                            </div>

                            <div>

                              <i
                                className="fa fa-pencil"
                                style={{
                                  marginRight:
                                    "15px",
                                  cursor:
                                    "pointer"
                                }}
                              />

                              <i
                                className="fa fa-trash"
                                style={{
                                  cursor:
                                    "pointer"
                                }}
                              />

                            </div>

                          </div>

                          {/* BODY */}

                          <div
                            className="row"
                            style={{
                              marginTop:
                                "20px"
                            }}
                          >

                            {/* EMAIL */}

                            <div
                              className="col-md-4"
                            >

                              <p>

                                <i className="fa fa-envelope-o" />

                                {" "}

                                {
                                  item.email ||
                                  "—"
                                }

                              </p>

                            </div>

                            {/* PHONE */}

                            <div
                              className="col-md-3"
                            >

                              <p>

                                <i className="fa fa-phone" />

                                {" "}

                                {
                                  item.phone ||
                                  "—"
                                }

                              </p>

                            </div>

                            {/* ADDRESS */}

                            <div
                              className="col-md-5"
                            >

                              <p>

                                <i className="fa fa-map-marker" />

                                {" "}

                                {
                                  item.address
                                }

                                <br />

                                {
                                  item.city
                                },

                                {" "}

                                {
                                  item.state
                                }

                                {" "}

                                {
                                  item.zip
                                }

                              </p>

                            </div>

                          </div>

                        </div>

                      </div>
                    )
                  )
              }

            </section>

          </div>

        </section>

      </div>

      {/* ========================================= */}
      {/* MODAL */}
      {/* ========================================= */}

      {
        showModal && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              backgroundColor:
                "rgba(0,0,0,0.6)",
              zIndex: 999999,
              overflowY: "auto",
              padding: "30px 0"
            }}
          >

            <div
              style={{
                width: "90%",
                maxWidth: "950px",
                margin: "0 auto",
                background: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.3)"
              }}
            >

              {/* HEADER */}

              <div
                style={{
                  padding: "20px",
                  borderBottom:
                    "1px solid #eee",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center"
                }}
              >

                <div>

                  <h3
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: 600
                    }}
                  >
                    Create Service Location
                  </h3>

                </div>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  ✕
                </button>

              </div>

              {/* BODY */}

              <div
                style={{
                  padding: "25px"
                }}
              >

                {/* LOCATION */}

                <div className="form-group">

                  <label>
                    Service Location Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="locationName"
                    value={
                      formData.locationName
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {/* ACCOUNT */}

                <div className="form-group">

                  <label>
                    Account
                  </label>

                  <select
                    className="form-control"
                    value={
                      formData.account
                    }
                    onChange={
                      handleAccountChange
                    }
                  >

                    <option value="">
                      Select Account
                    </option>

                    {
                      accounts.map(
                        (
                          item: any
                        ) => (

                          <option
                            key={item._id}
                            value={item._id}
                          >
                            {
                              item.account_name
                            }
                          </option>
                        )
                      )
                    }

                  </select>

                </div>

                {/* COMPANY */}

                <div className="form-group">

                  <label>
                    Company
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    value={
                      formData.company
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {/* CONTACT */}

                <div className="row">

                  <div className="col-md-6">

                    <div className="form-group">

                      <label>
                        First Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={
                          formData.first_name
                        }
                        readOnly
                      />

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="form-group">

                      <label>
                        Last Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={
                          formData.last_name
                        }
                        readOnly
                      />

                    </div>

                  </div>

                </div>

                {/* EMAIL PHONE */}

                <div className="row">

                  <div className="col-md-6">

                    <div className="form-group">

                      <label>
                        Email
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={
                          formData.email
                        }
                        readOnly
                      />

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="form-group">

                      <label>
                        Phone
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={
                          formData.phone
                        }
                        readOnly
                      />

                    </div>

                  </div>

                </div>

                {/* ADDRESS */}

                <div className="form-group">

                  <label>
                    Street Address
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="street"
                    value={
                      formData.street
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="row">

                  <div className="col-md-4">

                    <div className="form-group">

                      <label>
                        City
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={
                          formData.city
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="form-group">

                      <label>
                        State
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={
                          formData.state
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="form-group">

                      <label>
                        ZIP
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="zip"
                        value={
                          formData.zip
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                  </div>

                </div>

                {/* NOTES */}

                <div className="form-group">

                  <label>
                    Notes
                  </label>

                  <textarea
                    className="form-control"
                    rows={4}
                    name="notes"
                    value={
                      formData.notes
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>

              {/* FOOTER */}

              <div
                style={{
                  padding: "20px",
                  borderTop:
                    "1px solid #eee",
                  textAlign: "right"
                }}
              >

                <button
                  className="btn btn-default"
                  onClick={() =>
                    setShowModal(false)
                  }
                  style={{
                    marginRight:
                      "10px"
                  }}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-warning"
                  onClick={
                    createLocation
                  }
                  disabled={loading}
                >
                  {
                    loading
                      ? "Creating..."
                      : "Create Location"
                  }
                </button>

              </div>

            </div>

          </div>
        )
      }

    </>
  )
}