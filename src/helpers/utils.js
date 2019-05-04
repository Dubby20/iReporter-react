import { post } from 'axios';

/**
 * 
 * @param {*} uploadURL 
 * @param {*} files 
 */
export const uploadFile = async (files, uploadURL) => {

  try {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('upload_preset', 'yftnq9xd');

      const imageData = await post(uploadURL, formData, {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      return imageData.data.secure_url;
    } else {
      return files;
    }
  } catch (err) {
    return err.response.data;
  }

};

