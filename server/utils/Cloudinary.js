// import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dnmm5nnqd', 
  api_key: '253235547639394', 
  api_secret: 'mzB9LT7OO9NcENGLSDTHbh_3o-w' 
});

const uploadOnCloudinary = async (localFilePath) => {
//   try {
    console.log(localFilePath)
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded succesfully
    // console.log("FILE IS UPLOADED ON CLOUDINARY", response.url);

    fs.unlinkSync(localFilePath);

    return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath); // remove the locally saved tempory file as the upload operation got failed
//     return null;
//   }
};

export { uploadOnCloudinary };
