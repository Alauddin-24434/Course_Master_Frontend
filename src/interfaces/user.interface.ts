import { ICompletedLesson, IEnrollment } from "./course.interface";

// User role
export enum Role {
  student = "student",
  admin = "admin",
}

// Assignment submission type
export enum SubmissionType {
  text = "text",
  link = "link",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  bio?: string | null;
  password: string;
  role: Role;
  avatar?: string | null;
  enrolledCourses?: IEnrollment[];
  completedLessons?: ICompletedLesson[];
  createdAt: Date;
  updatedAt: Date;
}