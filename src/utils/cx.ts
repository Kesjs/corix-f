import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cx = (...classes: ClassValue[]) => twMerge(clsx(classes));

export const sortCx = <T extends Record<string, unknown>>(obj: T): T => obj;
