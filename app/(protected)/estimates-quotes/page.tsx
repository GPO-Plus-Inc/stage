import React from 'react'
import EstimatesForm from "@/component/estimate-quotes/EstimateForm"
import QuotesForm from "@/component/estimate-quotes/QuotesForm"

export default function Adminpage() {
	return ( 
			 <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
      <h1>
        Estimates & Quotes
      </h1>
      <ol className="breadcrumb">
        <li>
          <a href="#">
            <i className="fa fa-dashboard" /> Home
          </a>
        </li>
        <li>
          <a href="#">Examples</a>
        </li>
        <li className="active">Blank page</li>
      </ol>
    </section>
    {/* Main content */}
    <section className="content">







        {/* /.box-body */}

<div className="row">
<EstimatesForm/>
<QuotesForm/>
</div> 
</section>
</div> 
	)
}