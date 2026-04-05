import baseApi from "@/redux/baseApi/baseApi";
import { IApiResponse } from "@/interfaces/course.interface";

export const lessonApi = baseApi.injectEndpoints({
  overrideExisting: true, // ✅ add this
  endpoints: (build) => ({
    // Add a new lesson (admin only)
    addLesson: build.mutation<IApiResponse<any>, any>({
      
      query: (data) => ({
        url: "/lessons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lesson", "Course", "Enroll"],
    }),

    // Update a lesson
    updateLesson: build.mutation<IApiResponse<any>, { lessonId: string; data: any }>({
      query: ({ lessonId, data }) => ({
        url: `/lessons/${lessonId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Lesson", "Course", "Enroll"],
    }),

    // Delete a lesson
    deleteLesson: build.mutation<IApiResponse<any>, string>({
      query: (lessonId) => ({
        url: `/lessons/${lessonId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson", "Course", "Enroll"],
    }),

    // Get all lessons
    getAllLessons: build.query<IApiResponse<any[]>, { moduleId?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.moduleId) queryParams.append("moduleId", params.moduleId);
        return `/lessons?${queryParams.toString()}`;
      },
      providesTags: ["Lesson"],
    }),

    // Get a specific lesson by ID
    getLessonById: build.query<IApiResponse<any>, string>({
      query: (lessonId) => `/lessons/${lessonId}`,
      providesTags: (result, error, lessonId) => [{ type: "Lesson", id: lessonId }],
    }),
  }),
});

export const {
  useAddLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useGetAllLessonsQuery,
  useGetLessonByIdQuery,
} = lessonApi;
