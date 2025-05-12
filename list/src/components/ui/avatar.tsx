import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string;
  name: string;
}

export function Avatar({ initials, name, className, ...props }: AvatarProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
        {initials}
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  )
} 