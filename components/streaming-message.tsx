import { type Message } from "@/lib/types";
import { cn } from "@/lib/utils";


interface StreamingMessageProps {
    message: Message;
    showThinking: boolean;
}

export function StreamingMessage({
    message,
    showThinking,
}: StreamingMessageProps) {
    return (
        <div
            className={cn(
                "rounded-lg px-4 py-2 max-w-[80%]",
                message.role === "assistant"
                    ? "bg-secondary"
                    : "bg-primary text-primary-foreground"
            )}
        >
            {/* Response Content */}
            <div className="whitespace-pre-wrap">
                {message.content}
                {message.isStreaming && message.streamingType === "response" && (
                    <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
                )}
            </div>
        </div>
    );
} 