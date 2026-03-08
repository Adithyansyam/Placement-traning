import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => (
  <div className="rounded-lg border bg-card p-5 space-y-3">
    <Skeleton className="h-5 w-5 rounded" />
    <Skeleton className="h-7 w-20" />
    <Skeleton className="h-4 w-28" />
  </div>
);

export const TableSkeleton = ({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) => (
  <div className="rounded-lg border bg-card overflow-hidden">
    <div className="flex gap-4 p-4 bg-muted/50">
      {Array.from({ length: cols }).map((_, i) => <Skeleton key={i} className="h-4 flex-1" />)}
    </div>
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="flex gap-4 p-4 border-t border-border">
        {Array.from({ length: cols }).map((_, c) => <Skeleton key={c} className="h-4 flex-1" />)}
      </div>
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="rounded-lg border bg-card p-5 space-y-4">
    <Skeleton className="h-5 w-48" />
    <Skeleton className="h-[250px] w-full rounded" />
  </div>
);
