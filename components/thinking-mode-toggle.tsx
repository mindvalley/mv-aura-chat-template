import { Brain } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg">
            <Brain className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Show thinking</span>
            <Switch
                checked={enabled}
                onCheckedChange={onToggle}
                className="ml-auto"
            />
        </div>
    );
} 