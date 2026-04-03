import { InputHTMLAttributes, forwardRef } from "react";

interface InnerMilledInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InnerMilledInput = forwardRef<HTMLInputElement, InnerMilledInputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div className="inner-milled bg-surface-container rounded-[var(--radius-DEFAULT)] px-3 py-1 flex items-center space-x-2">
        <span className="material-symbols-outlined text-outline text-lg">
          search
        </span>
        <input
          ref={ref}
          className="bg-transparent border-none focus:ring-0 focus:outline-none text-xs font-[family-name:var(--font-body)] placeholder:text-outline-variant w-full"
          {...props}
        />
      </div>
    );
  }
);

InnerMilledInput.displayName = "InnerMilledInput";
export { InnerMilledInput };
