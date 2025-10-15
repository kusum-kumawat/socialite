import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function userAvatar() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      return setError("Please select an image");
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", selectedImage);

      const response = await axios.post(
        "/api/v1/users/upload/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Avatar uploaded successfully:", response.data);
      // Handle successful upload, e.g., clear form, show confirmation message

      return navigate("/");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" h-96 flex justify-center align-center">
      <div className="text-white w-98 flex flex-col h-full">
        <h2> Upload profile picture</h2>
        {!selectedImage && (
          <div className=" m-4 w-48 h-48">
            <img
              src="https://imgs.search.brave.com/P5TdH03B16VO_nZhsULMf_Vd_JsKPGa7e8rhSxoE89s/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg0LzY3LzE5/LzM2MF9GXzg0Njcx/OTM5X2p4eW1vWVpP/OE9lYWNjM0pSQkRF/OGJTWEJXajBaZkE5/LmpwZw"
              alt="create post"
              className="rounded-full"
            />
          </div>
        )}

        {previewImage && (
          <div className="m-4">
            <img
              src={previewImage}
              alt="Preview"
              className="h-48 w-48 rounded-full object-cover"
            />
          </div>
        )}
        <input type="file" onChange={handleImageChange} accept="image/*" />
        {error && <p className="error">{error}</p>}
        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-7 py-2 m-4 rounded-lg bg-indigo-500"
          >
            {isLoading ? "Uploading..." : "Upload Avatar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default userAvatar;
