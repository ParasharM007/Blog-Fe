
import { useMutation } from "@tanstack/react-query";
import api from "./api_Interceptor";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const likeOrUnlikeBlog = async ({ id, status }) => {
  const res = await api.post(
    `${API_BASE_URL}/v1/users/like-unlike-blog`,
    { blogId: id },
    { params: { like: status } }
  );
  return res.data.data;
};

export const useLikeBlog = () => {
  return useMutation({
    mutationFn: likeOrUnlikeBlog,
  });
};
