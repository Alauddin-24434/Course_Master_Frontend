import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 p-4 rounded-full mb-6">
        <XCircle className="w-16 h-16" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Your payment was canceled. No charges were made. If this was a mistake, you can try enrolling again.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/courses">Browse Courses</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/student">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
