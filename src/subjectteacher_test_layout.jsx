import React from "react";
import Navbar from "./navbar";
import SearchBar from "./searchbar";
import DropdownComponent from "./dropdown";
import Table from "./tables";
import Logo from "../src/images/rcms_logo_small.jpg";

const Subjectteacher_test_layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <div className="h-screen w-56 bg-slate-200">
          <div className="h-20 w-{10rem} bg-slate-50">
            <img src={Logo} alt="Image" className="w-50 h-50 object-cover" />
          </div>
        </div>
        <div className="flex h-screen w-full flex-col">
          <SearchBar />
          <DropdownComponent />
          <Table />
        </div>
      </div>
    </>
  );
};

export default Subjectteacher_test_layout;
