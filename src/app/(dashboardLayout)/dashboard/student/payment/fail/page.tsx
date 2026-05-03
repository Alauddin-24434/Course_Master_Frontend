import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-full mb-6">
        <AlertTriangle className="w-16 h-16" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
        We were unable to process your payment. Please check your payment details and try again.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/dashboard/student">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
