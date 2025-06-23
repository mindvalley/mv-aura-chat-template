export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isExperimental?: boolean;
  // New thinking mode properties
  thinkingContent?: string;
  isThinking?: boolean;
  isStreaming?: boolean;
  streamingType?: "thinking" | "response";
  hasThinkingContent?: boolean;
  thinkingStartTime?: Date;
  thinkingDuration?: number; // in seconds
  thinkingApiLimited?: boolean; // true if model thinks but API doesn't expose content
}

export interface ThinkingModeState {
  enabled: boolean;
  available: boolean;
}

export interface Assistant {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ModelCapability {
  id: string;
  name: string;
  icon: React.ReactNode;
}
