import React, { useContext, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { IoRefreshSharp } from "react-icons/io5";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { ThemeContext } from "../../context/ThemeContext";
import { FaRegFileImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Generate = () => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // const getPrompt = async () => {
  //   console.log("fetching ");

  //   setLoading(true);
  //   setPost("");
  //   try {
  //     const response = await axios.get("http://localhost:3000/getPrompt");
  //     const data = response.data;
  //     setPost(data.message);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handlePrompt = (e) => {
    setPrompt(e.target.value);
    console.log(e.target.value);
  };

  const getPrompt = async () => {
    console.log("fetching ");

    setLoading(true);
    setPost("");
    try {
      const response = await axios.post("http://localhost:3000/getPrompt", {
        prompt,
      });
      const data = response.data;
      setPost(data.message);

      await storePost(prompt, data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const storePost = async (prompt, text) => {
    // console.log("fetching ");

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/uploadPost", {
        prompt,
        text,
      });
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = () => {
    setSubmittedPrompt(prompt);
    getPrompt();
    setPrompt("");
  };

  return (
    <>
      {/* Page Container */}
      <div className="h-[calc(100vh-150px)] overflow-y-auto">
        <div className="flex flex-col justify-center items-center p-12">
          <h1
            className={` ${
              theme == "dark" ? "text-white" : "text-black"
            } text-2xl capitalize font-medium tracking-wide `}
          >
            Welcome to PostPilot
          </h1>
          <p
            className={` ${
              theme == "dark" ? "text-white" : "text-black"
            } text-lg text-gray-600 text-center mt-2 `}
          >
            Create AI-powered posts, captions, and hashtags in seconds. Just
            type your idea and let PostPilot do the rest!
          </p>
        </div>

        {/* Scrollable Result Container */}
        <div className="flex flex-col justify-start items-center px-6 ">
          <div className="flex justify-end w-full">
            <p
              className={` ${
                theme == "dark"
                  ? "bg-[#313131] text-white tracking-wider"
                  : "bg-gray-200"
              }  p-2 rounded-lg text-[14px] `}
            >
              {post ? (
                <p className="font-medium tracking-wide text-[15px]">
                  {submittedPrompt}
                </p>
              ) : (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                  odio mollitia ad ex magni illum.
                </p>
              )}
            </p>
          </div>

          {/* Generated Post / Result */}
          <div className="flex justify-end flex-col w-full z-0">
            <div
              className={`
              } mt-6 p-3 text-[14px] font-medium  rounded-lg max-w-full `}
            >
              {loading ? (
                <Skeleton count={10} />
              ) : post ? (
                <div
                  className={` ${
                    theme == "dark"
                      ? "bg-[#313131] text-white tracking-wider"
                      : "bg-gray-200"
                  } text-[16px] bg-gray-200 text-gray-800 leading-8 p-3 rounded-lg `}
                  dangerouslySetInnerHTML={{ __html: post }} // Render HTML content safely
                />
              ) : (
                <p
                  className={` ${
                    theme == "dark" ? "text-white" : "text-black"
                  } leading-7 tracking-wider `}
                ></p>
              )}
            </div>

            {/* Copy & Refresh Icons */}
            <div className="mt-6 pb-8 flex flex-row justify-end items-end space-x-4 mr-3">
              <span className="cursor-pointer">
                <MdContentCopy
                  size={20}
                  color={`${theme == "dark" ? "white" : "black"}`}
                />
              </span>
              <span className="cursor-pointer">
                <IoRefreshSharp
                  size={20}
                  color={`${theme == "dark" ? "white" : "black"}`}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Input at Bottom */}
      <div className="flex justify-center items-center ">
        <div className="fixed bottom-3 w-2/3 flex justify-center items-center p-3 ">
          <div
            className={`  ${
              theme == "dark" ? "bg-[#313131] tracking-wider" : "bg-gray-200"
            } p-1.5 rounded-full flex items-center w-full z-10 `}
          >
            <div className="pl-2.5 cursor-pointer" onClick={navigate}>
              <FaRegFileImage
                size={18}
                color={`${theme == "dark" ? "white" : "black"}`}
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={prompt}
              onChange={handlePrompt}
              className={` ${
                theme == "dark"
                  ? "text-white placeholder:text-gray-300"
                  : "text-black"
              } w-full pl-2 py-2  rounded-lg focus:outline-none tracking-normal `}
              placeholder="Generate a post..."
            />
            <button
              className="p-1.5 rounded-full cursor-pointer"
              onClick={handleRequest}
            >
              <IoMdSend
                size={22}
                color={`${theme == "dark" ? "white" : "black"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generate;
