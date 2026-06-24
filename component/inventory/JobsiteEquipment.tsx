"use client";

import React, {
  useEffect,
  useState,
} from "react";
import axios from "@/lib/axios";

interface Photo {
  id: number;
  url: string;
  caption: string;
}

interface Equipment {
  id: number;
  name: string;
  type: string;
  make: string;
  model: string;
  serial: string;
  location: string;
  linkedItem: string;
  photos: Photo[];
}

export default function JobsiteEquipment() {
  const [showModal, setShowModal] =
  useState(false);

  const [serviceLocations, setServiceLocations] =
  useState<any[]>([]);

const [loading, setLoading] =
  useState(false);

const [equipmentList, setEquipmentList] =
  useState<any[]>([]);

const [editingId, setEditingId] =
  useState("");

const [formData, setFormData] =
  useState({
    name: "",
    type: "",
    make: "",
    model: "",
    serial: "",
    location: "",
    sku: "",
  });

  const fetchEquipments =
  async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "/v1/equipmentGet"
      );

      setEquipmentList(
        res.data.data || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchEquipments();
  fetchServiceLocations();
}, []);

const saveEquipment =
  async () => {
    try {
      const payload = {
        name: formData.name,
        type: formData.type,
        make: formData.make,
        model: formData.model,
        serial: formData.serial,
        serviceLocation:
          formData.location || null,
      };

      if (editingId) {
        await axios.put(
          `/v1/equipmentUpdate/${editingId}`,
          payload
        );
      } else {
        await axios.post(
          "/v1/equipmentAdd",
          payload
        );
      }

      resetForm();
      fetchEquipments();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editEquipment = (
  equipment: any
) => {
  setEditingId(
    equipment._id
  );

  setFormData({
    name: equipment.name || "",
    type: equipment.type || "",
    make: equipment.make || "",
    model: equipment.model || "",
    serial:
      equipment.serial || "",
    location:
      equipment.serviceLocation?._id ||
      "",
    sku: "",
  });

  setShowModal(true);
};
const deleteEquipment =
  async (id: string) => {
    if (
      !window.confirm(
        "Delete Equipment?"
      )
    )
      return;

    await axios.delete(
      `/v1/equipmentDel/${id}`
    );

    fetchEquipments();
  };

  const archiveEquipment =
  async (id: string) => {
    await axios.put(
      `/v1/equipmentArchive/${id}`
    );

    fetchEquipments();
  };

  const resetForm = () => {
  setEditingId("");

  setFormData({
    name: "",
    type: "",
    make: "",
    model: "",
    serial: "",
    location: "",
    sku: "",
  });
};

  const handleCreateEquipment = () => {
    const newEquipment: Equipment = {
      id: Date.now(),
      name:
        formData.name || "Equipment",
      type:
        formData.type || "EQP TYPE",
      make:
        formData.make || "EQP MAKE",
      model:
        formData.model || "EQP MODEL",
      serial:
        formData.serial ||
        "EQP SERIAL",
      location:
        formData.location ||
        "[LV Demo] QuickMart - Spring Valley",
      linkedItem: "",
      photos: [],
    };

    setEquipmentList([
      newEquipment,
      ...equipmentList,
    ]);

    setShowModal(false);

    setFormData({
      name: "",
      type: "",
      make: "",
      model: "",
      serial: "",
      location: "",
      sku: "",
    });
  };

const addPhoto = async (
  equipmentId: string,
  file: File
) => {
  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const upload =
    await axios.post(
      "/v1/upload",
      formData
    );

  await axios.post(
    `/v1/equipmentPic/${equipmentId}/photo`,
    {
      url:
        upload.data.url,
      caption: "",
    }
  );

  fetchEquipments();
};

const deletePhoto =
  async (
    equipmentId: string,
    photoId: string
  ) => {
    await axios.delete(
      `/v1/equipmentsPicDel/${equipmentId}/photo/${photoId}`
    );

    fetchEquipments();
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

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <h3>Jobsite Equipment</h3>
        </div>

        <div className="col-md-6 text-right">
          <button
            className="btn btn-success"
            onClick={() =>
              setShowModal(true)
            }
          >
            <i className="fa fa-plus"></i>{" "}
            New Equipment
          </button>
        </div>
      </div>

      <br />

      <div className="row">
        {equipmentList.map(
          (equipment) => (
            <div
              key={equipment._id}
              className="col-md-4"
            >
              <div className="box box-primary">
                <div className="box-body">
                  <h4
                    style={{
                      marginTop: 0,
                    }}
                  >
                    {equipment.name}
                  </h4>

                  <p className="text-muted">
                    {equipment.type} •{" "}
                    {equipment.make} •{" "}
                    {equipment.model}
                  </p>

                  <div className="form-group">
                    <label>
                      Service
                      Location:
                    </label>

                    <div
                      style={{
                        fontWeight:
                          600,
                        marginBottom:
                          5,
                      }}
                    >
                      {
                        equipment.location
                      }
                    </div>

                <select
  className="form-control"
  value={formData.location}
  onChange={(e) =>
    setFormData({
      ...formData,
      location: e.target.value,
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
                      Linked Item
                    </label>

                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="Search item by name or SKU"
                    />
                  </div>

                  <div className="form-group">
                    <label>Photo</label>

                    {equipment.photos.map(
                      (photo:any) => (
                        <div
                          key={
                            photo.id
                          }
                          style={{
                            marginBottom:
                              15,
                          }}
                        >
                          <img
                            src={
                              photo.url
                            }
                            alt=""
                            style={{
                              width:
                                "100%",
                              height:
                                "150px",
                              objectFit:
                                "cover",
                              border:
                                "1px solid #ddd",
                              borderRadius:
                                4,
                            }}
                          />

                          <input
                            type="text"
                            className="form-control input-sm"
                            placeholder="Caption"
                            style={{
                              marginTop:
                                8,
                            }}
                          />

                          <div
                            style={{
                              marginTop:
                                8,
                            }}
                          >
                            <button className="btn btn-success btn-xs">
                              Save
                            </button>

                            {" "}

                            <button className="btn btn-info btn-xs">
                              Identify
                            </button>

                            {" "}

                            <button
                              className="btn btn-danger btn-xs"
                              onClick={() =>
                                deletePhoto(
                                  equipment.id,
                                  photo.id
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    )}

                    <label className="btn btn-default btn-sm">
                      <i className="fa fa-camera"></i>{" "}
                      Add Photo

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(
                          e
                        ) => {
                          const file =
                            e.target
                              .files?.[0];

                          if (
                            file
                          ) {
                            addPhoto(
                              equipment.id,
                              file
                            );
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div
                    style={{
                      background:
                        "#f4f4f4",
                      padding:
                        "10px",
                      borderRadius:
                        4,
                    }}
                  >
                    <strong>
                      SN:{" "}
                      {
                        equipment.serial
                      }
                    </strong>
                  </div>
                  <div
  style={{
    marginTop: 10,
  }}
>
  <button
    className="btn btn-primary btn-xs"
    onClick={() =>
      editEquipment(
        equipment
      )
    }
  >
    Edit
  </button>

  {" "}

  <button
    className="btn btn-warning btn-xs"
    onClick={() =>
      archiveEquipment(
        equipment._id
      )
    }
  >
    Archive
  </button>

  {" "}

  <button
    className="btn btn-danger btn-xs"
    onClick={() =>
      deleteEquipment(
        equipment._id
      )
    }
  >
    Delete
  </button>
</div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

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
    ? "Edit Equipment"
    : "Create Equipment"}
</h4>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label>
                      Name
                    </label>

                    <input
                      className="form-control"
                      value={
                        formData.name
                      }
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          {
                            ...formData,
                            name: e
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
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          {
                            ...formData,
                            location:
                              e
                                .target
                                .value,
                          }
                        )
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
                      className="form-control"
                      placeholder="Search by SKU or Item Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Equipment
                      Photo
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
                   onClick={saveEquipment}>
                    Save
                    Equipment
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