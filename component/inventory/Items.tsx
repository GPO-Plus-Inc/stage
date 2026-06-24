"use client";

import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";

export default function Items() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

const [editingId, setEditingId] = useState<string | null>(null);
const handleEdit = (item: any) => {
  setEditingId(item._id);

  setFormData({
    name: item.name || "",
    sku: item.sku || "",
    barcode: item.barcode || "",
    barcodeType: item.barcodeType || "UPC",
    description: item.description || "",
    unitPrice: item.unitPrice || "",
    quantityOnHand: item.quantityOnHand || "",
    costOfGoodsSold: item.costOfGoodsSold || "",
    preferredVendor: item.preferredVendor || "",
    reorderPoint: item.reorderPoint || "",
    maxQuantity: item.maxQuantity || "",
    incomeAccount: item.incomeAccount || "",
    assetAccount: item.assetAccount || "",
    expenseAccount: item.expenseAccount || "",
    testFieldLabel:
      item?.customFields?.testFieldLabel || "",
  });

  setActiveModal("addItem");
};

  const [formData, setFormData] = useState({
  name: "",
  sku: "",
  barcode: "",
  barcodeType: "UPC",
  description: "",
  unitPrice: "",
  quantityOnHand: "",
  costOfGoodsSold: "",
  preferredVendor: "",
  reorderPoint: "",
  maxQuantity: "",
  incomeAccount: "",
  assetAccount: "",
  expenseAccount: "",
  testFieldLabel: "",
});

  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement |
    HTMLSelectElement
  >
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSaveItem = async () => {
  try {
    const payload = {
      ...formData,
      customFields: {
        testFieldLabel:
          formData.testFieldLabel,
      },
    };

    let response;

    if (editingId) {
      response = await axios.put(
        `/v1/inventoryUpdate/${editingId}`,
        payload
      );
      alert("Succefully Update !!")
    } else {
      response = await axios.post(
        "/v1/inventoryAdd",
        payload
      );
    }

    if (response.data.success) {
      await getInventoryData();

      setActiveModal(null);

      setEditingId(null);

      setFormData({
        name: "",
        sku: "",
        barcode: "",
        barcodeType: "UPC",
        description: "",
        unitPrice: "",
        quantityOnHand: "",
        costOfGoodsSold: "",
        preferredVendor: "",
        reorderPoint: "",
        maxQuantity: "",
        incomeAccount: "",
        assetAccount: "",
        expenseAccount: "",
        testFieldLabel: "",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const handleArchive = async (
  id: string
) => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to archive this item?"
    );

    if (!confirmed) return;

    await axios.put(
      `/v1/inventoryArchive/${id}`
    );

    await getInventoryData();
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = async (
  id: string
) => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    await axios.delete(
      `/v1/inventoryDelete/${id}`
    );

    await getInventoryData();
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  getInventoryData();
}, []);

  const getInventoryData = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      "/v1/inventoryGet"
    );

    if (response.data.success) {
      setData(response.data.data || []);
    }
  } catch (error) {
    console.error("Get Inventory Error:", error);
  } finally {
    setLoading(false);
  }
};

  const modalTitle = () => {
    switch (activeModal) {
      case "customFields":
        return "Custom Fields Management";

      case "addItem":
        return "Add Inventory Item";

      default:
        return "";
    }
  };

  const modalContent = () => {
    switch (activeModal) {
      case "customFields":
  return (
    <>
      <div className="row"> 
        <div className="col-md-12">   
        <h4>Add Custom Field </h4>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>
              Field Label <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="e.g., Serial Number"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>
              Field Type <span className="text-danger">*</span>
            </label>

            <select className="form-control">
              <option>Text</option>
              <option>Textarea</option>
              <option>Number</option>
              <option>Date</option>
              <option>Checkbox</option>
              <option>Dropdown</option>
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label>Field Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Auto-generated from label"
            />

            <small className="text-muted">
              Used internally. Leave blank to
              auto-generate.
            </small>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label>
              QuickBooks Field Mapping
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="e.g., CustomField1"
            />

            <small className="text-muted">
              QuickBooks custom field ID for sync
            </small>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Sort Order</label>

            <input
              type="number"
              className="form-control"
              defaultValue={0}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="form-group"
            style={{ marginTop: "30px" }}
          >
            <div className="checkbox">
              <label>
                <input type="checkbox" />
                {" "}Required
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );

    case "addItem":
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
             name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter item name"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="form-group">
          <label>SKU</label>
          <input
            type="text"  
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter SKU"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="form-group">
          <label>Barcode</label>
          <input
            type="text"
              name="barcode"
  value={formData.barcode}
  onChange={handleChange}
            className="form-control"
            placeholder="Scan or enter barcode"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="form-group">
          <label>Barcode Type</label>
          <select 
            name="barcodeType"
  value={formData.barcodeType}
  onChange={handleChange}
          className="form-control">
            <option value="UPC">UPC</option>
            <option value="EAN">EAN</option>
            <option value="Code128">Code128</option>
            <option value="QR Code">QR Code</option>
          </select>
        </div>
      </div>

      <div className="col-md-12">
        <div className="form-group">
          <label>Description</label>
          <textarea

            name="description"
  value={formData.description}
  onChange={handleChange}
            className="form-control"
            rows={3}
          />
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>Unit Price</label>
          <input
            type="number"
            name="unitPrice"
  value={formData.unitPrice}
  onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>Quantity on Hand</label>
          <input
            type="number"

            name="quantityOnHand"
  value={formData.quantityOnHand }
  onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>Cost of Goods Sold</label>
          <input
            type="number"

            name="costOfGoodsSold"
  value={formData.costOfGoodsSold}
  onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>Preferred Vendor</label>
          <input
            type="text"

            name="preferredVendor"
  value={formData.preferredVendor}
  onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>Reorder Point</label>
          <input
            type="number"

            name="reorderPoint"
  value={formData.reorderPoint}
  onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>Max Quantity</label>
          <input
            type="number"
            name="maxQuantity"
  value={formData.maxQuantity}
  onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="col-md-12">
        <h4
          style={{
            marginTop: "20px",
            marginBottom: "15px",
          }}
        >
          QuickBooks Accounts
        </h4>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>Income Account</label>
          <input 
            type="text"
            name="incomeAccount"
  value={formData.incomeAccount}
  onChange={handleChange}
          className="form-control"/>
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>Asset Account</label>
          <input type="text"
            name="assetAccount"
  value={formData.assetAccount}
  onChange={handleChange} className="form-control"/>
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>Expense Account</label>
          <input type="text"
            name="expenseAccount"
  value={formData.expenseAccount}
  onChange={handleChange} 
  className="form-control"
  />
        </div>
      </div>

      <div className="col-md-12">
        <h4
          style={{
            marginTop: "20px",
            marginBottom: "15px",
          }}
        >
          Custom Fields
        </h4>
      </div>

      <div className="col-md-12">
        <div className="form-group">
          <label>Test filed label</label>
          <input
            type="text"
            name="testFieldLabel"
  value={formData.testFieldLabel}
  onChange={handleChange}
            className="form-control"
            placeholder="Enter value"
          />
        </div>
      </div>


      <div className="col-md-12">
        <div className="form-group">
         
      <button
  type="button"
  className="btn btn-primary pull-right"
  onClick={handleSaveItem}
>
  Save
</button>
        </div>
      </div>
    </div>
  );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Header */}

      <div
        className="row"
        style={{ marginBottom: "20px" }}
      >
        <div className="col-md-6">
          <h2>
            <i
              className="fa fa-cubes"
              style={{
                color: "#3c8dbc",
                marginRight: "10px",
              }}
            />
            Inventory
          </h2>

          <p className="text-muted">
            Manage your inventory items and sync with
            QuickBooks
          </p>
        </div>

        <div
          className="col-md-6 text-right"
          style={{ marginTop: "20px" }}
        >
          <button className="btn btn-primary">
            <i className="fa fa-barcode" /> Barcode
            Scanner
          </button>

          {" "}

          <button
            className="btn btn-default"
            onClick={() =>
              setActiveModal("customFields")
            }
          >
            <i className="fa fa-cog" /> Custom Fields
          </button>

          {" "}

          <button className="btn btn-info">
            <i className="fa fa-refresh" /> Sync
            QuickBooks
          </button>

          {" "}

          <button
            className="btn btn-success"
            onClick={() =>
              setActiveModal("addItem")
            }
          >
            <i className="fa fa-plus" /> Add Item
          </button>
        </div>
      </div>

      {/* Filters */}

      <div
        className="row"
        style={{ marginBottom: "20px" }}
      >
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search items by name, SKU, or description..."
          />
        </div>

        <div className="col-md-2">
          <select className="form-control">
            <option>All Sync Status</option>
            <option>Pending</option>
            <option>Synced</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-default btn-block">
            Demo Batch
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>SKU</th>
              <th>PRICE</th>
              <th>QTY ON HAND</th>
              <th>SYNC STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

         <tbody>
  {loading ? (
    <tr>
      <td colSpan={6} className="text-center">
        Loading...
      </td>
    </tr>
  ) : data.length > 0 ? (
    data.map((item: any) => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.sku}</td>
        <td>
          ${Number(item.unitPrice || 0).toFixed(2)}
        </td>
        <td>{item.quantityOnHand || 0}
         <br />
                  <a href="#">
                    View by location
                  </a>
        </td>
        <td>
          <span className="label label-warning">
            {item.status}
          </span>
        </td>
        <td>
          <a
          className="label label-default pull-left"
          style={{marginRight:"2px",padding:"5px"}}
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handleEdit(item);
  }}
>
  Edit
</a>
<a
  href="#"
  className="label label-default pull-left"
  style={{marginRight:"2px",padding:"5px"}}
  onClick={(e) => {
    e.preventDefault();
    handleArchive(item._id);
  }}
>
  Archive
</a>
<a
className="label label-default pull-left"
style={{marginRight:"2px",padding:"5px"}}
  href="#" 
  onClick={(e) => {
    e.preventDefault();
    handleDelete(item._id);
  }}
>
  Delete
</a>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center">
        No Inventory Found
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>

      {/* Modal */}

      {activeModal && (
        <>
          <div
            className="modal fade in"
            style={{
              display: "block",
              paddingRight: "17px",
              overflowY: "auto",
            }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setActiveModal(null)
                    }
                  >
                    ×
                  </button>

                  <h4 className="modal-title">
                    {modalTitle()}
                  </h4>
                </div>

                <div className="modal-body">
                  {modalContent()}
                </div>

                {/*<div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() =>
                      setActiveModal(null)
                    }
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </div>*/}
              </div>
            </div>

          </div>

          <div className="modal-backdrop fade in"></div>
        </>
      )}
    </>
  );
}