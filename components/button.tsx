"use client";

import { cn } from "@/lib/tailwind-util";
import { ComponentPropsWithoutRef } from "react";

export default function Button({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn([
        "px-3 py-2 min-w-36 rounded-full bg-zinc-600 hover:bg-zinc-400 text-white",
        props.disabled && "bg-zinc-600/30 hover:bg-zinc-600/30",
      ])}
      {...props}
    >
      {children}
    </button>
  );
}
