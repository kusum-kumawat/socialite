# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

bg-color: #242424;
dark-bg-color : #121212

  <label htmlFor="avatar" className="custom-file-input">
          Browse a profile image
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleFileChange}
          />
    </label>

    import React, { useState, createRef, useEffect } from "react";

import Cropper from "react-cropper";
import axios from "axios"
import LoadingSpinner from "../utils/LoadingSpinner";
import "cropperjs/dist/cropper.css";
import { MdCropFree } from "react-icons/md";
import "./../../src/demo.css";

const defaultSrc =
"https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const CreatePostModal = () => {
const [image, setImage] = useState(null);
const [cropData, setCropData] = useState(null);
const cropperRef = createRef();
const [isOptionOPen, setIsOptionOpen] = useState(false);
const [isCaptionOpen, setIsCaptionOpen] = useState(false);
const [isLoading,setIsLoading] = useState(false)
const [message, setMessage] = useState("")

const onChange = (e) => {
e.preventDefault();
let files;
if (e.dataTransfer) {
files = e.dataTransfer.files;
} else if (e.target) {
files = e.target.files;
}
const reader = new FileReader();
reader.onload = () => {
setImage(reader.result);
};
reader.readAsDataURL(files[0]);
};

const handleOnClick = (ratio) => {
cropperRef.current?.cropper.setAspectRatio(ratio),
getCropData(),
setIsOptionOpen(false);
};

const getCropData = () => {
if (typeof cropperRef.current?.cropper !== "undefined") {
// cropperRef.current?.cropper?.options.initialAspectRatio;
console.log(cropperRef.current?.cropper);

      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      console.log(cropData);
    }

};

const handleSubmit = async (event) => {
event.preventDefault();
setIsLoading(true);

    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    // formData.append("post", cropData);

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
      setIsLoading(false);
      setImage(null); // Clear preview after upload
      // setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error uploading image!");
    }

};

const handleCrop = (data) => {
// Update cropped image data in FormData
const croppedBlob = data.getCroppedCanvas().toBlob();
formData.set('post', croppedBlob, image); // Replace existing image data
};

return (
<div className="flex flex-row">
<div className="z-30 bg-secondary rounded-lg">
<div className="flex justify-around">
<h2 className="text-center text-lg p-2">Create Post</h2>
{image && (
<button
onClick={() => {
setIsCaptionOpen(true);
}} >
Next
</button>
)}
</div>
<div style={{ width: "100%" }}>
{console.log(image)}
{image && (
<Cropper
ref={cropperRef}
className="fixed h-10 w-5 z-40"
// zoomTo={0.5}
onCrop={handleCrop}
initialAspectRatio={1}
preview=".img-preview"
src={image}
viewMode={1}
minCropBoxHeight={10}
minCropBoxWidth={10}
background={false}
responsive={true}
autoCropArea={1}
checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
guides={true}
/>
)}
{/_ {image && getCropData()} _/}
</div>
<div>
<div className="h-96 w-96 z-40 flex">
<div className="img-preview m-auto h-full w-full object-fill" />
</div>
{/_ <div
className="box"
style={{ width: "50%", float: "right", height: "300px" }} >
<img style={{ width: "100%" }} src={cropData} alt="cropped" />
</div> _/}
</div>

        {image && (
          <button
            className="fixed bottom-2 m-2 bg-mbd p-1 rounded-md text-lg"
            onClick={() => {
              setIsOptionOpen(true);
            }}
          >
            <MdCropFree />
          </button>
        )}

        {isOptionOPen && (
          <div className="flex flex-col bg-mbd rounded-lg fixed left-0 bottom-12 m-2">
            <button
              className="m-2"
              onClick={() => {
                handleOnClick(1);
              }}
            >
              square
            </button>
            <button
              className="m-2"
              onClick={() => {
                handleOnClick(4 / 5);
              }}
            >
              potrat
            </button>
            <button
              className="m-2"
              id="landscape"
              onClick={() => {
                handleOnClick(16 / 9);
              }}
            >
              landscape
            </button>
          </div>
        )}
        {/* <input type="file" className="float-end" onChange={onChange} /> */}
        {!image && (
          <label
            htmlFor="imageUpload"
            className="cursor-pointer rounded-lg m-auto bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 text-center"
          >
            <input
              type="file"
              id="imageUpload"
              name="image"
              onChange={onChange}
              className="hidden"
            />
            {image ? (
              <span className="font-medium text-gray-700">
                Selected: {image.name}
              </span>
            ) : (
              <span className="text-sm font-medium text-gray-700">
                Upload Image
              </span>
            )}
          </label>
        )}

        {/* <br style={{ clear: "both" }} /> */}
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-secondary shadow-md z-20 transform transition-all duration-500 ease-in-out ${
          isCaptionOpen ? "translate-x-full" : "-translate-x-0"
        }`}
      >
        <h2>write caption</h2>
        {isLoading && <LoadingSpinner/> }
       <button onClick={handleSubmit}>share</button>
      </div>
    </div>

);
};

export default CreatePostModal;
