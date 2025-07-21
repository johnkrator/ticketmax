import React from "react";
import {cn} from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    size?: "sm" | "default" | "lg" | "full";
    className?: string;
    noPadding?: boolean;
}

const Container: React.FC<ContainerProps> = ({
                                                 children,
                                                 size = "default",
                                                 className,
                                                 noPadding = false
                                             }) => {
    const sizeClasses: Record<ContainerProps["size"] & string, string> = {
        sm: "max-w-2xl",
        default: "max-w-7xl",
        lg: "max-w-screen-2xl",
        full: "max-w-full"
    };

    // Comprehensive default styles applied automatically
    const baseClasses = cn(
        "w-full mx-auto relative",
        // Responsive padding that scales nicely
        !noPadding && "px-4 sm:px-6 lg:px-8 xl:px-12",
        // Responsive vertical spacing
        !noPadding && "py-6 sm:py-8 lg:py-12",
        // Apply size constraints
        sizeClasses[size],
        // Custom classes if provided
        className
    );

    return (
        <div className={baseClasses}>
            {children}
        </div>
    );
};

export default Container;
