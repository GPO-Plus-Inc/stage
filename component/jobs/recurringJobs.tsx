import React from 'react'

export default function oneTimeJob() {
	return (
		<div>
		    {/* Main content */}
  
  <div className="box-body">
    <div className="col-xs-2  form-group">
     
      <input
        type="text"
        className="form-control"
        placeholder="Search Recurring Jobs"
      />
    </div>
    <div className="col-xs-2 form-group">
 
      <input
        type="text"
        className="form-control"
        placeholder="Search Locations"
      /> 
  </div>
    <div className="col-xs-2 form-group">
     
      <select 
        className="form-control"
      >
      <option>All status</option>
      <option>Pending</option>
      <option>in Progress</option>
      <option>Completed</option>
      </select> 
  </div>
    <div className="col-xs-2 form-group">
      
     <select 
        className="form-control"
      >
      <option>All status</option>
      <option>Pending</option>
      <option>in Progress</option>
      <option>Completed</option>
      </select> 
  </div>
  {/*  <div className="col-xs-2 form-group">
    
     <select
        type="text"
        className="form-control"
      >
      <option>All status</option>
      <option>Pending</option>
      <option>in Progress</option>
      <option>Completed</option>
      </select>  
  </div>*/}
   {/* <div className="col-xs-2 form-group">
       <button className="btn btn-primary">copy Link</button>
      
  </div>*/}
    <div className="col-xs-2 form-group">
        <button className="btn btn-primary">Clear Filters</button>
      
  </div>
</div>
 

            <section className="box">
      <div className="box-body">
            <h4 className="box-title">No Recurring jobs !!</h4>
            </div>
          </section>
			
		</div>
	)
}