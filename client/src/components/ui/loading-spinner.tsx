import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-muted border-t-primary",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="leaderboard-card p-6 rounded-xl">
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded loading-shimmer" />
        <div className="h-6 bg-muted rounded loading-shimmer" />
        <div className="h-4 bg-muted rounded loading-shimmer w-3/4" />
      </div>
    </div>
  );
}
