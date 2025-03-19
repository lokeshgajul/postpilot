import React, { useContext } from "react";
import { HiHashtag } from "react-icons/hi";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { LuShapes } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "../../context/AuthContext";
import { Menu, Button } from "@material-tailwind/react";
import { ThemeContext } from "../../context/ThemeContext";

const Recent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div className="py-2 px-6">
        <h2
          className={` text-xl font-medium tracking-wide pb-2 ${
            theme == "dark" ? "text-white" : "text-black"
          } `}
        >
          Recent Generations
        </h2>

        <div
          className={`${
            theme == "dark" ? "bg-[#171717] text-white" : "bg-[#f0eeff]"
          } p-3  mt-2 rounded-lg flex flex-row items-center space-x-3`}
        >
          <div>
            <LuShapes color="blue" size={18} />
          </div>
          <div>
            <span>Summer Fashion collection Post</span>
            <p
              className={` text-gray-600 text-sm pt-0.5 ${
                theme == "dark" ? "text-white" : "text-black"
              } `}
            >
              Generated 2 hours ago
            </p>
          </div>
        </div>
        <div
          className={`${
            theme == "dark" ? "bg-[#171717] text-white" : "bg-[#f0eeff]"
          } p-3  mt-2 rounded-lg flex flex-row items-center space-x-3`}
        >
          <div>
            <HiHashtag color="blue" size={18} />
          </div>
          <div>
            <span>Travel Photography Hashtags</span>
            <p
              className={` text-gray-600 text-sm pt-0.5 ${
                theme == "dark" ? "text-white" : "text-black"
              } `}
            >
              Generated 2 hours ago
            </p>
          </div>
        </div>
        <div
          className={`${
            theme == "dark" ? "bg-[#171717] text-white" : "bg-[#f0eeff]"
          } p-3  mt-2 rounded-lg flex flex-row items-center space-x-3`}
        >
          <div>
            <BiSolidQuoteAltRight color="blue" size={18} />
          </div>
          <div className={` ${theme == "dark" ? "text-white" : "text-black"}`}>
            <span>Food Blog Caption</span>
            <p
              className={` text-gray-600 text-sm pt-0.5 ${
                theme == "dark" ? "text-white" : "text-black"
              } `}
            >
              Generated 2 days ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recent;
