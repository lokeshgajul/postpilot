import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { IoRefreshSharp } from "react-icons/io5";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Create = () => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");

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
            <p className="bg-gray-200 p-2 rounded-lg text-[14px] font-medium">
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
            <div className="mt-2 p-3 text-[14px] font-medium  rounded-lg max-w-full">
              {loading ? (
                <Skeleton count={10} />
              ) : post ? (
                <div
                  className="text-[16px] bg-gray-200 text-gray-800 leading-8 p-3 rounded-lg "
                  dangerouslySetInnerHTML={{ __html: post }} // Render HTML content safely
                />
              ) : (
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
                  dolorum necessitatibus deserunt ratione obcaecati id eos! Aut
                  voluptatibus placeat unde labore, consequatur itaque quis
                  voluptatum quam tenetur veritatis vitae quidem laudantium.
                  Sunt vel corporis exercitationem perspiciatis asperiores hic
                  similique ea amet quo omnis fugit, vero dolores veritatis
                  nemo, fugiat rerum! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Culpa ut reprehenderit labore corporis
                  provident temporibus impedit quod quo? Molestiae nam mollitia
                  autem necessitatibus animi enim quasi, voluptates excepturi
                  quis minus cupiditate quod consectetur maxime labore ad neque
                  non deserunt at totam aliquam eius. Facilis ad quis aliquam
                  eveniet dicta voluptas, esse sunt, voluptatem placeat quam
                  harum quae fugiat saepe voluptates expedita vel accusantium?
                  Officiis odit debitis nihil numquam reiciendis quae maiores
                  exercitationem, quam nulla eum. Architecto a explicabo
                  officiis, hic sequi facere illo quam est suscipit soluta
                  quidem labore debitis excepturi, in minus quod voluptate
                  tempora repellendus dolor iure sunt. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Harum vel expedita
                  asperiores dolorem dolore quibusdam. Provident sed optio
                  aspernatur doloribus officiis deleniti illum iusto suscipit
                  corporis quas, beatae nulla vel sunt ab sit doloremque fuga.
                  Fuga nam iusto voluptates quam, voluptatum fugiat?
                  Dignissimos, est nam porro saepe corporis maiores incidunt
                  voluptates. Eum maxime sequi corporis fuga nemo minima magnam
                  assumenda omnis non id quidem alias dolore similique ad saepe
                  veniam ut sit possimus expedita voluptate, aspernatur tempora
                  praesentium itaque officiis. Cupiditate atque minima quo,
                  repudiandae enim labore unde ea? Quas accusantium quia nostrum
                  minus atque sit sed aperiam alias incidunt.
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
        <div className="fixed bottom-0 w-2/3 flex justify-center items-center p-3 ">
          <div className="p-1.5 rounded-full bg-gray-200 flex items-center w-full z-10">
            <input
              type="text"
              name="search"
              id="search"
              value={prompt}
              onChange={handlePrompt}
              className="w-full pl-2 py-2  rounded-lg focus:outline-none"
              placeholder="Generate a post..."
            />
            <button
              className="p-1.5 rounded-full cursor-pointer"
              onClick={handleRequest}
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
