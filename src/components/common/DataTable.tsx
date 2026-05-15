"use client";

import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

export interface Column<T> {
  header: string;
  accessor?: keyof T | ((item: T) => ReactNode);
  className?: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  loadingMessage?: string;
  emptyState?: {
    title: string;
    description: string;
    icon: ReactNode;
  };
  rowClassName?: string;
}

export default function DataTable<T>({
  columns,
  data,
  isLoading,
  loadingMessage = "Loading Data...",
  emptyState,
  rowClassName = "",
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground animate-pulse">
          {loadingMessage}
        </p>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
        <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center text-muted-foreground/20">
          {emptyState.icon}
        </div>
        <div className="space-y-1">
          <h4 className="text-xl font-black italic">{emptyState.title}</h4>
          <p className="text-sm font-medium text-muted-foreground">{emptyState.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/30">
            {columns.map((column, idx) => (
              <th
                key={idx}
                className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50 ${
                  column.align === "center"
                    ? "text-center"
                    : column.align === "right"
                    ? "text-right"
                    : "text-left"
                } ${column.className || ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {data.map((item: any, rowIdx) => (
            <tr key={item.id || rowIdx} className={`group hover:bg-muted/40 transition-all duration-300 ${rowClassName}`}>
              {columns.map((column, colIdx) => (
                <td
                  key={colIdx}
                  className={`px-8 py-6 md:py-7 ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {column.accessor
                    ? typeof column.accessor === "function"
                      ? column.accessor(item)
                      : (item[column.accessor as keyof T] as ReactNode)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
