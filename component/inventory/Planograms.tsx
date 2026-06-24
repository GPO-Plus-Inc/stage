"use client";

import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";

interface GridCell {
  row: number;
  col: number;
  product: string;
  qty: number;
}

export default function Planograms() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [planograms, setPlanograms] =
  useState<any[]>([]);

const [editingId, setEditingId] =
  useState("");

  const [designerName, setDesignerName] =
    useState("");
  const [
    designerDescription,
    setDesignerDescription,
  ] = useState("");
  const [
    designerImageUrl,
    setDesignerImageUrl,
  ] = useState("");

  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const [showLinkedOnly, setShowLinkedOnly] =
    useState(false);

  const [grid, setGrid] = useState<GridCell[]>(
    []
  );

  const buildGrid = () => {
    const cells: GridCell[] = [];

    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        cells.push({
          row: r,
          col: c,
          product: "",
          qty: 0,
        });
      }
    }

    setGrid(cells);
  };

  const updateProduct = (
    index: number,
    value: string
  ) => {
    const updated = [...grid];
    updated[index].product = value;
    setGrid(updated);
  };

  const updateQty = (
    index: number,
    value: number
  ) => {
    const updated = [...grid];
    updated[index].qty = value;
    setGrid(updated);
  };


  const fetchPlanograms =
  async () => {
    try {
      const res = await axios.get(
        "/v1/planogramGet"
      );

      setPlanograms(
        res.data.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  fetchPlanograms();
}, []);

const savePlanogram =
  async () => {
    try {
      const payload = {
        name,
        description,
        imageUrl,
        designerName,
        designerDescription,
        designerImageUrl,
        rows,
        cols,
        showLinkedOnly,
        grid,
      };

      if (editingId) {
        await axios.put(
          `/v1/planogramUpdate/${editingId}`,
          payload
        );
      } else {
        await axios.post(
          "/v1/planogramAdd",
          payload
        );
      }

      resetForm();

      fetchPlanograms();
    } catch (error) {
      console.log(error);
    }
  };

  const editPlanogram = (
  item: any
) => {
  setEditingId(item._id);

  setName(item.name || "");
  setDescription(
    item.description || ""
  );
  setImageUrl(
    item.imageUrl || ""
  );

  setDesignerName(
    item.designerName || ""
  );

  setDesignerDescription(
    item.designerDescription ||
      ""
  );

  setDesignerImageUrl(
    item.designerImageUrl ||
      ""
  );

  setRows(item.rows || 3);
  setCols(item.cols || 3);

  setGrid(item.grid || []);
};

const deletePlanogram =
  async (id: string) => {
    if (
      !window.confirm(
        "Delete Planogram?"
      )
    )
      return;

    await axios.delete(
      `/v1/planogramDel/${id}`
    );

    fetchPlanograms();
  };

  const archivePlanogram =
  async (id: string) => {
    await axios.put(
      `/v1/planogramArchive/${id}`
    );

    fetchPlanograms();
  };

  const resetForm = () => {
  setEditingId("");

  setName("");
  setDescription("");
  setImageUrl("");

  setDesignerName("");
  setDesignerDescription("");
  setDesignerImageUrl("");

  setRows(3);
  setCols(3);

  setGrid([]);
};

  return (
    <div className="box-body">
      <div className="row">
        <div className="col-md-12">
          <h3>Planograms</h3>
          <p className="text-muted">
            Create and manage shelf layouts,
            product placement and service
            locations.
          </p>
        </div>
      </div>

      {/* Create Planogram */}

      <div className="box box-primary">
        <div className="box-header with-border">
          <h4>Create Planogram</h4>
        </div>

        <div className="box-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Name</label>

                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Description</label>

                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Image URL (optional)
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={imageUrl}
                  onChange={(e) =>
                    setImageUrl(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>

        <button
  className="btn btn-success"
  onClick={savePlanogram}
>
  {editingId
    ? "Update Planogram"
    : "Add Planogram"}
</button>
        </div>
      </div>

      {/* Planogram Designer */}

      <div className="box box-info">
        <div className="box-header with-border">
          <h4>Planogram Designer</h4>
        </div>

        <div className="box-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Name</label>

                <input
                  type="text"
                  className="form-control"
                  value={designerName}
                  onChange={(e) =>
                    setDesignerName(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Description</label>

                <input
                  type="text"
                  className="form-control"
                  value={
                    designerDescription
                  }
                  onChange={(e) =>
                    setDesignerDescription(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Image URL (optional)
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={
                    designerImageUrl
                  }
                  onChange={(e) =>
                    setDesignerImageUrl(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Upload + Grid Controls */}

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Background Image
                </label>

                <input
                  type="file"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label>Rows</label>

                <input
                  type="number"
                  className="form-control"
                  value={rows}
                  min={1}
                  onChange={(e) =>
                    setRows(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label>Columns</label>

                <input
                  type="number"
                  className="form-control"
                  value={cols}
                  min={1}
                  onChange={(e) =>
                    setCols(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={buildGrid}
          >
            Build Grid
          </button>

          <hr />

          {/* Service Location */}

          <div className="form-group">
            <label>
              Assign to Service Location
              (optional)
            </label>

            <select className="form-control">
              <option>
                Select Location
              </option>
            </select>
          </div>

          {/* CSV */}

          <div className="form-group">
            <label>
              Import CSV (columns:
              r,c,product,qty)
            </label>

            <input
              type="file"
              className="form-control"
            />

            <p
              className="text-muted"
              style={{ marginTop: 10 }}
            >
              Auto-links by exact SKU when
              possible
            </p>
          </div>

          {/* Checkbox */}

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={showLinkedOnly}
                onChange={(e) =>
                  setShowLinkedOnly(
                    e.target.checked
                  )
                }
              />
              {" "}Show only linked cells
            </label>
          </div>

          <hr />

          {/* Dynamic Grid */}

          {grid.length > 0 && (
            <>
              <div className="row">
                {grid
                  .filter((cell) =>
                    showLinkedOnly
                      ? cell.product
                      : true
                  )
                  .map(
                    (
                      cell,
                      index
                    ) => (
                      <div
                        key={`${cell.row}-${cell.col}`}
                        className="col-md-4"
                        style={{
                          marginBottom:
                            "15px",
                        }}
                      >
                        <div className="box box-default">
                          <div className="box-header with-border">
                            <strong>
                              Row {cell.row},
                              Col {cell.col}
                            </strong>
                          </div>

                          <div className="box-body">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search product (name or SKU)"
                                value={
                                  cell.product
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateProduct(
                                    index,
                                    e.target
                                      .value
                                  )
                                }
                              />
                            </div>

                            <div className="form-group">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="0"
                                value={
                                  cell.qty
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateQty(
                                    index,
                                    Number(
                                      e
                                        .target
                                        .value
                                    )
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>
<button
  className="btn btn-success"
  onClick={savePlanogram}
>
  {editingId
    ? "Update Planogram"
    : "Save Planogram"}
</button>
            </>
          )}
        </div>
      </div>

      {/* Empty State */}

    <div className="box box-primary">
  <div className="box-header with-border">
    <h4>Planograms List</h4>
  </div>

  <div className="box-body">
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Rows</th>
          <th>Cols</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {planograms.map(
          (item: any) => (
            <tr key={item._id}>
              <td>{item.name}</td>

              <td>
                {item.description}
              </td>

              <td>{item.rows}</td>

              <td>{item.cols}</td>

              <td>
                {item.status}
              </td>

              <td>
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() =>
                    editPlanogram(
                      item
                    )
                  }
                >
                  Edit
                </button>

                {" "}

                <button
                  className="btn btn-xs btn-warning"
                  onClick={() =>
                    archivePlanogram(
                      item._id
                    )
                  }
                >
                  Archive
                </button>

                {" "}

                <button
                  className="btn btn-xs btn-danger"
                  onClick={() =>
                    deletePlanogram(
                      item._id
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
  </div>
</div>
    </div>
  );
}