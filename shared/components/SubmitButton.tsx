import type React from "react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";



const SubmitButton = ({ isLoading, className, children, loadingMessage, onClick, type = "submit", disabled }: {
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  loadingMessage?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
}) => {
    return (
        <Button
            type={type}
            disabled={isLoading || disabled}
            className={className ?? "bg-green-400 w-full"}
            onClick={onClick}
        >
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <Image
                        src="/assets/icons/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                        className="animate-spin"
                    />
                    {loadingMessage}
                </div>
            ) : (
                children
            )}
        </Button>
    );
};

export default SubmitButton;
