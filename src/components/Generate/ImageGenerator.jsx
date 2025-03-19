import axios from "axios";
import { useContext, useState } from "react";
import cowImage from "../../assets/cow.png";
import drawingCat from "../../assets/drawing.gif";
import { Menu, Button } from "@material-tailwind/react";
import { ThemeContext } from "../../context/ThemeContext";

const ImageGenerator = () => {
  const [text, setText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [image, setImage] = useState(null);
  const { theme } = useContext(ThemeContext);

  const invokeUrl = "http://localhost:3000/generate-image";

  const generateImage = async () => {
    const payload = {
      text_prompts: [
        {
          text: text,
          weight: 1,
        },
        {
          text: "",
          weight: -1,
        },
      ],
      cfg_scale: 5,
      sampler: "K_EULER_ANCESTRAL",
      seed: 0,
      steps: 25,
    };

    try {
      setGenerating(true);
      setImage(null);
      const res = await axios.post(invokeUrl, payload);

      const imageData = res.data.artifacts[0].base64;

      setImage(`data:image/jpeg;base64,${imageData}`);
      setGenerating(false);
    } catch (error) {
      console.log("this is error: ", error);
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-around mt-8 flex-wrap p-7 relative">
      {/* Left Section */}
      <div className="flex justify-center items-center flex-col md:w-1/2">
        <h3
          className={` text-3xl font-medium leading-10 ${
            theme == "dark" ? "text-white" : "text-black"
          } `}
        >
          Create A powerful AI Art of images easily
        </h3>
        <div className="p-1.5 w-full md:w-[70%] z-10 mt-8">
          <textarea
            name="search"
            id="search"
            onChange={handleInput}
            className={` ${
              theme == "dark"
                ? "bg-[#313131] text-white placeholder:text-gray-300"
                : ""
            } w-full pl-2 py-2 rounded-lg focus:outline-none  text-gray-800 `}
            placeholder="Generate image for your post..."
            rows="4"
          ></textarea>
          <button
            onClick={generateImage}
            className="rounded-lg px-2 py-1.5 mt-2 bg-blue-600 shadow-sm shadow-blue-400 hover:drop-shadow-xl transition-all duration-400 text-white tracking-wide cursor-pointer"
          >
            <span className="text-[15px]">Generate</span>
          </button>
        </div>
      </div>
      {/* Right Section */}
      <div className="mt-16 md:mt-0 flex justify-center items-center md:w-1/2">
        <img
          className="generated-image w-full max-w-md rounded-md"
          src={generating ? drawingCat : image ? image : cowImage}
          alt="Generated Content"
        />
      </div>
    </div>
  );
};

export default ImageGenerator;
