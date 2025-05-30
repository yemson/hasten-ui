import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import React from "react";

const Spinner = () => (
  <span
    className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    role="status"
    aria-hidden="true"
  />
);

const buttonStyles = cva(
  "inline-flex items-center justify-center font-medium rounded-lg min-h-[44px] min-w-[44px] cursor-pointer [touch-action:manipulation] transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-500 hover:bg-blue-500/75 active:bg-blue-500/75 text-white dark:bg-blue-600 dark:hover:bg-blue-600/75 dark:active:bg-blue-600/75",
        secondary:
          "bg-gray-200 hover:bg-gray-200/75 active:bg-gray-200/75 text-gray-800 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-700/75",
        danger:
          "bg-red-500 hover:bg-red-500/75 active:bg-red-500/75 text-white dark:bg-red-600 dark:hover:bg-red-600/75 dark:active:bg-red-600/75",
        outline:
          "border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800",
        ghost:
          "bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-100 dark:text-white dark:hover:bg-gray-800",
        link: "bg-transparent text-blue-500 hover:underline active:underline dark:text-blue-400",
      },
      size: {
        base: "text-base px-5 py-1.5 h-[44px] min-w-[44px]",
        lg: "text-lg px-6 py-2 h-[48px] min-w-[48px]",
        xl: "text-xl px-7 py-2.5 h-[52px] min-w-[52px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  },
);

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

interface ButtonWithChildren extends BaseButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

export type ButtonProps = ButtonWithChildren;

export const Button = ({
  variant,
  size,
  className,
  disabled,
  loading,
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      className={clsx(buttonStyles({ variant, size }), className)}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};
