import React, { useContext } from "react";
import { HiHashtag } from "react-icons/hi";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { LuShapes } from "react-icons/lu";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const QuickCreate = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="flex flex-row pt-4 pb-2 pl-6 text-[14px] items-center ">
        <ul
          className={`  ${
            theme == "dark" ? "text-white" : "text-gray-800"
          } flex flex-row space-x-3 items-center `}
        >
          <li className="font-medium tracking-wide text-blue-800 text-[16px] cursor-pointer">
            All Content
          </li>
          <li className="cursor-pointer  font-medium hover:text-gray-700 text-[15px]">
            Posts
          </li>
          <li className="cursor-pointer font-medium hover:text-gray-700 text-[15px]">
            Hashtags
          </li>
          <li className="cursor-pointer font-medium hover:text-gray-700 text-[15px]">
            Captions
          </li>
        </ul>
      </div>
      <hr className=" border-t border-gray-300 mx-5" />
      <div
        className={` grid grid-cols-2 lg:grid-cols-3 max-md:gap-4 md:gap-6 px-4 py-4 h-auto `}
      >
        <div
          className={`  ${
            theme == "dark"
              ? "text-white bg-[#171717]"
              : "text-black bg-[#dde6ff]"
          }  max-md:p-4 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-400 `}
        >
          <div className="p-2 mb-2 rounded-3xl bg-[#efeefa] w-fit">
            <LuShapes color="blue" size={18} />
          </div>
          <ul className="p-1.5">
            <li className="text-[13px] font-semibold ">Quick Create</li>
            <li className="text-lg font-medium tracking-wide">Social Post</li>
            <li
              className={` text-[13px] ${
                theme == "dark" ? "text-gray-300" : "text-gray-600"
              } `}
            >
              Generate engaging post for your social media
            </li>
          </ul>
          <Link to="/generate">
            <button
              type="button"
              className="p-2 mt-2.5 rounded-md bg-blue-600 text-white text-[13px] cursor-pointer relative font-medium"
            >
              Generate
            </button>
          </Link>
        </div>

        <div
          className={`  ${
            theme == "dark"
              ? "text-white bg-[#171717]"
              : "text-black bg-[#dde6ff]"
          }  max-md:p-4 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-400 `}
        >
          <div className="p-2 mb-2 rounded-3xl bg-[#efeefa] w-fit">
            <LuShapes color="blue" size={18} />
          </div>
          <ul className="p-1.5">
            <li className="text-[13px] font-semibold ">Quick Create</li>
            <li className="text-lg font-medium tracking-wide">
              Images for your post
            </li>
            <li
              className={` text-[13px] ${
                theme == "dark" ? "text-gray-300" : "text-gray-600"
              } `}
            >
              Create Compelling Images That Convert your thoughts into visual
              graphics
            </li>
          </ul>
          <Link to="/image">
            <button
              type="button"
              className="p-1.5 mt-2.5 rounded-md bg-blue-600 text-white text-[13px] cursor-pointer relative font-medium"
            >
              Generate Image
            </button>
          </Link>
        </div>

        <div
          className={`  ${
            theme == "dark"
              ? "text-white bg-[#171717]"
              : "text-black bg-[#dde6ff]"
          }   max-md:p-4 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-400 `}
        >
          <div className="p-2 mb-2 rounded-3xl bg-[#efeefa] w-fit">
            <LuShapes color="blue" size={18} />
          </div>
          <ul className="p-1.5">
            <li className="text-[13px] font-semibold ">Quick Create</li>
            <li className="text-lg font-medium tracking-wide">Captions</li>
            <li
              className={` text-[13px] ${
                theme == "dark" ? "text-gray-300" : "text-gray-600"
              } `}
            >
              Create Compelling Captions That Convert
            </li>
          </ul>
          <button
            type="button"
            className="p-1.5 mt-2.5 rounded-md bg-blue-600 text-white  text-[13px] cursor-pointer relative font-medium "
          >
            Write Captions
          </button>
        </div>
      </div>
    </>
  );
};

export default QuickCreate;
