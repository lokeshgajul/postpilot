import React from "react";
import { IoCreateOutline } from "react-icons/io5";
const Sidebar = () => {
  return (
    <div className="">
      <div className="pb-4 flex flex-row items-center space-x-1">
        <span>
          <IoCreateOutline size={20} />
        </span>
        <h2 className="font-medium text-lg tracking-wide">PostPilot</h2>
      </div>
      <div className="">
        <ul className="space-y-4">
          <li>Recent Generations </li>
          <li>Recent Generations </li>
          <li>Recent Generations </li>
          <li>Recent Generations </li>
          <li>Recent Generations </li>
          <li>Recent Generations </li>
          <li>Recent Generations </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
