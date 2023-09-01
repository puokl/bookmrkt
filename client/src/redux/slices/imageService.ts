import axios from "axios";

// upload new image
const uploadAvatar = async (imageUrl: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageUrl);
    formData.append("folder", "avatar");
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/api/imageUpload`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

// upload new product Image
const uploadProductImage = async (imageUrl: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageUrl);
    formData.append("folder", "productImage");
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/api/imageUpload`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

const imageService = {
  uploadAvatar,
  uploadProductImage,
};

export default imageService;
