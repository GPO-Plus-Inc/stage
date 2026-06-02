"use client"
import React, { useState,useEffect } from 'react'
import AccountsList from "@/component/accounts/accountList"
import AccountGroup from "@/component/accounts/accountGroup"
import api from "@/lib/axios"

export default function Page() {

  const [showModal, setShowModal] = useState(false)

  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)

  // =========================================
  // GET ACCOUNTS
  // =========================================

  const getAccounts = async () => {
    try {

      setLoading(true)

      const response = await api.get(
        "/v1/getacc"
      )

      setAccounts(response.data.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // DELETE ACCOUNT
  // =========================================

  const deleteAccount = async (id: string) => {
    try {

      const confirmDelete = confirm(
        "Are you sure you want to delete this account?"
      )

      if (!confirmDelete) return

      await api.delete(
        `/v1/accounts/delete/${id}`
      )

      getAccounts()

    } catch (error) {

      console.log(error)
    }
  }

  // =========================================
  // USE EFFECT
  // =========================================

  useEffect(() => {
    getAccounts()
  }, [])


  return (
    <>
      <div className="content-wrapper">

        {/* Content Header */}
        <section className="content-header">
          <h1>Accounts</h1>

          <p>
            Manage customers, billing details, and the contacts that apply across service locations.
          </p>

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

            <div className="box-body">

              <div className="pull-right box-tools">

                <button
                  className="btn btn-warning"
                  onClick={() => setShowModal(true)}
                >
                  + Create Account
                </button>{" "}

                <button className="btn btn-warning">
                  + Refresh
                </button>

              </div>

            </div>

          </div>

          {/* Main Row */}
          <div className="row">

            <section className="pull-left col-md-3">

              <div className="box border rounded shadow-sm bg-white">

                <div className="box-body">
                
        <h4 
        >
          Account Groups
        </h4>
                  <AccountGroup
                  accounts={accounts}/>
                </div>

              </div>

            </section>

            <section className="pull-left col-md-9">

              <div className="box border rounded shadow-sm bg-white">

                <div className="box-body">
                  <AccountsList
                  accounts={accounts}/>
                </div>

              </div>

            </section>

          </div>

        </section>

      </div>

      {/* Modal */}
     {/* Modal */}
{
  showModal && (
    <div
      className="modal fade in"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
        overflowY: "auto"
      }}
    >
      <div className="modal-dialog modal-lg">

        <div className="modal-content">

          {/* Header */}
          <div className="modal-header">

            <button
              type="button"
              className="close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h4 className="modal-title">
              Create Account
            </h4>

            <p className="text-muted" style={{ marginTop: "10px" }}>
              Contacts are edited here and shown read-only on Service Locations.
            </p>

          </div>

          {/* Body */}
          <div className="modal-body">

            {/* Account Details */}
            <h4 className="mb-3">Account Details</h4>

            <div className="row">

              <div className="col-md-6">
                <div className="form-group">
                  <label>Account Name</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Acme Corp"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Parent Account (optional)</label>

                  <select className="form-control">
                    <option>— None —</option>
                    <option>Parent Account 1</option>
                    <option>Parent Account 2</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="row">

              <div className="col-md-6">
                <div className="form-group">
                  <label>Price List (optional)</label>

                  <select className="form-control">
                    <option>— None —</option>
                    <option>Standard Pricing</option>
                    <option>Premium Pricing</option>
                  </select>

                  <small className="text-muted">
                    If this customer has special pricing, set it here.
                  </small>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Notes</label>

                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Billing instructions, approvals, preferred contact method, etc."
                  />
                </div>
              </div>

            </div>

            <hr />

            {/* Primary Contact */}
            <h4>Primary Contact</h4>

            <div className="row">

              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., John"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Smith"
                  />
                </div>
              </div>

            </div>

            <div className="row">

              <div className="col-md-6">
                <div className="form-group">
                  <label>Company</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Acme Billing Dept"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="billing@acme.com"
                  />
                </div>
              </div>

            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="text"
                className="form-control"
                placeholder="(555) 123-4567"
              />
            </div>

            <hr />

            {/* Secondary Contact */}
            <h4>
              Secondary Contact <small>(optional)</small>
            </h4>

            <div className="row">

              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Jane"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Doe"
                  />
                </div>
              </div>

            </div>

            <div className="row">

              <div className="col-md-6">
                <div className="form-group">
                  <label>Company</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Acme Ops"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="ops@acme.com"
                  />
                </div>
              </div>

            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="text"
                className="form-control"
                placeholder="(555) 987-6543"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer">

            <button
              className="btn btn-default"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            <button className="btn btn-warning">
              Create Account
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}
    </>
  )
}