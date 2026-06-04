"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function Page() {

  const [roles, setRoles] = useState<any[]>([]);
  const [orgs, setOrgs] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role_id: "",
    password: "",
    organization_id:""
  });

  // roles load
  useEffect(() => {


    loadRoles();
    loadOrgs();

  }, []);


    const loadRoles = async () => {
      const res = await api.get("/v1/roles");
      setRoles(res.data.data);
    };
    const loadOrgs = async () => {
      const res = await api.get("/v1/getOrg");
      setOrgs(res.data.data);
    };

  const handleChange = (e:any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e:any) => {

    e.preventDefault();

    try {

      await api.post("/v1/users", form);

      alert("User created successfully");

      setForm({
        name:"",
        email:"",
        role_id:"",
        password:"",
        organization_id:""
      });

    } catch (error:any) {

      alert(error.response?.data?.message || "Error creating user");

    }

  };

  return ( 
   
    <section className="content">

      <div className="box">

        <div className="box-header with-border">

          <h3 className="box-title">+ Create users</h3>

          <p>
            Set each teammate's role. Admins manage everything. Dispatch Managers
            schedule and assign jobs. Billing Managers handle invoices and
            payments. Customer Service Managers manage service locations and
            customers. Technical Support Managers can help across tools but
            cannot delete users or change Admins.
          </p>

          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool"
              data-widget="collapse"
              data-toggle="tooltip"
              title="Collapse"
            >
              <i className="fa fa-minus" />
            </button> 
          </div>

        </div>

        <div className="box-body">

          <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-xs-4 form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-xs-4 form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-xs-4 form-group">
              <label>Role</label>

              <select
                name="role_id"
                className="form-control"
                value={form.role_id}
                onChange={handleChange}
              >

                <option>Select Role</option>

                {roles.map((role:any)=>(
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}

              </select>

            </div>

            <div className="col-xs-4 form-group">
              <label>Organization</label>

              <select
                name="organization_id"
                className="form-control"
                value={form.organization_id}
                onChange={handleChange}
              >

                <option>Select Role</option>

                {orgs.map((org:any)=>(
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))}

              </select>

            </div>

            <div className="col-xs-4 form-group">
              <label>Password</label>
              <input
                type="text"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="col-xs-">
            <button
              type="submit"
              className="btn btn-primary"
            >
              <i className="fa fa-plus" /> Create User
            </button>
          </div>

          </form>

        </div>

        <div className="box-footer">Footer</div>

      </div>

    </section>
  );
}
