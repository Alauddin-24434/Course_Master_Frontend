// ====================================================
// 🧾 Auth API Module - User Authentication & Management
// ====================================================

import baseApi from "@/redux/baseApi/baseApi";


// ===== 🔹 Inject auth-related endpoints into baseApi =====
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== ✅ Signup user =====
    signUp: build.mutation({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),

    // ===== ✅ Login user =====
    login: build.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),


 
  }),
});

// =====  Export auto-generated hooks =====
export const {
  useSignUpMutation,
  useLoginMutation,

} = authApi;

export default authApi;
