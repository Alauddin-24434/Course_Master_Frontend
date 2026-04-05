"use client"
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import { Loader2, DollarSign, Download, CreditCard } from "lucide-react";

export default function PaymentsPage() {
  const { data: coursesData, isLoading } = useGetAllCoursesQuery({ limit: 100 });
  const courses = coursesData?.data?.courses || [];
  
  // Calculate aggregate payments metrics based on courses and enrollments
  const totalRevenue = courses.reduce((acc: number, course: any) => {
      const enrolls = course.enrolledUsers?.length || 0;
      return acc + (enrolls * (course.price || 0));
  }, 0);

  // Generate a flat list of simulated "transactions" based on enrollments for UI visualization
  const simulatedTransactions = courses.flatMap((course: any) => {
    return (course.enrolledUsers || []).map((enrollment: any, index: number) => ({
        id: `tx_${course.id.substring(0,6)}_${index}`,
        courseName: course.title,
        amount: course.price || 0,
        studentId: enrollment.userId || "Unknown",
        date: new Date().toISOString(), // Mocking date since enrollment detail doesn't include timestamp in this flat list
        status: 'Completed'
    }));
  }).filter((tx: any) => tx.amount > 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold">Payments & Revenue</h1>
           <p className="text-gray-500 text-sm">Review incoming transactions and financial reports.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded font-medium hover:bg-gray-50 transition">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Lifetime Revenue</p>
                <h3 className="text-3xl font-bold">${totalRevenue.toFixed(2)}</h3>
             </div>
             <div className="p-4 bg-green-100 text-green-600 rounded-full">
                <DollarSign className="w-8 h-8" />
             </div>
         </div>
         <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Transactions</p>
                <h3 className="text-3xl font-bold">{simulatedTransactions.length}</h3>
             </div>
             <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                <CreditCard className="w-8 h-8" />
             </div>
         </div>
         <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Avg. Transaction Value</p>
                <h3 className="text-3xl font-bold">
                    ${simulatedTransactions.length > 0 ? (totalRevenue / simulatedTransactions.length).toFixed(2) : "0.00"}
                </h3>
             </div>
             <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
                <DollarSign className="w-8 h-8" />
             </div>
         </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
             <h3 className="font-bold">Recent Transactions (Platform Enrollments)</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-zinc-800 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Transaction ID</th>
                <th className="px-6 py-3 text-left">Course Purchased</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {simulatedTransactions.slice(0, 15).map((tx: any, idx: number) => (
                <tr key={idx} className="border-b last:border-0 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{tx.id}</td>
                  <td className="px-6 py-4 font-medium">{tx.courseName}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold">${tx.amount.toFixed(2)}</td>
                </tr>
              ))}
              {simulatedTransactions.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No premium transactions found yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
