import baseApi from "@/redux/baseApi/baseApi";
import { IApiResponse } from "@/interfaces/course.interface";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<IApiResponse<any>, void>({
      query: () => `/users`,
      providesTags: ["Course"], // Might want to add 'User' tag in the baseApi in the future
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
