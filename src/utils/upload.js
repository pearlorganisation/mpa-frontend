import axios from "axios";

export const uploadManuscript = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/manuscripts/submit`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};