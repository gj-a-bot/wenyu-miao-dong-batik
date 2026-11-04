import { twMerge } from "tailwind-merge";

export function cn(...classes: (string | false | undefined | null)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}
