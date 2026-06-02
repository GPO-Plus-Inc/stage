import React from 'react'

export default function Page() {
	return ( 
	 
    <section className="content">
      {/* Default box */}
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Integrations</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-box-tool"
              data-widget="collapse"
              data-toggle="tooltip"
              title="Collapse"
            >
              <i className="fa fa-minus" />
            </button>
            <button
              className="btn btn-box-tool"
              data-widget="remove"
              data-toggle="tooltip"
              title="Remove"
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <div className="box-body">Start creating your amazing application!</div>
        {/* /.box-body */}
        <div className="box-footer">Footer</div>
        {/* /.box-footer*/}
      </div>
      {/* /.box */}
    </section>
	)
}