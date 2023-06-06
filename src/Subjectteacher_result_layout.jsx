import React from 'react'
import Navbar from "./navbar";
import SearchBar_Result from './searchbar_result';
import Dropdown_Result from './dropdown_result';
import Table_Result from './table_result';
import Logo from "../src/images/rcms_logo_small.jpg";

export default function Subjectteacher_report_layout() {
  return (
    <>
    <Navbar />
    <div className="flex flex-row">
      <div className="h-screen w-54 bg-slate-200">
        <div className="h-20 w-{10rem} bg-slate-50">
          <img src={Logo} alt="Image" className="w-50 h-50 object-cover" />
        </div>
      </div>
      <div className="flex h-screen w-full flex-col">
        <SearchBar_Result />
        <Dropdown_Result />
        <Table_Result />
      </div>
    </div>
  </>
  )
}
