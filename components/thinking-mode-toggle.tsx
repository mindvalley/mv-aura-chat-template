import { Lightbulb, LightbulbOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThinkingModeToggleProps {
    enabled: boolean;
    available: boolean;
    onToggle: (enabled: boolean) => void;
    className?: string;
    textClassName?: string;
}

export function ThinkingModeToggle({
    enabled,
    available,
    onToggle,
    className,
    textClassName,
}: ThinkingModeToggleProps) {
    if (!available) return null;

    const IconComponent = enabled ? Lightbulb : LightbulbOff;

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => onToggle(!enabled)}
            className={cn(
                "rounded-full h-8 px-2 flex items-center gap-1.5 transition-all duration-200 hover:bg-accent",
                className
            )}
            title={enabled ? "Disable thinking mode" : "Enable thinking mode"}
        >
            <IconComponent
                className={cn(
                    "h-4 w-4 transition-all duration-200",
                    enabled
                        ? "text-yellow-400 drop-shadow-sm"
                        : "text-muted-foreground"
                )}
            />
            <span className={cn(
                "text-sm font-medium text-foreground transition-colors duration-200",
                textClassName
            )}>
                Thinking
            </span>
        </Button>
    );
} 