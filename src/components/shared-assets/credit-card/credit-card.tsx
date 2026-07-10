"use client";
import Image from "next/image";

import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cx, sortCx } from "@/utils/cx";
import { MastercardIcon, MastercardIconWhite, PaypassIcon } from "./icons";

const styles = sortCx({
    transparent: {
        root: "bg-black/10 bg-linear-to-br from-white/30 to-transparent backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
        glow: true,
    },
    "transparent-gradient": {
        root: "bg-black/10 bg-linear-to-br from-white/30 to-transparent backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
        glow: true,
    },
    "brand-dark": {
        root: "bg-linear-to-tr from-brand-900 to-brand-700 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
        glow: true,
    },
    "brand-light": {
        root: "bg-brand-100 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-black/10 before:ring-inset",
        company: "text-neutral-700",
        footerText: "text-neutral-700",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white",
        glow: false,
    },
    "gray-dark": {
        root: "bg-linear-to-tr from-neutral-900 to-neutral-700 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
        glow: true,
    },
    "gray-light": {
        root: "bg-neutral-100 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-black/10 before:ring-inset",
        company: "text-neutral-700",
        footerText: "text-neutral-700",
        paypassIcon: "text-neutral-400",
        cardTypeRoot: "bg-white",
        glow: false,
    },
    "transparent-strip": {
        root: "bg-linear-to-br from-white/30 to-transparent backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
        glow: true,
    },
    "gray-strip": {
        root: "bg-neutral-100 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-neutral-700",
        footerText: "text-white",
        paypassIcon: "text-neutral-400",
        cardTypeRoot: "bg-white/10",
        glow: false,
    },
    "gradient-strip": {
        root: "bg-linear-to-b from-[#A5C0EE] to-[#FBC5EC] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
        glow: false,
    },
    "salmon-strip": {
        root: "bg-[#F4D9D0] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-neutral-700",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
        glow: false,
    },
    "gray-strip-vertical": {
        root: "bg-linear-to-br from-white/30 to-transparent before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-neutral-400",
        cardTypeRoot: "bg-white/10",
        glow: false,
    },
    "gradient-strip-vertical": {
        root: "bg-linear-to-b from-[#FBC2EB] to-[#A18CD1] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
        glow: false,
    },
    "salmon-strip-vertical": {
        root: "bg-[#F4D9D0] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
        glow: false,
    },
});

const _NORMAL_TYPES = ["transparent", "transparent-gradient", "brand-dark", "brand-light", "gray-dark", "gray-light"] as const;
const STRIP_TYPES = ["transparent-strip", "gray-strip", "gradient-strip", "salmon-strip"] as const;
const VERTICAL_STRIP_TYPES = ["gray-strip-vertical", "gradient-strip-vertical", "salmon-strip-vertical"] as const;
const CARD_WITH_COLOR_LOGO = ["brand-dark", "brand-light", "gray-dark", "gray-light"] as const;

type CreditCardType = (typeof _NORMAL_TYPES)[number] | (typeof STRIP_TYPES)[number] | (typeof VERTICAL_STRIP_TYPES)[number];

interface CreditCardProps {
    company?: string;
    cardNumber?: string;
    cardHolder?: string;
    cardExpiration?: string;
    type?: CreditCardType;
    className?: string;
    width?: number;
    maskable?: boolean;
    showChip?: boolean;
}

const originalWidth = 316;
const originalHeight = 190;

const calculateScale = (desiredWidth: number) => {
    const scale = desiredWidth / originalWidth;
    return {
        scale: scale.toFixed(4),
        scaledWidth: (originalWidth * scale).toFixed(2),
        scaledHeight: (originalHeight * scale).toFixed(2),
    };
};

export const CreditCard = ({
    company = "CORIX FINANZA",
    cardNumber = "1234 1234 1234 1234",
    cardHolder = "OLIVIA RHYE",
    cardExpiration = "06/28",
    type = "brand-dark",
    className,
    width,
    maskable = true,
    showChip = true,
}: CreditCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [autoWidth, setAutoWidth] = useState<number | null>(null);
    const [revealed, setRevealed] = useState(!maskable);

    // Auto-fill parent width when no fixed width is passed
    useEffect(() => {
        if (width || !containerRef.current) return;
        const el = containerRef.current;
        const observer = new ResizeObserver((entries) => {
            const w = entries[0]?.contentRect.width;
            if (w) setAutoWidth(w);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [width]);

    const effectiveWidth = width ?? autoWidth ?? originalWidth;

    const { scale, scaledWidth, scaledHeight } = useMemo(
        () => calculateScale(effectiveWidth),
        [effectiveWidth]
    );

    const digits = cardNumber.replace(/\s/g, "");
    const last4 = digits.slice(-4);
    const maskedNumber = `**** **** **** ${last4}`;
    const displayNumber = revealed ? cardNumber : maskedNumber;
    const showGlow = styles[type].glow;

    return (
        <div ref={containerRef} className={cx("relative flex w-full", className)} style={{ height: `${scaledHeight}px` }}>
            <div
                style={{
                    transform: `scale(${scale})`,
                    width: `${originalWidth}px`,
                    height: `${originalHeight}px`,
                }}
                className={cx("absolute top-0 left-0 flex origin-top-left flex-col justify-between overflow-hidden rounded-2xl p-4", styles[type].root)}
            >
                {/* Glassmorphism glow effect */}
                {showGlow && (
                    <>
                        <div className="pointer-events-none absolute -bottom-10 -right-6 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                        <div className="pointer-events-none absolute -top-10 -right-16 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
                        <div className="pointer-events-none absolute bottom-4 right-20 w-24 h-24 rounded-full bg-white/5 blur-xl" />
                    </>
                )}

                {STRIP_TYPES.includes(type as (typeof STRIP_TYPES)[number]) && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2 bg-neutral-800"></div>
                )}
                {VERTICAL_STRIP_TYPES.includes(type as (typeof VERTICAL_STRIP_TYPES)[number]) && (
                    <div className="pointer-events-none absolute inset-y-0 right-22 left-0 z-0 bg-neutral-800"></div>
                )}
                {type === "transparent-gradient" && (
                    <div className="absolute -top-4 -left-4 grid grid-cols-2 blur-3xl">
                        <div className="size-20 rounded-tl-full bg-pink-500 opacity-30 mix-blend-normal" />
                        <div className="size-20 rounded-tr-full bg-orange-500 opacity-50 mix-blend-normal" />
                        <div className="size-20 rounded-bl-full bg-blue-500 opacity-30 mix-blend-normal" />
                        <div className="bg-green-500 size-20 rounded-br-full opacity-30 mix-blend-normal" />
                    </div>
                )}

                <div className="relative flex items-start justify-between px-1 pt-1">
                    <div className={cx("text-md leading-[normal] font-semibold", styles[type].company)}>{company}</div>
                    <div className="flex items-center gap-2">
                        {maskable && (
                            <button
                                type="button"
                                onClick={() => setRevealed((v) => !v)}
                                className={cx("opacity-80 hover:opacity-100 transition-opacity", styles[type].paypassIcon)}
                                aria-label={revealed ? "Masquer le numéro" : "Afficher le numéro"}
                            >
                                {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        )}
                        <PaypassIcon className={styles[type].paypassIcon} />
                    </div>
                </div>

               {showChip && (
  <div className="relative px-1">
    <Image
      src="https://static.vecteezy.com/system/resources/thumbnails/009/400/645/small/sim-card-clipart-design-illustration-free-png.png"
      alt="Puce carte"
      width={36}
      height={28}
      className="object-contain"
    />
  </div>
)}


                <div className="relative px-1">
                    <p className={cx("text-md leading-[normal] font-semibold tracking-[2px] tabular-nums", styles[type].footerText)}>
                        {displayNumber}
                        <span className="pointer-events-none invisible inline-block w-0 max-w-0 opacity-0">1</span>
                    </p>
                </div>

                <div className="relative flex items-end justify-between gap-3 px-1 pb-1">
                    <div className="flex min-w-0 flex-col gap-1.5">
                        <p className={cx("text-[10px] leading-snug font-semibold tracking-[0.6px] uppercase opacity-70", styles[type].footerText)}>
                            Titulaire
                        </p>
                        <p className={cx("text-xs leading-snug font-semibold tracking-[0.6px] uppercase", styles[type].footerText)}>
                            {cardHolder}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                        <p className={cx("text-[10px] leading-snug font-semibold tracking-[0.6px] uppercase opacity-70 text-right", styles[type].footerText)}>
                            Expire
                        </p>
                        <p className={cx("text-xs leading-[normal] font-semibold tracking-[0.6px] tabular-nums text-right", styles[type].footerText)}>
                            {cardExpiration}
                        </p>
                    </div>

                    <div className={cx("flex h-8 w-11.5 shrink-0 items-center justify-center rounded", styles[type].cardTypeRoot)}>
                        {CARD_WITH_COLOR_LOGO.includes(type as (typeof CARD_WITH_COLOR_LOGO)[number]) ? <MastercardIcon /> : <MastercardIconWhite />}
                    </div>
                </div>
            </div>
        </div>
    );
};
