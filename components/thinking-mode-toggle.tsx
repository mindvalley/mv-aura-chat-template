import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThinkingModeToggleProps {
    enabled: boolean;
    available: boolean;
    onToggle: (enabled: boolean) => void;
}

export function ThinkingModeToggle({
    enabled,
    available,
    onToggle,
}: ThinkingModeToggleProps) {
    if (!available) return null;

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(!enabled)}
            className={cn(
                "h-8 w-8 rounded-full transition-colors",
                enabled
                    ? "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                    : "hover:bg-secondary"
            )}
            title={enabled ? "Disable thinking mode" : "Enable thinking mode"}
        >
            <Brain
                className={cn(
                    "h-4 w-4",
                    enabled
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-muted-foreground"
                )}
            />
        </Button>
    );
} 