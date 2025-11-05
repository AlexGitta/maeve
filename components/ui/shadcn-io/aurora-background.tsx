"use client";

import { cn } from "../../../lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main className={cn("relative flex flex-col min-h-screen bg-white", className)} {...props}>
      <div className="absolute inset-0 overflow-hidden z-10">
        <div
          className={cn(
            `
            [--aurora:repeating-linear-gradient(100deg,#252AB3_0%,#7294B5_15%,#ffffff_30%,#1B3054_45%,#7294B5_60%,#ffffff_75%,#252AB3_90%,#1B3054_100%)]
            [background-image:var(--aurora)]
            [background-size:200%_100%]
            [background-position:0%_50%]
            animate-aurora
            filter blur-[80px]
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_50%_50%,black_40%,transparent_90%)]`
          )}
        ></div>
      </div>
      <div className="relative">
        {children}
      </div>
    </main>
  );
};
