import {
  Bot,
  Sparkles,
  Zap,
  Brain,
  Cpu,
  Rocket,
  Crown,
  Star,
  Lightbulb,
  Target,
} from "lucide-react";

export interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  speed: number; // 1-10
  intelligence: number; // 1-10
  contextLength: string;
  thinkingSupported: boolean;
  supportedInputs: string[];
  bestFor: string[];
  isPro?: boolean;
  icon: any;
}

export const models: Model[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description:
      "Most advanced multimodal model with excellent reasoning and creative capabilities.",
    speed: 8,
    intelligence: 10,
    contextLength: "128K tokens",
    thinkingSupported: false,
    supportedInputs: ["text", "image", "audio"],
    bestFor: ["Complex reasoning", "Creative writing", "Code generation"],
    isPro: true,
    icon: Sparkles,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    description:
      "Faster, cost-effective version of GPT-4o with strong performance.",
    speed: 9,
    intelligence: 8,
    contextLength: "128K tokens",
    thinkingSupported: false,
    supportedInputs: ["text", "image"],
    bestFor: ["Quick tasks", "Summarization", "Q&A"],
    icon: Zap,
  },
  {
    id: "o1-preview",
    name: "o1-preview",
    provider: "OpenAI",
    description:
      "Advanced reasoning model that thinks step-by-step for complex problems.",
    speed: 4,
    intelligence: 10,
    contextLength: "32K tokens",
    thinkingSupported: true,
    supportedInputs: ["text"],
    bestFor: ["Math", "Science", "Complex reasoning"],
    isPro: true,
    icon: Brain,
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description:
      "Anthropic's most intelligent model with excellent analysis and coding skills.",
    speed: 7,
    intelligence: 9,
    contextLength: "200K tokens",
    thinkingSupported: false,
    supportedInputs: ["text", "image", "pdf"],
    bestFor: ["Analysis", "Writing", "Code review"],
    isPro: true,
    icon: Crown,
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    description:
      "Fast and efficient model for everyday tasks and quick responses.",
    speed: 10,
    intelligence: 7,
    contextLength: "200K tokens",
    thinkingSupported: false,
    supportedInputs: ["text", "image"],
    bestFor: ["Quick responses", "Simple tasks", "Chat"],
    icon: Rocket,
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description:
      "Google's powerful multimodal AI with strong reasoning capabilities.",
    speed: 8,
    intelligence: 8,
    contextLength: "1M tokens",
    thinkingSupported: false,
    supportedInputs: ["text", "image", "video", "audio"],
    bestFor: ["Multimodal tasks", "Long context", "Research"],
    icon: Star,
  },
  {
    id: "llama-3-70b",
    name: "Llama 3 70B",
    provider: "Meta",
    description:
      "Open-source model with strong performance across various tasks.",
    speed: 6,
    intelligence: 8,
    contextLength: "8K tokens",
    thinkingSupported: false,
    supportedInputs: ["text"],
    bestFor: ["Open source", "General tasks", "Cost-effective"],
    icon: Bot,
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral AI",
    description: "European AI model with strong multilingual capabilities.",
    speed: 7,
    intelligence: 8,
    contextLength: "32K tokens",
    thinkingSupported: false,
    supportedInputs: ["text"],
    bestFor: ["Multilingual", "European compliance", "Reasoning"],
    icon: Lightbulb,
  },
  {
    id: "perplexity-sonar",
    name: "Sonar Large",
    provider: "Perplexity",
    description:
      "Search-augmented model with real-time web access and citations.",
    speed: 8,
    intelligence: 8,
    contextLength: "127K tokens",
    thinkingSupported: false,
    supportedInputs: ["text"],
    bestFor: ["Web search", "Current events", "Research"],
    icon: Target,
  },
  {
    id: "grok-2",
    name: "Grok-2",
    provider: "xAI",
    description:
      "Elon Musk's AI with real-time X integration and witty personality.",
    speed: 7,
    intelligence: 8,
    contextLength: "131K tokens",
    thinkingSupported: false,
    supportedInputs: ["text", "image"],
    bestFor: ["Real-time info", "Social media", "Humor"],
    isPro: true,
    icon: Cpu,
  },
];
