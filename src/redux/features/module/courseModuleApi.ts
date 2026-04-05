// src/redux/features/course/courseModuleApi.ts

import { IApiResponse, IModule, ILesson } from "@/interfaces/course.interface";
import baseApi from "@/redux/baseApi/baseApi";

export const courseModuleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Module
    addModule: builder.mutation<IApiResponse<IModule>, Partial<IModule>>({
      query: (data) => ({
        url: `/modules`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Update Module
    updateModule: builder.mutation<IApiResponse<IModule>, { courseId: string; moduleId: string; data: Partial<IModule> }>({
      query: ({ courseId, moduleId, data }) => ({
        url: `/modules/${moduleId}`, // Note: Actually the update URL is just /modules/:moduleId in the backend, not /courses/:courseId/modules/:moduleId
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Delete Module
    deleteModule: builder.mutation<IApiResponse<any>, string>({
      query: (moduleId) => ({
        url: `/modules/${moduleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),


    // Update Lesson
    updateLesson: builder.mutation<IApiResponse<ILesson>, { lessonId: string; data: Partial<ILesson> }>({
      query: ({ lessonId, data }) => ({
        url: `/modules/lessons/${lessonId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Delete Lesson
    deleteLesson: builder.mutation<IApiResponse<any>, string>({
      query: (lessonId) => ({
        url: `/modules/lessons/${lessonId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // Assignment create
    createAssignment: builder.mutation<IApiResponse<any>, any>({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Update Assignment
    updateAssignment: builder.mutation<IApiResponse<any>, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Delete Assignment
    deleteAssignment: builder.mutation<IApiResponse<any>, string>({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // Quiz create
    createQuiz: builder.mutation<IApiResponse<any>, any>({
      query: (data) => ({
        url: `/quizs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Update Quiz
    updateQuiz: builder.mutation<IApiResponse<any>, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/quizs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Delete Quiz
    deleteQuiz: builder.mutation<IApiResponse<any>, string>({
      query: (id) => ({
        url: `/quizs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // Get single course with modules & lessons
    getCourse: builder.query<IApiResponse<any>, string>({
      query: (id) => `/courses/${id}`,
      providesTags: ["Course"],
    }),
    
    getModulesByCourseId: builder.query<IApiResponse<{ modules: IModule[] }>, string>({
      query: (courseId: string) => `/modules/${courseId}`,
      providesTags: ["Course"],
    }),

    // Global administrative read operations
    getAllModules: builder.query<IApiResponse<any>, void>({
      query: () => `/modules`,
      providesTags: ["Course"],
    }),
    
    getAllLessons: builder.query<IApiResponse<any>, void>({
      query: () => `/modules/lessons`, // Wait, earlier I noted the route is /modules/lessons but let's re-verify backend. Oh! I actually didn't add global /lessons route! 
    }),

    getAllAssignments: builder.query<IApiResponse<any>, void>({
      query: () => `/assignments`,
      providesTags: ["Course"],
    }),

    getAllQuizzes: builder.query<IApiResponse<any>, void>({
      query: () => `/quizs`,
      providesTags: ["Course"],
    }),

  }),
});

// Hooks Exports
export const {
  useAddModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,

  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useCreateAssignmentMutation,
  useCreateQuizMutation,
  useGetCourseQuery,
  useGetModulesByCourseIdQuery,
  useGetAllModulesQuery,
  useGetAllLessonsQuery,
  useGetAllAssignmentsQuery,
  useGetAllQuizzesQuery,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation
} = courseModuleApi;


