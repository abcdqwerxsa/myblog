interface StatusLensProps {
  className?: string;
}

export function StatusLens({ className = "" }: StatusLensProps) {
  return (
    <div
      className={`w-2 h-2 rounded-full bg-primary-fixed-dim status-lens ${className}`}
    />
  );
}
