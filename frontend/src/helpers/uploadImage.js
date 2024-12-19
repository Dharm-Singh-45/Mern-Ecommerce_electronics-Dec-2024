import axios from "axios";

const url = "https://api.cloudinary.com/v1_1/dg2fgbmri/image/upload";

const uploadImage = async (image) => {
  const formData = new FormData();
  
  // Append the image and upload preset to the FormData
  formData.append("file", image);
  formData.append("upload_preset", "Ecommerce_Product"); 

  try {
    // Make the POST request using axios
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    // Return the response data from Cloudinary
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow the error if needed
  }
};

export default uploadImage;
