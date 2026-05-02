import baseApi from "../../baseApi/baseApi";

const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Newsletter"],
    }),
    getAllSubscribers: builder.query({
      query: (params) => ({
        url: "/newsletter",
        method: "GET",
        params,
      }),
      providesTags: ["Newsletter"],
    }),
    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `/newsletter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Newsletter"],
    }),
  }),
});

export const {
  useSubscribeNewsletterMutation,
  useGetAllSubscribersQuery,
  useDeleteSubscriberMutation,
} = newsletterApi;
