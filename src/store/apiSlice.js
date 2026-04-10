import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint === "submitManuscript") {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            headers.set("authorization", `Bearer ${token}`);
          }
        }
        return headers;
      }
      headers.set("Content-Type", "application/json");

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
        headers: {},
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
    getLatestPublishedArticle: builder.query({
      query: () => "/manuscripts/published?limit=1",
      providesTags: ["Manuscript"],
      transformResponse: (response) => response.articles?.[0] || null,
    }),

    getPublishedArticles: builder.query({
      query: ({ year, page = 1, limit = 6 } = {}) => {
        const params = new URLSearchParams({
          ...(year && year !== "undefined" && { year }),
          page,
          limit,
        }).toString();
        return `/manuscripts/published?${params}`;
      },
      providesTags: ["Manuscript"],
    }),

    getPublishedYears: builder.query({
      query: () => "/manuscripts/year",
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
    getLatestPublished: builder.query({
      query: () => "/manuscripts/latest",
    }),
    getManuscriptDetails: builder.query({
      query: (id) => `/manuscripts/${id}`,
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
  useGetLatestPublishedArticleQuery,
  useGetPublishedYearsQuery,
  useGetLatestPublishedQuery,
  useGetManuscriptDetailsQuery ,

} = apiSlice;
