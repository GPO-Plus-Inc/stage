"use client";

import React, {
  useEffect,
  useState,
} from "react";
import axios from "@/lib/axios";

export default function Services() {
 const [showModal, setShowModal] =
  useState(false);

const [services, setServices] =
  useState<any[]>([]);

const [categories, setCategories] =
  useState<any[]>([]);

const [editingId, setEditingId] =
  useState("");

const [formData, setFormData] =
  useState({
    name: "",
    category: "",
    price: "",
    description: "",
    instructions: "",
    active: true,
  });

  const fetchServices =
  async () => {
    try {
      const res =
        await axios.get(
          "/v1/serviceGet"
        );

      setServices(
        res.data.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

const fetchCategories =
  async () => {
    try {
      const res =
        await axios.get(
          "/v1/service-categories"
        );

      setCategories(
        res.data.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  fetchServices();
  fetchCategories();
}, []);


const saveService =
  async () => {
    try {
      const payload = {
        name: formData.name,
        category:
          formData.category,
        price: Number(
          formData.price
        ),
        description:
          formData.description,
        specialInstructions:
          formData.instructions,
        active:
          formData.active,
      };

      if (editingId) {
        await axios.put(
          `/v1/serviceUpdate/${editingId}`,
          payload
        );
      } else {
        await axios.post(
          "/v1/serviceAdd",
          payload
        );
      }

      setShowModal(false);

      resetForm();

      fetchServices();
    } catch (error) {
      console.log(error);
    }
  };


  const editService = (
  service: any
) => {
  setEditingId(
    service._id
  );

  setFormData({
    name:
      service.name || "",
    category:
      service.category?._id ||
      "",
    price:
      service.price || "",
    description:
      service.description ||
      "",
    instructions:
      service.specialInstructions ||
      "",
    active:
      service.active,
  });

  setShowModal(true);
};


const deleteService =
  async (id: string) => {
    if (
      !window.confirm(
        "Delete Service?"
      )
    )
      return;

    await axios.delete(
      `/v1/serviceDel/${id}`
    );

    fetchServices();
  };

  const archiveService =
  async (id: string) => {
    await axios.put(
      `/v1/serviceArchive/${id}`
    );

    fetchServices();
  };

  const syncService =
  async (id: string) => {
    await axios.put(
      `/v1/serviceSync/${id}`
    );

    fetchServices();
  };

  const resetForm = () => {
  setEditingId("");

  setFormData({
    name: "",
    category: "",
    price: "",
    description: "",
    instructions: "",
    active: true,
  });
};



  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
      type,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (
              e.target as HTMLInputElement
            ).checked
          : value,
    });
  };

 

  return (
    <>
      <div className="box box-primary">
        <div className="box-header with-border">
          <h3 className="box-title">
            Services
          </h3>

          <div className="pull-right">
            <button className="btn btn-default">
              Show Pending/Error
              {" "}
              <span className="badge">
                0
              </span>
            </button>

            {" "}

            <button
              className="btn btn-default"
              disabled
            >
              Sync Selected (0)
            </button>

            {" "}

            <button
              className="btn btn-default"
              disabled
            >
              Mark Selected
              Pending (0)
            </button>

            {" "}

            <button className="btn btn-default">
              Sync All Pending
            </button>

            {" "}

            <button className="btn btn-default">
              Manage Categories
            </button>

            {" "}

            <button
              className="btn btn-primary"
              onClick={() =>
                setShowModal(true)
              }
            >
              New Service
            </button>
          </div>
        </div>

        <div className="box-body">
          <div
            style={{
              marginBottom: 15,
            }}
          >
            <span className="label label-primary">
              All
            </span>

            {" "}

            <span className="badge">
              23
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={{width:40}}>
                    <input
                      type="checkbox"
                    />
                  </th>

                  <th>Name</th>

                  <th>
                    Category
                  </th>

                  <th>
                    Description
                  </th>

                  <th>Price</th>

                  <th>
                    QBO Status
                  </th>

                  <th>
                    Active
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {services.map(
                  (service) => (
                    <tr
                      key={
                        service._id
                      }
                    >
                      <td>
                        <input
                          type="checkbox"
                        />
                      </td>

                      <td>
                        {
                          service.name
                        }
                      </td>

                     <td>
  {service.category
    ?.name || "-"}
</td>

                      <td>
                        {
                          service.description
                        }
                      </td>

                     <td>
  ${service.price}
</td>

                    <td>
  <span
    className={`label ${
      service.qboStatus ===
      "Synced"
        ? "label-success"
        : "label-warning"
    }`}
  >
    {service.qboStatus}
  </span>
</td>

                      <td>
                        {service.active
                          ? "Yes"
                          : "No"}
                      </td>

<td>
  <a
    href="#"
    className="label label-default"
    onClick={(e) => {
      e.preventDefault();
      syncService(
        service._id
      );
    }}
  >
    Sync to QBO
  </a>

  {" "}

  <a
    href="#"
    className="label label-default"
    onClick={(e) => {
      e.preventDefault();
      editService(
        service
      );
    }}
  >
    Edit
  </a>

  {" "}

  <a
    href="#"
    className="label label-default"
    onClick={(e) => {
      e.preventDefault();
      archiveService(
        service._id
      );
    }}
  >
    Archive
  </a>

  {" "}

  <a
    href="#"
    className="label label-default"
    onClick={(e) => {
      e.preventDefault();
      deleteService(
        service._id
      );
    }}
  >
    Delete
  </a>
</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div
            className="modal fade in"
            style={{
              display: "block",
            }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setShowModal(
                        false
                      )
                    }
                  >
                    ×
                  </button>

                  <h4 className="modal-title">
  {editingId
    ? "Edit Service"
    : "New Service"}
</h4>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label>
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={
                        formData.name
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="e.g. Quarterly Maintenance"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Category
                        </label>

{/*                        <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="form-control"
>
  <option value="">
    Select Category
  </option>

  {categories.map(
    (category: any) => (
      <option
        key={category._id}
        value={category._id}
      >
        {category.name}
      </option>
    )
  )}
</select>
*/}
<select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="form-control"
>
  <option value="">
    Select Category
  </option>
<option value={2}>2</option>
</select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Price
                        </label>

                        <input
                          type="number"
                          name="price"
                          value={
                            formData.price
                          }
                          onChange={
                            handleChange
                          }
                          className="form-control"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Description
                    </label>

                    <textarea
                      rows={4}
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Short explanation for customers"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Special
                      Instructions
                      (optional)
                    </label>

                    <textarea
                      rows={3}
                      name="instructions"
                      value={
                        formData.instructions
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Anything customers should prepare or know"
                    />
                  </div>

                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="active"
                        checked={
                          formData.active
                        }
                        onChange={
                          handleChange
                        }
                      />
                      {" "}
                      Active
                    </label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() =>
                      setShowModal(
                        false
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={
                      saveService
                    }
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade in"></div>
        </>
      )}
    </>
  );
}