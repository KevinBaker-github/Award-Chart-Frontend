import { useState } from "react";
import axiosConfig from '../services/axiosConfig';

/**
 * Uploads formData to an endpoint and provides information to the caller.
 * @param {*} url 
 * @returns 
 */
export const useUploadForm = (url) => {
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadForm = async (formData) => {
    setIsUploading(true);
    return await axiosConfig.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        //const progress = (progressEvent.loaded * 100) / progressEvent.total; // Real percentage
        //const progress = (progressEvent.loaded / progressEvent.total) * 50; // Fake percentage
        const progress = ((progressEvent.loaded * 100) / progressEvent.total) - Math.floor(Math.random() * 30) + 1; // Fake 2 percentage
        setProgress(progress);
      }
    })
    .then(res => {
        console.log(res.data);
        setIsUploadSuccess(true);
        setIsUploading(false);
        setProgress(100);
        return res;
    })
    .catch(err => {
        console.log(err);
        setIsUploadSuccess(false);
        setIsUploading(false);
        setProgress(0);
        return err;
    });

  };

  return { uploadForm, isUploadSuccess, progress, isUploading };
};