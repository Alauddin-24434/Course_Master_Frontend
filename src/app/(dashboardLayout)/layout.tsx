import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-gray-50/50 dark:bg-zinc-950/50 min-h-screen">
        <div className="flex items-center gap-2 px-4 py-2 border-b bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 sticky top-0 z-20">
            <SidebarTrigger />
            <div className="h-4 w-[1px] bg-gray-200 dark:bg-zinc-800 mx-1"></div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Course Master Dashboard</span>
        </div>
        <div className="p-4 md:p-6 lg:p-8">
            {children}
        </div>
      </main>
    </SidebarProvider>

  )
}
