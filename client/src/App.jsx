// import { useState } from "react";

// function App() {
//   const [isImage1, setIsImage1] = useState(true);

//   const toggleImage = () => {
//     setIsImage1(!isImage1);
//   };

//   return (
//     <div className="relative">
//       <img
//         src={
//           isImage1
//             ? "https://imgs.search.brave.com/mqTKZyhJeZU8sFb3-M3WuWPs5D5Y_u4Yz0PC2Y1qpHI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWRpZ2l0YWxhZ2Vu/Y3kuY29tLmF1L3dw/LWNvbnRlbnQvdXBs/b2Fkcy9uZXctSW5z/dGFncmFtLWxvZ28t/cG5nLWZ1bGwtY29s/b3VyLWdseXBoLW1l/ZGl1bS1zaXplLTQ1/MC1waXhlbHMucG5n"
//             : "https://imgs.search.brave.com/50y9KmPZMUS7uyeOnpfBRMHyOXs8LIxyisIDzIA-JP4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9JbnN0YWdy/YW0vSW5zdGFncmFt/LVdvcmRtYXJrLUxv/Z28ud2luZS5zdmc.svg"
//         }
//         alt="Image"
//         className="w-8 h-8 animate-ping duration-500 ease-in-out"
//       />
//       <button onClick={toggleImage} className="absolute bottom-2 text-white right-2">
//         Change Image
//       </button>
//     </div>
//   );

// const [isOpen, setIsOpen] = useState(false);
// const [isSearchOpen, setIsSearchOpen] = useState(false);

// const toggleSidebar = () => {
//   setIsOpen(!isOpen);
// };

// return (
//   <div className="flex h-screen flex-col">
//     <header class="flex items-center justify-between px-4 py-2 bg-white shadow-md">
//       <div class="flex items-center space-x-4">
//         <img src="logo.png" alt="App logo" class="h-8 w-8" />
//         <h1 class="text-2xl font-bold">Social App</h1>
//       </div>
//       <button
//         class="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? "Close" : "Menu"}
//       </button>
//     </header>
//     <main class="flex-grow">
//       <nav
//         class={`fixed top-0 left-0 h-full w-64 bg-black shadow-md transform transition-all duration-200 ease-in-out ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <ul class="flex flex-col pt-4 space-y-2">
//           <li class="px-4 py-2 rounded-md hover:bg-gray-200">
//             <a href="#">Home</a>
//           </li>
//           <li class="px-4 py-2 rounded-md hover:bg-gray-200">
//             <button
//               className="text-white"
//               onClick={() => {
//                 setIsSearchOpen(!isSearchOpen);
//               }}
//             >
//               Search
//             </button>
//           </li>
//           <li class="px-4 py-2 rounded-md hover:bg-gray-200">
//             <a href="#">Explore</a>
//           </li>
//           <li class="px-4 py-2 rounded-md hover:bg-gray-200">
//             <a href="#">Reels</a>
//           </li>
//           <li class="px-4 py-2 rounded-md hover:bg-gray-200">
//             <a href="#">Messages</a>
//           </li>
//           <li class="px-4 py-2 rounded-md hover:bg-gray-200">
//             <a href="#">Notifications</a>
//           </li>
//           <li class="px-4 py-2 rounded-md hover:bg-gray-200">
//             <a href="#">Profile</a>
//           </li>
//           <li class="px-4 py-2 rounded-md hover:bg-gray-200">
//             <a href="#">More</a>
//           </li>
//         </ul>
//       </nav>
//       <div
//         class={`fixed top-0 left-0 h-full w-64 bg-black shadow-md transform transition-all duration-500 ease-in-out ${
//           isSearchOpen ? "translate-x-64" : "-translate-x-full"
//         }`}
//       >
//         <input type="text" placeholder="Search" />
//       </div>
//       <div class="ml-64 p-4 text-white">
//         <h2>main content</h2>
//       </div>
//     </main>
//   </div>
// );
// }

// ---------------------------------------------------------------------------------------------

// import React from "react";

// function App() {
//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex flex-raw items-center mt-10">
//         <img
//           className="w-40 h-40 rounded-full object-cover mb-4"
//           src="https://placeholder.com/150"
//           alt="Profile picture"
//         />
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-2">Vaishu</h1>
//           <button className="btn btn-primary mt-4">Edit Profile</button>
//           <button className="btn btn-secondary mt-2">View Archive</button>
//           <p className="text-gray-500">0 posts • 0 followers • 1 following</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mt-8">
//         <div className="bg-gray-100 p-4 rounded-md text-center">
//           <h3 className="font-bold">POSTS</h3>
//           <p className="text-gray-500">0</p>
//         </div>
//         <div className="bg-gray-100 p-4 rounded-md text-center">
//           <h3 className="font-bold">SAVED</h3>
//           <p className="text-gray-500">0</p>
//         </div>
//         <div className="bg-gray-100 p-4 rounded-md text-center">
//           <h3 className="font-bold">TAGGED</h3>
//           <p className="text-gray-500">0</p>
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Share Photos</h2>
//         <p className="text-gray-500 mb-4">
//           When you share photos, they will appear on your profile.
//         </p>
//         <button className="btn btn-primary">Share your first photo</button>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';

// const App = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = (event) => {
//     event.preventDefault();

//     // Handle your file upload logic here:
//     // - Send the selectedFile to your backend using Axios or Fetch
//     // - Implement progress tracking, error handling, and success messages

//     setSelectedFile(null); // Clear selected file after upload
//   };

//   return (
//     <form onSubmit={handleUpload}>
//       <label htmlFor="upload-image" className="block cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 text-center">

//         <input
//           type="file"
//           id="upload-image"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//         {selectedFile ? (
//           <span className="font-medium">Selected: {selectedFile.name}</span>
//         ) : (
//           <span className="text-sm font-medium text-gray-700">Upload Image</span>
//         )}
//       </label>
//       <button type="submit" className="mt-2 btn btn-primary">Upload</button>
//     </form>
//   );
// };

//? ---------------------------------------------  crop image ---------------------------------------

// import React, { useState, createRef, useEffect } from "react";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";
// import "./demo.css";

// const defaultSrc =
//   "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

// const App = () => {
//   const [image, setImage] = useState(null);
//   const [cropData, setCropData] = useState(null);
//   const cropperRef = createRef();

//   const onChange = (e) => {
//     e.preventDefault();
//     let files;
//     if (e.dataTransfer) {
//       files = e.dataTransfer.files;
//     } else if (e.target) {
//       files = e.target.files;
//     }
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImage(reader.result);
//     };
//     reader.readAsDataURL(files[0]);
//   };

//   const handleOnClick = (ratio) => {
//     cropperRef.current?.cropper.setAspectRatio(ratio), getCropData();
//   };

//   const getCropData = () => {
//     if (typeof cropperRef.current?.cropper !== "undefined") {
//       // cropperRef.current?.cropper?.options.initialAspectRatio;
//       console.log(cropperRef.current?.cropper);

//       setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
//     }
//   };

//   return (
//     <div>
//       <div style={{ width: "100%" }}>
//         <input type="file" onChange={onChange} />
//         <button
//           className="m-2"
//           onClick={() => {
//             handleOnClick(1);
//           }}
//         >
//           square
//         </button>
//         <button
//           className="m-2"
//           onClick={() => {
//             handleOnClick(16 / 9);
//           }}
//         >
//           potrat
//         </button>
//         <button
//           className="m-2"
//           onClick={() => {
//             handleOnClick(4 / 5);
//           }}
//         >
//           landscape
//         </button>
//         <br />
//         <br />
//         {image && (
//           <Cropper
//             ref={cropperRef}
//             className="h-20 w-20"
//             // zoomTo={0.5}
//             initialAspectRatio={1}
//             preview=".img-preview"
//             src={image}
//             viewMode={1}
//             minCropBoxHeight={10}
//             minCropBoxWidth={10}
//             background={false}
//             responsive={true}
//             autoCropArea={1}
//             checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
//             guides={true}
//           />
//         )}
//         {image && getCropData()}
//       </div>
//       <div>
//         <div className="box" style={{ width: "50%", float: "right" }}>
//           <h1>Preview</h1>
//           <div
//             className="img-preview"
//             style={{ width: "100%", float: "left", height: "300px" }}
//           />
//         </div>
//         {/* <div
//           className="box"
//           style={{ width: "50%", float: "right", height: "300px" }}
//         >
//           <img style={{ width: "100%" }} src={cropData} alt="cropped" />
//         </div> */}
//       </div>
//       <br style={{ clear: "both" }} />
//     </div>
//   );
// };

// ------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import LoadingSpinner from "../utils/LoadingSpinner";

// const CreatePost = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [isCaptionOpen, setIsCaptionOpen] = useState(false);

//   // Cleanup function for the image preview URL
//   useEffect(() => {
//     return () => URL.revokeObjectURL(imageUrl);
//   }, [imageUrl]);

//   const handleFileChange = (event) => {
//     setSelectedImage(event.target.files[0]);
//     console.log(event.target.files[0].type);
//     // Create image preview URL if possible
//     if (event.target.files[0]) {
//       setLoading(true);

//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setImageUrl(reader.result);

//         setLoading(false);
//       };
//       reader.onerror = () => {
//         setError("Error creating image preview.");
//         setLoading(false);
//       };
//       const result = reader.readAsDataURL(event.target.files[0]);
//       console.log(result);
//     } else {
//       setImageUrl(null);
//       setError(null);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!selectedImage) {
//       setError("Please select an image to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("post", selectedImage);

//     try {
//       const response = await axios.post(
//         "/api/v1/users/create-posts",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setLoading(false);
//       setImageUrl(null); // Clear preview after upload
//       // setMessage(response.data.message);
//     } catch (error) {
//       console.error(error);
//       setMessage("Error uploading image!");
//     }
//   };

//   return (
//     <div className="flex flex-row">
//       <div className="z-30 bg-secondary rounded-lg">
//         <h1 className="text-2xl text-center ">Create a Post</h1>
//         <button onClick={() => setIsCaptionOpen(!isCaptionOpen)}>Next</button>
//         <form onSubmit={handleSubmit} className="flex flex-col p-2">
//           {/* Display image preview or loading spinner */}
//           {imageUrl && !loading && (
//             <img
//               src={imageUrl}
//               alt="Selected image"
//               className="w-96 h-96 object-cover rounded-lg "
//             />
//           )}

//           {loading && (
//             <div role="status" className="w-96 h-96">
//             <LoadingSpinner/>
//             </div>
//           )}

//           {!imageUrl && (
//             <div className="text-9xl flex flex-col justify-center w-96 h-96 items-center">
//               <img
//                 src="../../src/assets/createPostImage.png"
//                 alt="create post"
//               />
//             </div>
//           )}
//           <h2 className="text-lg">Select image from computer</h2>

//           {/* Error message */}
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           {/* File upload input */}
//           <label
//             htmlFor="imageUpload"
//             className="cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 text-center"
//           >
//             <input
//               type="file"
//               id="imageUpload"
//               name="image"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//             {selectedImage ? (
//               <span className="font-medium text-gray-700">
//                 Selected: {selectedImage.name}
//               </span>
//             ) : (
//               <span className="text-sm font-medium text-gray-700">
//                 Upload Image
//               </span>
//             )}
//           </label>

//           {/* Upload button */}
//           <button
//             type="submit"
//             className="inline-flex items-center px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3"
//           >
//             Upload
//           </button>
//           {/* {/* Success/error message after upload */}
//           {message && <p className="mt-4 text-sm">{message}</p>}
//         </form>
//       </div>
//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-secondary shadow-md z-20 transform transition-all duration-500 ease-in-out ${
//           isCaptionOpen ? "translate-x-full" : "-translate-x-0"
//         }`}
//       >
//         <h2>write caption</h2>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

// ---------------------------------------------------------------------------------------------------

import React, { useState } from "react";
import Cropper from "react-cropper";
import axios from "axios";
import "cropperjs/dist/cropper.css";
// import "react-cropper/dist/react-cropper.css";

function App() {
  const [imageSrc, setImageSrc] = useState(null); // Store selected image URL
  const [formData, setFormData] = useState(new FormData()); // To hold image and other data

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        formData.append("post", e.target.result, e.target.result); // Add image as data with filename
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCrop = (data) => {
    // Update cropped image data in FormData
    const croppedBlob = data.getCroppedCanvas().toBlob();
    formData.set("image", croppedBlob, "cropped-image.jpg"); // Replace existing image data
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/v1/users/create-posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Handle successful upload, e.g., show message, clear form
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      // Handle errors, e.g., show error message
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <button onClick={() => document.getElementById("imageInput").click()}>
        Select Image
      </button>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      {imageSrc && (
        <div>
          <Cropper
            src={imageSrc}
            initialAspectRatio={1} // Set default aspect ratio to 1
            onCrop={handleCrop}
          />
          <button onClick={handleSubmit}>Upload Cropped Image</button>
        </div>
      )}
    </div>
  );
}

export default App;
