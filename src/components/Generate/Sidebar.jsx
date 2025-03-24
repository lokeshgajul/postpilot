import React, { useContext } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { ThemeContext } from "../../context/ThemeContext";
const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="">
      <div
        className={`  ${
          theme == "dark" ? "text-white" : "text-black"
        } pb-4 flex flex-row items-center space-x-1 `}
      >
        <span>
          <IoCreateOutline size={20} />
        </span>
        <h2 className={`font-medium text-left text-lg tracking-wide `}>
          PostPilot
        </h2>
      </div>
      <div className="">
        <ul
          className={`${
            theme == "dark" ? "text-white" : "text-black"
          } space-y-4 `}
        >
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
