"use client";
import React, {
  useState,
  useEffect,
} from "react";

import axios from "@/lib/axios";

interface Asset {
  id: number;
  assetTag: string;
  type: string;
  make: string;
  model: string;
  serial: string;
  status: string;
  location: string;
  photo?: string;
}

export default function JobsiteAssets() {
const [showModal, setShowModal] =
  useState(false);

const [assets, setAssets] =
  useState<any[]>([]);

const [serviceLocations, setServiceLocations] =
  useState<any[]>([]);

const [editingId, setEditingId] =
  useState("");

const [formData, setFormData] =
  useState({
    assetTag: "",
    type: "",
    make: "",
    model: "",
    serial: "",
    location: "",
    sku: "",
  });

  const fetchAssets =
  async () => {
    try {
      const res = await axios.get(
        "/v1/assetGet"
      );

      setAssets(
        res.data.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

const fetchServiceLocations =
  async () => {
    try {
      const res = await axios.get(
        "/v1/getServiceLocation"
      );

      setServiceLocations(
        res.data.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  fetchAssets();
  fetchServiceLocations();
}, []);

const saveAsset =
  async () => {
    try {
      const payload = {
        assetTag:
          formData.assetTag,
        type: formData.type,
        make: formData.make,
        model: formData.model,
        serial:
          formData.serial,
        serviceLocation:
          formData.location ||
          null,
      };

      if (editingId) {
        await axios.put(
          `/v1/assetUpdate/${editingId}`,
          payload
        );
      } else {
        await axios.post(
          "/v1/assetAdd",
          payload
        );
      }

      resetForm();
      fetchAssets();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editAsset = (
  asset: any
) => {
  setEditingId(asset._id);

  setFormData({
    assetTag:
      asset.assetTag || "",
    type: asset.type || "",
    make: asset.make || "",
    model: asset.model || "",
    serial:
      asset.serial || "",
    location:
      asset.serviceLocation
        ?._id || "",
    sku: "",
  });

  setShowModal(true);
};

const deleteAsset =
  async (id: string) => {
    if (
      !window.confirm(
        "Delete Asset?"
      )
    )
      return;

    await axios.delete(
      `/v1/assetDel/${id}`
    );

    fetchAssets();
  };

  const archiveAsset =
  async (id: string) => {
    await axios.put(
      `/v1/assetArchive/${id}`
    );

    fetchAssets();
  };

  const resetForm = () => {
  setEditingId("");

  setFormData({
    assetTag: "",
    type: "",
    make: "",
    model: "",
    serial: "",
    location: "",
    sku: "",
  });
};

  const createAsset = () => {
    setAssets([
      {
        id: Date.now(),
        assetTag:
          formData.assetTag ||
          "ASSET TAG",
        type:
          formData.type ||
          "ASSET TYPE",
        make:
          formData.make ||
          "ASSET MAKE",
        model:
          formData.model ||
          "ASSET MODEL",
        serial:
          formData.serial ||
          "ASSET SERIAL",
        status: "in_field",
        location:
          formData.location ||
          "Unassigned",
      },
      ...assets,
    ]);

    setShowModal(false);

    setFormData({
      assetTag: "",
      type: "",
      make: "",
      model: "",
      serial: "",
      location: "",
      sku: "",
    });
  };

  return (
    <>
      {/* Header */}

      <div className="row">
        <div className="col-md-6">
          <h3>Jobsite Assets</h3>
        </div>

        <div className="col-md-6 text-right">
          <button
            className="btn btn-success"
            onClick={() =>
              setShowModal(true)
            }
          >
            <i className="fa fa-plus"></i>{" "}
            New Asset
          </button>
        </div>
      </div>

      <br />

      {/* Asset Cards */}

      <div className="row">
        {assets.map((asset) => (
          <div
            className="col-md-4"
            key={asset._id}
          >
            <div className="box box-primary">
              <div className="box-body">
                <h4
                  style={{
                    marginTop: 0,
                    fontWeight: 600,
                  }}
                >
                  {asset.assetTag}
                </h4>

                <p className="text-muted">
                  {asset.type} •{" "}
                  {asset.make} •{" "}
                  {asset.model}
                </p>

                <p>
                  <strong>SN:</strong>{" "}
                  {asset.serial}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  <span className="label label-success">
                    {asset.status}
                  </span>
                </p>

                <div className="form-group">
                  <select className="form-control input-sm">
                   {/* <option>
                      Unassigned
                    </option>
                    <option>
                      Store #85
                    </option>*/}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Linked Item
                  </label>

                  <input
                    type="text"
                    className="form-control input-sm"
                    placeholder="Search item by name or SKU"
                  />
                </div>

                <div className="form-group">
                  <label className="btn btn-default btn-sm">
                    <i className="fa fa-camera"></i>{" "}
                    Add Photo

                    <input
                      type="file"
                      hidden
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}

      {showModal && (
        <>
          <div
            className="modal fade in"
            style={{
              display: "block",
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
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
    ? "Edit Asset"
    : "Create Asset"}
</h4>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label>
                      Asset Tag
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={
                        formData.assetTag
                      }
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          {
                            ...formData,
                            assetTag:
                              e
                                .target
                                .value,
                          }
                        )
                      }
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Type
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          value={
                            formData.type
                          }
                          onChange={(
                            e
                          ) =>
                            setFormData(
                              {
                                ...formData,
                                type: e
                                  .target
                                  .value,
                              }
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Make
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          value={
                            formData.make
                          }
                          onChange={(
                            e
                          ) =>
                            setFormData(
                              {
                                ...formData,
                                make: e
                                  .target
                                  .value,
                              }
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Model
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          value={
                            formData.model
                          }
                          onChange={(
                            e
                          ) =>
                            setFormData(
                              {
                                ...formData,
                                model: e
                                  .target
                                  .value,
                              }
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Serial #
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          value={
                            formData.serial
                          }
                          onChange={(
                            e
                          ) =>
                            setFormData(
                              {
                                ...formData,
                                serial:
                                  e
                                    .target
                                    .value,
                              }
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Assign to
                      Service
                      Location
                      (optional)
                    </label>

                    <select
  className="form-control"
  value={formData.location}
  onChange={(e) =>
    setFormData({
      ...formData,
      location:
        e.target.value,
    })
  }
>
  <option value="">
    Select Location
  </option>

  {serviceLocations.map(
    (location: any) => (
      <option
        key={location._id}
        value={location._id}
      >
        {location.location_name}
      </option>
    )
  )}
</select>
                  </div>

                  <div className="form-group">
                    <label>
                      Inventory
                      SKU
                      (optional)
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by SKU or Item Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Asset Photo
                    </label>

                    <input
                      type="file"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
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
                    className="btn btn-primary"
                    onClick={saveAsset}
                  >
                    Save Asset
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