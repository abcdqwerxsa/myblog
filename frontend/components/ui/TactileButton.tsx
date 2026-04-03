import { ButtonHTMLAttributes, forwardRef } from "react";

interface TactileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const TactileButton = forwardRef<HTMLButtonElement, TactileButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => {
    const base =
      "font-[family-name:var(--font-headline)] font-semibold tracking-tight text-sm px-8 py-3 transition-all duration-100 active:translate-y-[2px]";

    const variants = {
      primary:
        "tactile-button bg-primary text-on-primary",
      secondary:
        "inner-milled bg-surface-container-highest text-on-surface",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TactileButton.displayName = "TactileButton";
export { TactileButton };
