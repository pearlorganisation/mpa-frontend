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
  tagTypes: ["Manuscript", "User", "Editorial", "Enquiry"],
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
    getEditorials: builder.query({
      query: () => "/website/editorial",
      providesTags: ["Editorial"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/users/profile",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getMySubmissions: builder.query({
      query: () => ({
        url: "/manuscripts/my-submissions",
        method: "GET",
      }),
      providesTags: ["Manuscript"],
    }),
    getPublishedArticles: builder.query({
      query: () => "/manuscripts/published",
      providesTags: ["Manuscript"],
    }),

    getManuscriptById: builder.query({
      query: (id) => `/manuscripts/${id}`,
    }),
    submitRevision: builder.mutation({
      query: ({ id, data }) => ({
        url: `/manuscripts/revise/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    sendEnquiry: builder.mutation({
      query: (formData) => ({
        url: "/enquiry/send",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Enquiry"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSubmitManuscriptMutation,
  useVerifyEmailQuery,
  useGetEditorialsQuery,
  useGetMeQuery,
  useUpdateProfileMutation,
  useGetMySubmissionsQuery,
  useGetPublishedArticlesQuery,
  useGetManuscriptByIdQuery,
  useSubmitRevisionMutation,
  useSendEnquiryMutation,
   
} = apiSlice;
