import { useState, useEffect, useRef } from "react";
import { ChevronDown, Lock, Lightbulb, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { type Message } from "@/lib/types";

interface ThinkingContainerProps {
    message: Message;
}

export function ThinkingContainer({ message }: ThinkingContainerProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Auto-scroll effect for streaming thinking content
    useEffect(() => {
        if (
            message.isStreaming &&
            message.streamingType === "thinking" &&
            scrollContainerRef.current &&
            contentRef.current
        ) {
            const container = scrollContainerRef.current;
            const content = contentRef.current;

            // Scroll to show the latest content with a smooth movie credits effect
            const scrollHeight = content.scrollHeight;
            const containerHeight = container.clientHeight;

            if (scrollHeight > containerHeight) {
                const scrollTop = scrollHeight - containerHeight;
                container.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth'
                });
            }
        }
    }, [message.thinkingContent, message.isStreaming, message.streamingType]);

    const isThinkingStreaming = message.isStreaming && message.streamingType === "thinking";
    const isThinkingComplete = message.hasThinkingContent && !isThinkingStreaming;

    if (!message.hasThinkingContent) {
        return null;
    }

    return (
        <div className="flex max-w-3xl mx-auto w-full justify-start mb-4">
            <div className="message-bubble rounded-3xl text-primary min-h-7 prose dark:prose-invert break-words prose-p:opacity-95 prose-strong:opacity-100 prose-ul:my-1 prose-ol:my-1 prose-li:my-2 last:prose-li:mb-3 prose-li:ps-1 prose-li:ms-1 w-full max-w-none">
                <div className="thinking-container">
                    <div className="mb-2">
                        <div className="md:-mx-4 mb-4 relative border-2 border-border/20 rounded-3xl overflow-clip bg-card/50 backdrop-blur-sm">
                            {/* Thinking Header */}
                            <h3 className="z-20 sticky flex m-0 bg-gradient-to-b from-background via-background via-85% to-transparent group/accordion top-0">
                                <div className="group/accordion flex flex-1 items-center font-sm text-left text-base space-x-1 transition-all duration-200 focus:outline-none focus-within:outline-none">
                                    <div className="min-h-[3.5rem] overflow-y-clip flex flex-col justify-start rounded-2xl relative w-full overflow-clip focus:outline-none focus-within:outline-none">
                                        <div className="flex h-full gap-1 w-full items-center justify-start px-5 pt-4">
                                            <div className="flex gap-1 overflow-hidden">
                                                <div className="flex gap-1 items-center">
                                                    <div className="w-[24px] h-[24px]">
                                                        <Brain className={cn(
                                                            "w-full h-full text-blue-500",
                                                            isThinkingStreaming && "animate-pulse"
                                                        )} />
                                                    </div>
                                                </div>
                                                <div className="flex items-baseline gap-1 overflow-hidden ml-2">
                                                    <span className={cn(
                                                        "whitespace-nowrap font-xs",
                                                        isThinkingStreaming ? "loading-gradient-text" : ""
                                                    )}>
                                                        {isThinkingStreaming ? "Thinking" : "Thought for"}
                                                    </span>
                                                    {!isThinkingStreaming && message.thinkingDuration && (
                                                        <span className="font-mono text-muted-foreground font-sm text-sm">
                                                            {message.thinkingDuration}s
                                                        </span>
                                                    )}
                                                    {/* {message.thinkingApiLimited && (
                                                        <Lock className="h-3 w-3 text-muted-foreground/60 ml-1" />
                                                    )} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </h3>

                            {/* Thinking Content */}
                            {message.thinkingApiLimited ? (
                                <div className="px-5 pb-4">
                                    <div className="p-4 bg-muted/30 rounded-2xl text-sm">
                                        <div className="flex items-start gap-3 text-muted-foreground">
                                            <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium mb-1">Thinking content not available</p>
                                                <p className="text-xs leading-relaxed opacity-80">
                                                    This model is actively reasoning through your request, but the thinking process
                                                    is not accessible through the API due to current limitations.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Streaming Thinking Content */}
                                    {isThinkingStreaming && (
                                        <div className="px-5 pb-4">
                                            <div
                                                ref={scrollContainerRef}
                                                className="w-full overflow-hidden relative flex flex-col items-start h-[180px]"
                                            >
                                                <div
                                                    ref={contentRef}
                                                    className="w-full flex flex-col items-center justify-center relative px-4 h-full fade-mask"
                                                >
                                                    {message.thinkingContent?.split('\n').map((line, index) => (
                                                        <p
                                                            key={index}
                                                            className="w-full text-muted-foreground text-xs opacity-90 my-0 flex items-center leading-relaxed thinking-content-line"
                                                        >
                                                            {line}
                                                            {index === message.thinkingContent!.split('\n').length - 1 && (
                                                                <span className="inline-block w-1.5 h-3 bg-current animate-pulse ml-1 rounded-sm" />
                                                            )}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Completed Thinking Content - Show Expand/Collapse Button */}
                                    {isThinkingComplete && (
                                        <div className="px-5 pb-4">
                                            <Button
                                                onClick={() => setIsExpanded(!isExpanded)}
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 p-0 h-auto font-normal"
                                            >
                                                <span>{isExpanded ? "Collapse details" : "Expand for details"}</span>
                                                <ChevronDown
                                                    className={cn(
                                                        "h-4 w-4 transition-transform duration-200",
                                                        isExpanded && "rotate-180"
                                                    )}
                                                />
                                            </Button>

                                            <Collapsible open={isExpanded}>
                                                <CollapsibleContent className="overflow-hidden">
                                                    <div className="p-4 bg-muted/30 rounded-2xl text-sm max-h-96 overflow-y-auto">
                                                        <div className="font-mono whitespace-pre-wrap leading-relaxed text-xs text-muted-foreground">
                                                            {message.thinkingContent}
                                                        </div>
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 