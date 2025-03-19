import React, { useContext } from "react";
import "tailwindcss";
import { MdOutlineDashboard } from "react-icons/md";
import { LuLayoutTemplate } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import { TbMessageChatbot } from "react-icons/tb";
import { AuthContext } from "../../context/AuthContext";
import { Menu, Button, MenuItem, MenuContent } from "@material-tailwind/react";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { logoutUser } = useContext(AuthContext);
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <div className="">
      <div
        className={` p-4 items-center ${
          theme == "dark" ? "text-white" : "text-black"
        }`}
      >
        <div className="flex flex-row justify-between items-center">
          <ul className="flex flex-row items-center space-x-4 text-[15px] font-medium tracking-wider cursor-pointer">
            <div className="flex flex-row items-center space-x-1">
              <TbMessageChatbot size={24} />
              <h1 class="text-[17.5px] tracking-wider font-bold font-serif">
                PostPilot
              </h1>
            </div>
            <section className="flex flex-row items-center space-x-2 max-sm:hidden">
              <span className="flex flex-row items-center space-x-1 hover:text-gray-800">
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
          <ul className="flex flex-row space-x-1 items-center font-medium ">
            <li className="cursor-pointer">
              <Link
                to="/generate"
                className="bg-blue-600 p-1.5 text-white text-[14px] rounded-sm cursor-pointer shadow-md shadow-blue-400 hover:shadow-lg  transition-all duration-200"
              >
                Generate New
              </Link>
            </li>

            <div className="flex flex-row justify-center items-center py-1 rounded-md cursor-pointer focus:border-none">
              {/* Show Name with Icon on Laptops and Hide on Mobile */}
              <li className="cursor-pointer hover:text-gray-700 px-2 py-1 rounded-md text-[13.5px] text-gray-800 hidden sm:flex items-center">
                <Menu placement="bottom-start ">
                  <Menu.Trigger
                    as={Button}
                    className={`${
                      theme == "dark" ? "text-white" : "text-black"
                    } bg-transparent p-0 min-w-fit flex items-center gap-2 border-none cursor-pointer focus:outline-none focus:ring-0`}
                  >
                    <CiUser size={25} width={4} />
                    <span
                      className={`${
                        theme == "dark" ? "text-white" : "text-black"
                      } text-gray-800`}
                    >
                      Lokesh
                    </span>
                  </Menu.Trigger>
                  <MenuContent
                    className={` py-4 px-3 bg-[#dde6ff] focus:outline-none focus:ring-0 border-transparent  `}
                  >
                    <MenuItem
                      onClick={logoutUser}
                      className=" cursor-pointer focus:outline-none focus:ring-0 border-none font-serif tracking-wider font-medium"
                    >
                      Logout
                    </MenuItem>
                    <MenuItem
                      onClick={toggleTheme}
                      className="mt-1.5 cursor-pointer focus:outline-none focus:ring-0 border-none font-serif tracking-wider font-medium"
                    >
                      Dark Theme
                    </MenuItem>
                  </MenuContent>
                </Menu>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <hr className="border-gray-400 opacity-75" />
    </div>
  );
};

export default Navbar;
