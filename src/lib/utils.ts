import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** Shared easing curve (expo-out feel) for Framer Motion */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Seconds to wait for the preloader before the hero entrance starts */
export const INTRO_DELAY = 2.3;
