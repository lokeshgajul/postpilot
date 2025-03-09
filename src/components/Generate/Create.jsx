import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { IoRefreshSharp } from "react-icons/io5";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Create = () => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  const getPrompt = async () => {
    console.log("fetching ");

    setLoading(true);
    setPost("");
    try {
      const response = await axios.get("http://localhost:3000/getPrompt");
      const data = response.data;
      setPost(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Container */}
      <div className="h-[calc(100vh-150px)] overflow-y-auto">
        <div className="flex flex-col justify-center items-center p-12">
          <h1 className="text-2xl capitalize font-medium tracking-wide">
            Welcome to PostPilot
          </h1>
          <p className="text-lg text-gray-600 text-center mt-2">
            Create AI-powered posts, captions, and hashtags in seconds. Just
            type your idea and let PostPilot do the rest!
          </p>
        </div>

        {/* Scrollable Result Container */}
        <div className="flex flex-col justify-start items-center px-6 ">
          <div className="flex justify-end w-full">
            <p className="bg-gray-200 p-3 rounded-lg text-[14px] font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              odio mollitia ad ex magni illum.
            </p>
          </div>

          {/* Generated Post / Result */}
          <div className="flex justify-end flex-col w-full">
            <div className="mt-4 p-3 text-[14px] font-medium  rounded-lg max-w-full">
              {loading ? (
                <Skeleton count={10} />
              ) : post ? (
                <div
                  className="text-[16px] bg-gray-200 text-gray-700 leading-7 p-3 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: post }} // Render HTML content safely
                />
              ) : (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda molestiae ab quia quasi corporis eligendi...
                </p>
              )}
            </div>

            {/* Copy & Refresh Icons */}
            <div className="mt-6 pb-8 flex flex-row justify-end items-end space-x-4 mr-3">
              <span className="cursor-pointer">
                <MdContentCopy size={20} />
              </span>
              <span className="cursor-pointer">
                <IoRefreshSharp size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Input at Bottom */}
      <div className="flex justify-center items-center ">
        <div className="fixed bottom-0 w-2/3 flex justify-center items-center p-3 bg-white shadow-md">
          <div className="p-2 rounded-full bg-gray-200 flex items-center shadow-md w-[80%]">
            <input
              type="search"
              name="search"
              id="search"
              className="w-full pl-2 py-2  rounded-lg focus:outline-none"
              placeholder="Generate a post..."
            />
            <button
              className="p-1.5 rounded-full cursor-pointer"
              onClick={getPrompt}
            >
              <IoMdSend size={25} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
