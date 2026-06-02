"use client"

import React from "react"

export default function AccountGroup({
  accounts,
  selectedAccount,
  onSelect,
  onClear
}: any) {

  return (
    <div className="box box-solid border rounded shadow-sm bg-white">

      <div className="box-body ">
 

        {
          accounts?.map(
            (item: any, index: number) => (

              <div key={item._id}>

                <div
                  onClick={() =>
                    onSelect(item)
                  }
                  style={{
                    cursor: "pointer",
                    paddingBottom: "18px"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >

                    <h4
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight:
                          selectedAccount ===
                          item._id
                            ? "700"
                            : "500"
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
                      0
                    </span>

                  </div>

                </div>

                {
                  index !==
                    accounts.length - 1 && (
                    <hr />
                  )
                }

              </div>
            )
          )
        }

        {/* Clear */}
        <button
          className="btn btn-link"
          onClick={onClear}
          style={{
            padding: 0,
            marginTop: "15px"
          }}
        >
          Clear filter
        </button>

      </div>

    </div>
  )
}