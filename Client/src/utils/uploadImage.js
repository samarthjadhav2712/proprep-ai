import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // append image file to form data
    formData.append("image", imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Assuming the API returns { imageUrl: "http://..." }
    }
    catch(error){
        console.error("Image upload failed:", error);
        throw error;
    }
};

export default uploadImage;