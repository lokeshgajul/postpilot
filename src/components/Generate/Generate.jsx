import React from "react";
import Sidebar from "./Sidebar";
import Create from "./Create";
const Generate = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      <div className="col-span-1 ">
        <Sidebar />
      </div>
      <div className="col-span-3">
        <Create />
      </div>
    </div>
  );
};

export default Generate;
