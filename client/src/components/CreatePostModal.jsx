import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../utils/LoadingSpinner";

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isCaptionOpen, setIsCaptionOpen] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [caption, setCaption] = useState("");

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  // Cleanup function for the image preview URL
  useEffect(() => {
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
    if (event.target.files[0].type === "video/mp4") {
      setIsVideo(true);
    }

    // Create image preview URL if possible
    if (event.target.files[0]) {
      setLoading(true);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(reader.result);

        setLoading(false);
      };
      reader.onerror = () => {
        setError("Error creating image preview.");
        setLoading(false);
      };
      const result = reader.readAsDataURL(event.target.files[0]);
      console.log(result);
    } else {
      setImageUrl(null);
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!selectedImage) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("post", selectedImage);
    formData.append("caption", caption);

    try {
      const response = await axios.post(
        "/api/v1/users/create-posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(null); // Clear preview after upload
      // setMessage(response.data.message);
    } catch (error) {
      alert(error);
      setMessage("Error uploading image!");
    } finally {
      setLoading(false);
      setIsCaptionOpen(false);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="z-30 bg-secondary rounded-lg">
        <div className="flex justify-around">
          <h1 className="text-lg text-center ">Create a Post</h1>
          {imageUrl && (
            <button
              className="text-indigo-400 text-lg"
              onClick={() => setIsCaptionOpen(!isCaptionOpen)}
            >
              Next
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col p-2">
          {imageUrl && !loading && !isVideo && (
            <img
              src={imageUrl}
              alt="Selected image"
              className="w-96 h-96 object-cover rounded-lg "
            />
          )}
          {isVideo && !loading && (
            <div className="h-96">
              <video className="object-cover h-96 w-96" src={imageUrl}></video>
            </div>
          )}

          {loading && (
            <div role="status" className="w-96 h-96">
              <LoadingSpinner />
            </div>
          )}

          {!imageUrl && (
            <div className="text-9xl flex flex-col justify-center w-96 h-96 items-center">
              <img
                src="../../src/assets/createPostImage.png"
                alt="create post"
              />
              <h2 className="text-lg">Select image from computer</h2>
            </div>
          )}

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {!imageUrl && (
            <label
              htmlFor="imageUpload"
              className="cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 text-center"
            >
              <input
                type="file"
                id="imageUpload"
                name="image"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedImage ? (
                <span className="font-medium text-gray-700">
                  Selected: {selectedImage.name}
                </span>
              ) : (
                <span className="text-sm font-medium text-gray-700">
                  Upload Image
                </span>
              )}
            </label>
          )}

          {/* {/* Success/error message after upload */}
          {message && <p className="mt-4 text-sm">{message}</p>}
        </form>
      </div>
      {!loading && (
        <div
          className={`fixed top-0 right-0 h-full p-2 w-80 bg-secondary shadow-md z-20 transform transition-all duration-500 ease-in-out ${
            isCaptionOpen ? "translate-x-full" : "-translate-x-0"
          }`}
        >
          <h2>Write Caption</h2>
          <textarea
            name="caption"
            id="caption"
            className="block w-full bg-secondary p-2 mt-3 h-2/4"
            placeholder="Add a caption....."
            onChange={handleCaptionChange}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="p-2 m-5 bg-indigo-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase  hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 fixed bottom-0 w-3/4"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
