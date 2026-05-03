import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-full mb-6">
        <CheckCircle className="w-16 h-16" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Thank you for your purchase. Your payment was successful and you are now enrolled in the course.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/dashboard/student/my-courses">Go to My Courses</Link>
        </Button>
      </div>
    </div>
  );
}
