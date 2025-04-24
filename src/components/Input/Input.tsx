import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import React from "react";

const inputStyles = cva(
  "block w-full rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-600 ring-1 ring-gray-300 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 placeholder:text-gray-400 transition ease-in-out disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:hover:ring-gray-300 appearance-none outline-none",
  {
    variants: {
      size: {
        base: "text-base px-[10px] py-[10px] h-[44px] min-w-[44px]",
        lg: "text-lg px-[12px] py-[12px] h-[48px] min-w-[48px]",
        xl: "text-xl px-[14px] py-[14px] h-[52px] min-w-[52px]",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
);

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  VariantProps<typeof inputStyles>;

export const Input = ({ size, className, disabled, ...props }: InputProps) => {
  return (
    <input
      type="text"
      className={clsx(inputStyles({ size }), className)}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    />
  );
};
