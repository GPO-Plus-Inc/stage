"use client";

import React, {
  useState,
  useEffect,
} from "react";
import axios from "@/lib/axios";


export default function InventoryLocations() {
 const [csvFile, setCsvFile] =
  useState<File | null>(null);

const [locations, setLocations] =
  useState<any[]>([]);

const [editingId, setEditingId] =
  useState("");

const [formData, setFormData] =
  useState({
    name: "",
    type: "Warehouse",
    description: "",
  });



const fetchLocations =
  async () => {
    try {
      const res =
        await axios.get(
          "/v1/inventoryLocationGet"
        );

      setLocations(
        res.data.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  fetchLocations();
}, []);

const createLocation =
  async () => {
    try {
      if (!formData.name)
        return;

      const payload = {
        name: formData.name,
        type: formData.type,
        description:
          formData.description,
      };

      if (editingId) {
        await axios.put(
          `/v1/inventoryLocationUpdate/${editingId}`,
          payload
        );
      } else {
        await axios.post(
          "/v1/inventoryLocationAdd",
          payload
        );
      }

      setFormData({
        name: "",
        type: "Warehouse",
        description: "",
      });

      setEditingId("");

      fetchLocations();
    } catch (error) {
      console.log(error);
    }
  };

  const editLocation = (
  location: any
) => {
  setEditingId(
    location._id
  );

  setFormData({
    name:
      location.name || "",
    type:
      location.type ||
      "Warehouse",
    description:
      location.description ||
      "",
  });
};

const deleteLocation =
  async (id: string) => {
    if (
      !window.confirm(
        "Delete location?"
      )
    )
      return;

    await axios.delete(
      `/v1/inventoryLocationDel/${id}`
    );

    fetchLocations();
  };


  const archiveLocation =
  async (id: string) => {
    await axios.put(
      `/v1/inventoryLocationArchive/${id}`
    );

    fetchLocations();
  };



const importCSV =
  async () => {
    if (!csvFile) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      csvFile
    );

    await axios.post(
      "/v1/inventory-locations/import",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    fetchLocations();
  };


 

  return (
    <div className="">
      <div className="box-header with-border">
        <h3 className="box-title">
          Inventory Locations
        </h3>

        <div className="pull-right">
          <button className="btn btn-default">
            Transfer Stock
          </button>
        </div>
      </div>

      <div className="box-body">
        {/* CSV Import */}

        <div className="">
          <div className="box-body">
            <h4
              style={{
                marginTop: 0,
                marginBottom: 10,
              }}
            >
              Multi-location CSV import
            </h4>

            <p
              className="text-muted"
              style={{
                marginBottom: 15,
              }}
            >
              Upload a CSV with
              columns:
              location,sku,on_hand
              (or qty). Location
              matches by name.
            </p>

            <div className="row">
              <div className="col-md-3">
                <input
                  type="file"
                  className="form-control"
                  accept=".csv"
                  onChange={(e) =>
                    setCsvFile(
                      e.target
                        .files?.[0] ||
                        null
                    )
                  }
                />
              </div>

              <div className="col-md-2">
               <button
  className="btn btn-default btn-block"
  onClick={importCSV}
>
  Import CSV
</button>
              </div>
            </div>
          </div>
        </div>

        {/* Create Location */}

        <div
          className="row"
          style={{
            marginTop: 15,
          }}
        >
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name (e.g., Main Warehouse)"
              value={
                formData.name
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-control"
              value={
                formData.type
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type:
                    e.target.value,
                })
              }
            >
              <option>
                Warehouse
              </option>

              <option>
                Vehicle
              </option>

              <option>
                Trailer
              </option>

              <option>
                Storage Unit
              </option>
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description (optional)"
              value={
                formData.description
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-primary btn-block"
              onClick={
                createLocation
              }
            >
              Create Location
            </button>
          </div>
        </div>

        {/* Locations */}

        <div
          style={{
            marginTop: 20,
          }}
        >
          {locations.length ===
          0 ? (
            <p
              className="text-muted"
              style={{
                marginBottom: 0,
              }}
            >
              No locations yet.
              Create your first
              warehouse or
              vehicle above.
            </p>
          ) : (
            <table className="table table-bordered table-hover">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th style={{ width: 180 }}>
        Actions
      </th>
    </tr>
  </thead>

  <tbody>
    {locations.map(
      (location) => (
        <tr
          key={
            location._id
          }
        >
          <td>
            {location.name}
          </td>

          <td>
            {location.type}
          </td>

          <td>
            {
              location.description
            }
          </td>

          <td>
            <button
              className="btn btn-primary btn-xs"
              onClick={() =>
                editLocation(
                  location
                )
              }
            >
              Edit
            </button>

            {" "}

            <button
              className="btn btn-warning btn-xs"
              onClick={() =>
                archiveLocation(
                  location._id
                )
              }
            >
              Archive
            </button>

            {" "}

            <button
              className="btn btn-danger btn-xs"
              onClick={() =>
                deleteLocation(
                  location._id
                )
              }
            >
              Delete
            </button>
          </td>
        </tr>
      )
    )}
  </tbody>
</table>
          )}
        </div>
      </div>
    </div>
  );
}