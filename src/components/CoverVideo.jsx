import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import api from '../utils/api_Interceptor';
import { toast } from 'react-toastify';
import axios from 'axios';

function CoverVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid video file");
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };
  const upload =useMutation({
    mutationFn:async(formData)=>{
        try {
            // const res= await axios.post(`http://localhost:5000/api/v1/users/upload-website-coverVideo`,formData,
            const res = await api.post(`/v1/users/upload-website-coverVideo`,formData,
                {
                    withCredentials:true
                }
            )
            return res.data
        } catch (error) {
          console.log("Error while uploading cover video")
          throw error
            
        }

    }
  })
  const handleUpload = () => {
    if (!videoFile) {
      alert("Please select a video first");
      return;
    }
    console.log("Ready to upload: ", videoFile);
    const formData= new FormData()
    formData.append("coverVideo",videoFile)
    upload.mutate(formData,{
        onSuccess:(data)=>{
            toast.success("Cover video uploaded")
            console.log(data)
        },
        onError:(error)=>{
            console.log(error)
            toast.error("Error in uploading video")
        }
    })
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Upload Cover Video</h2>

      <div className="flex flex-col gap-4 items-center justify-center">
        {!videoPreview ? (
          <label className="cursor-pointer px-6 py-3 bg-[#D95D39] hover:bg-[#b34b2e]  text-white rounded-lg transition">
            Select Video
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="w-full space-y-4">
            <video
              src={videoPreview}
              controls
              className="rounded-xl w-full max-h-64 object-cover"
            />
            <div className="flex justify-between gap-4">
              <button
                onClick={handleRemoveVideo}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Remove
              </button>
              <button
                onClick={handleUpload}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {upload.isPending?"Uploading":"Upload"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoverVideo;
