import React from 'react'

export default function Page() {
	return ( 
	 
    <section className="content">

      {/* Default box */}
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Company Information</h3>
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
        {/* /.box-body */} 
 
  <div className="box-body">
    <div className="row ">
      <div className="col-xs-5 form-group">
      <label>Company Name</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>Email</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>Phone</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>Address</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>City</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>State</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>Zip</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>Billing Contact</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>Billing Contact Email</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>Website URL</label>
        <input type="text" className="form-control"/>
      </div>
    </div>
  </div>
</div>
</div>



      <div className="box box-info">
  <div className="box-header">
    <h3 className="box-title">
      Color & Time Picker
    </h3>
  </div>
  <div className="box-body">
    {/* Color Picker */}
    <div className="col-xs-4  form-group">
      <label>
        Header Color
      </label>
      <input type="color" className="form-control my-colorpicker1 colorpicker-element" />
    </div>

    <div className="col-xs-4 form-group">
      <label>
        Accent Color
      </label>
      <input type="color" className="form-control my-colorpicker1 colorpicker-element" />
    </div>

    <div className="col-xs-4 form-group">
      <label>
        Navigation Color
      </label>
      <input type="color" className="form-control my-colorpicker1 colorpicker-element" />
      <small>Used for the active page underline and text in the top navigation</small>
    </div>

    <div className="col-xs-4 form-group">
                  <label htmlFor="exampleInputFile">Logo</label>
                  <input type="file" id="exampleInputFile"/>
 
                </div>
    	</div> 
		</div>


      {/* Default box */}
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Numbering Sequences</h3>
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
        {/* /.box-body */} 
 
  <div className="box-body">
    <div className="row ">
      <div className="col-xs-5 form-group">
      <label>Estimate Prefix</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>Next Estimate #</label>
        <input type="text" className="form-control"/>
      </div>
      <div className="col-xs-5 form-group">
      <label>Quote Prefix</label>
        <input type="text" className="form-control"/>
        <small>Numbers are padded to 6 digits automatically (e.g., E-000123).</small>
      </div>
      <div className="col-xs-5 form-group">
      <label>Next Quote #</label>
        <input type="text" className="form-control"/>
      </div>
      
    </div>
  </div>
</div>
</div>
 		
 		<div className="box">
        <div className="box-header with-border">
         <h3 className="box-title">Tax Presets</h3>
          <div className="box-tools pull-right">
            <button
              className="btn btn-primary" 
            >
              <i className="fa fa-plus" /> Add Preset
            </button>
            </div>
        	</div>
        	
        	<div className="box-body">
        	<p>No presets yet. Click Add Preset to create one.</p>
            <p>These presets appear in the Tax Presets dropdown when creating Estimates and Quotes.</p>
          
        </div>
        </div>
      {/* /.box */}
    </section>
	)
}