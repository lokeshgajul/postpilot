import React, { useContext } from "react";
import "tailwindcss";
import { MdOutlineDashboard } from "react-icons/md";
import { LuLayoutTemplate } from "react-icons/lu";
import { MdHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import { TbMessageChatbot } from "react-icons/tb";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <div className="">
      <div className="p-4 items-center ">
        <div className="flex flex-row justify-between items-center">
          <ul className="flex flex-row items-center space-x-4 text-[15px] font-medium tracking-wider cursor-pointer">
            <div className="flex flex-row items-center space-x-1">
              <TbMessageChatbot size={24} />
              <h1 class="text-[17.5px] tracking-wider font-bold ">PostPilot</h1>
            </div>
            <section className="flex flex-row items-center space-x-2 max-sm:hidden">
              <span className="flex flex-row items-center space-x-1   hover:text-gray-800">
                <MdOutlineDashboard size={17} />
                <li className="">Dashboard</li>
              </span>

              <span className="flex flex-row items-center space-x-1  hover:text-gray-800">
                <LuLayoutTemplate size={17} />
                <li className="">Templates</li>
              </span>
              <span className="flex flex-row items-center space-x-1  hover:text-gray-800">
                <MdHistory size={19} />
                <li className="">History</li>
              </span>
            </section>
          </ul>
          <ul className="flex flex-row space-x-3 items-center font-medium ">
            <li className="cursor-pointer">
              <Link
                to="/generate"
                className="bg-blue-600 p-1.5 text-white text-[14px] rounded-sm cursor-pointer shadow-md shadow-blue-400 hover:shadow-lg  transition-all duration-200"
              >
                Generate New
              </Link>
            </li>
            <li
              onClick={logoutUser}
              className="cursor-pointer hover:text-gray-700 text-[13.5px] text-gray-800 max-sm:hidden"
            >
              logoutUser
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-400 opacity-75" />
    </div>
  );
};

export default Navbar;
