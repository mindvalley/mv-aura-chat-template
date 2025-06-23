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
