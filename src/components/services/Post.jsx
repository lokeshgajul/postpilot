import React, { useState } from "react";
import axios from "axios";

const Post = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  const storePost = async (e) => {
    // console.log("fetching ");
    e.preventDefault();
    setLoading(true);
    setPost("");
    try {
      const response = await axios.post("http://localhost:3000/savePost", {
        title,
        post,
      });
      const data = response.data;
      setPost(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={storePost} className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post here..."
          className="w-full p-2 border rounded"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default Post;
