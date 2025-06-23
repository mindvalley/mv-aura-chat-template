import { useState } from "react";
import { Brain, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { type Message } from "@/lib/types";

interface StreamingMessageProps {
    message: Message;
    showThinking: boolean;
}

export function StreamingMessage({
    message,
    showThinking,
}: StreamingMessageProps) {
    const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);

    return (
        <div
            className={cn(
                "rounded-lg px-4 py-2 max-w-[80%]",
                message.role === "assistant"
                    ? "bg-secondary"
                    : "bg-primary text-primary-foreground"
            )}
        >
            {/* Thinking Section */}
            {message.hasThinkingContent && showThinking && (
                <div className="mb-3 border-b border-border pb-3">
                    <button
                        onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Brain className="h-4 w-4" />
                        <span>Thinking...</span>
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 transition-transform",
                                isThinkingExpanded && "rotate-180"
                            )}
                        />
                    </button>

                    <Collapsible open={isThinkingExpanded}>
                        <CollapsibleContent className="mt-2 p-3 bg-muted/50 rounded text-sm font-mono">
                            <div className="whitespace-pre-wrap">
                                {message.thinkingContent}
                                {message.isStreaming &&
                                    message.streamingType === "thinking" && (
                                        <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
                                    )}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            )}

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