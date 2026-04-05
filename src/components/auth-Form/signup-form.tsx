"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";


import { User, Mail, Lock, Eye, EyeOff, CheckCircle, GraduationCap, Briefcase } from "lucide-react";
import {
  authStart,
  setUser,
  authFailure,
} from "@/redux/features/auth/authSlice";
import type { AppDispatch } from "@/redux/store";
import { useSignUpMutation } from "@/redux/features/auth/authApi";

// ---------------- Zod Schema ----------------
const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),

    role: z.enum(["student", "instructor"]),
  })


type SignupFormValues = z.infer<typeof signupSchema>;

// ---------------- Signup Form Component ----------------
export function SignupForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [signUp] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "student" as const,
    }
  });

  const role = watch("role");

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      dispatch(authStart());

      const response = await signUp({
        name: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
      }).unwrap(); 

      dispatch(
        setUser({ user: response.data.user, token: response.data.token })
      );

      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      const message = err?.data?.message || "Signup failed";
      dispatch(authFailure(message));
      toast.error(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Path Selection */}
        <div className="space-y-3">
          <label className="block text-[10px] font-black text-center text-muted-foreground uppercase tracking-[0.2em]">
             Select Your Path
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue("role", "student")}
              className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all duration-300 ${
                role === "student" 
                ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10" 
                : "border-border text-muted-foreground hover:border-primary/20 hover:bg-muted/30 opacity-60"
              }`}
            >
              <GraduationCap className={`w-8 h-8 ${role === "student" ? "animate-pulse" : ""}`} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Student</span>
            </button>
            <button
              type="button"
              onClick={() => setValue("role", "instructor")}
              className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all duration-300 ${
                role === "instructor" 
                ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10" 
                : "border-border text-muted-foreground hover:border-primary/20 hover:bg-muted/30 opacity-60"
              }`}
            >
              <Briefcase className={`w-8 h-8 ${role === "instructor" ? "animate-pulse" : ""}`} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Instructor</span>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 text-left">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                {...register("fullName")}
                placeholder="Ex. Alauddin Ali"
                className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground ml-1">Secure Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
              />
              <button
                type="button"
                className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 mt-2 shadow-lg shadow-primary/20"
        >
          {isSubmitting ? "Generating Profile..." : "Create My Account"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}
