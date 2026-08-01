import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

/* ─────────────────────────────────────────────────────────────
   BUTTON
   ───────────────────────────────────────────────────────────── */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md cursor-pointer",
    "text-sm font-medium border transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary/60 hover:bg-primary-hover",
        secondary: "bg-muted text-foreground border-border hover:bg-accent",
        outline: "bg-transparent text-foreground border-border hover:bg-muted",
        ghost:
          "bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-white border-destructive/60 hover:bg-destructive/90",
        link: "bg-transparent text-primary border-transparent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-7 px-3 text-xs rounded-md gap-1.5",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-6 text-base rounded-lg gap-2.5",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, disabled, children, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading && (
        <svg
          className="h-3.5 w-3.5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      )}
      {children}
    </button>
  ),
);
Button.displayName = "Button";

/* ─────────────────────────────────────────────────────────────
   CARD
   ───────────────────────────────────────────────────────────── */
const cardVariants = cva("rounded-lg border bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "border-border",
      hover:
        "border-border transition-all duration-150 hover:border-primary/50 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.2)] cursor-pointer",
      ghost: "border-transparent bg-transparent",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

/* ─────────────────────────────────────────────────────────────
   BADGE
   ───────────────────────────────────────────────────────────── */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground border-border",
        primary: "bg-primary/15 text-primary-glow border-primary/30",
        info: "bg-info/15 text-info border-info/30",
        purple: "bg-purple/15 text-purple border-purple/30",
        warning: "bg-warning/15 text-warning border-warning/30",
        destructive: "bg-destructive/15 text-destructive border-destructive/30",
        outline: "bg-transparent text-foreground border-border",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

/* ─────────────────────────────────────────────────────────────
   INPUT
   ───────────────────────────────────────────────────────────── */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-foreground text-sm font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "bg-input text-foreground h-9 w-full rounded-md border px-3 text-sm",
          "placeholder:text-subtle-foreground",
          "transition-colors",
          "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
          error
            ? "border-destructive focus-visible:ring-destructive"
            : "border-border",
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p className="text-muted-foreground text-xs">{hint}</p>
      )}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  ),
);
Input.displayName = "Input";

/* ─────────────────────────────────────────────────────────────
   TEXTAREA
   ───────────────────────────────────────────────────────────── */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-foreground text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(
          "bg-input min-h-25 w-full resize-none rounded-md border px-3 py-2.5",
          "text-foreground placeholder:text-subtle-foreground text-sm",
          "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
          error ? "border-destructive" : "border-border",
          className,
        )}
        {...props}
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  ),
);
Textarea.displayName = "Textarea";

/* ─────────────────────────────────────────────────────────────
   PROGRESS
   ───────────────────────────────────────────────────────────── */
const progressTrackVariants = cva(
  "w-full overflow-hidden rounded-full bg-muted",
  {
    variants: { size: { sm: "h-1", md: "h-1.5", lg: "h-2.5" } },
    defaultVariants: { size: "md" },
  },
);

export interface ProgressProps extends VariantProps<
  typeof progressTrackVariants
> {
  value: number;
  color?: string;
  className?: string;
}

export function Progress({ value, size, color, className }: ProgressProps) {
  return (
    <div className={cn(progressTrackVariants({ size }), className)}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background:
            color ??
            "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SKELETON
   ───────────────────────────────────────────────────────────── */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-md", className)} />;
}

/* ─────────────────────────────────────────────────────────────
   SEPARATOR
   ───────────────────────────────────────────────────────────── */
export function Separator({ className }: { className?: string }) {
  return <div className={cn("bg-border-muted h-px w-full", className)} />;
}

/* ─────────────────────────────────────────────────────────────
   KBD (keyboard shortcut)
   ───────────────────────────────────────────────────────────── */
export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-border bg-muted text-muted-foreground inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px]">
      {children}
    </kbd>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION HEADER
   ───────────────────────────────────────────────────────────── */
export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          {title}
        </h2>
        {subtitle && (
          <p className="text-subtle-foreground mt-0.5 text-xs">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAT CARD
   ───────────────────────────────────────────────────────────── */
export function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ComponentType<{ className?: string }>;
  accent?: "primary" | "warning" | "info" | "purple" | "destructive";
}) {
  const accentClass: Record<string, string> = {
    primary: "text-primary-glow",
    warning: "text-warning",
    info: "text-info",
    purple: "text-purple",
    destructive: "text-destructive",
  };
  const barClass: Record<string, string> = {
    primary: "bg-primary-glow",
    warning: "bg-warning",
    info: "bg-info",
    purple: "bg-purple",
    destructive: "bg-destructive",
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className={cn("text-foreground text-2xl font-bold")}>
            {value}
            {unit && (
              <span className="text-muted-foreground ml-1 text-sm font-normal">
                {unit}
              </span>
            )}
          </div>
          <div className="text-muted-foreground mt-0.5 text-xs">{label}</div>
          <div
            className={cn("mt-2 h-0.5 w-8 rounded-full", barClass[accent])}
          />
        </div>
        {Icon && (
          <Icon className={cn("h-4 w-4 opacity-40", accentClass[accent])} />
        )}
      </div>
    </Card>
  );
}
