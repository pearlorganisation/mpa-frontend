import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Manuscript", "User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),
    submitManuscript: builder.mutation({
      query: (formData) => ({
        url: "/manuscripts/submit",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Manuscript"],
    }),
    verifyEmail: builder.query({
      query: (token) => `/users/verify-email/${token}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSubmitManuscriptMutation,
  useVerifyEmailQuery,
} = apiSlice;
