"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Zap, Brain, Clock, CheckCircle2, Lightbulb, Layers, Star, Search, Eye, Puzzle, FileText, ImageIcon, Mic, Video, FileIcon as LucideFileIcon, HelpCircle } from "lucide-react"
import type { Model } from "@/lib/models"
import Image from "next/image"

interface ModelCardProps {
    model: Model
}

// Provider logo mapping
const getProviderLogo = (provider: string) => {
    switch (provider.toLowerCase()) {
        case 'openai':
            return '/OpenAI.svg'
        case 'anthropic':
            return '/Claude.svg'
        case 'google':
            return '/Gemini.svg'
        default:
            return '/OpenAI.svg' // fallback
    }
}

// Custom 5-segment gauge component
const FiveSegmentGauge = ({ value, maxValue = 10, color = "bg-primary" }: { value: number, maxValue?: number, color?: string }) => {
    const filledSegments = Math.round((value / maxValue) * 5)

    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, index) => (
                <div
                    key={index}
                    className={`h-1 flex-1 rounded-sm transition-colors ${index < filledSegments ? color : "bg-muted"
                        }`}
                />
            ))}
        </div>
    )
}

// Updated Icons and colors for the "Supports" section to match models.ts data
const supportIcons: { [key: string]: React.ElementType } = {
    "text": FileText,
    "image": ImageIcon,
    "audio": Mic,
    "video": Video,
    "pdf": LucideFileIcon,
    "default": HelpCircle,
};

const supportIconColors: { [key: string]: string } = {
    "text": "text-blue-500",
    "image": "text-green-500",
    "audio": "text-yellow-500",
    "video": "text-red-500",
    "pdf": "text-orange-500",
    "default": "text-gray-500",
};

export function ModelCard({ model }: ModelCardProps) {
    // A helper function to create the list items for Recommended and Supports
    const renderFeatureList = (features: string[]) => (
        <div className="flex flex-col space-y-1">
            {features.map((feature) => (
                <div key={feature} className="flex items-center justify-between">
                    <span className="text-sm">{feature}</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                </div>
            ))}
        </div>
    );

    return (
        <Card className="w-[350px] shadow-xl border bg-card text-foreground">
            <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                    <Image
                        src={getProviderLogo(model.provider)}
                        alt={`${model.provider} logo`}
                        width={24}
                        height={24}
                        className={`flex-shrink-0 ${model.provider.toLowerCase() === 'openai'
                            ? 'filter brightness-0 invert'
                            : ''
                            }`}
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-base leading-tight">{model.name}</h3>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
            </CardHeader>

            <Separator />

            <CardContent className="pt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground w-1/3">Speed</span>
                    <div className="w-2/3">
                        <FiveSegmentGauge value={model.speed} color="bg-red-500" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground w-1/3">Intelligence</span>
                    <div className="w-2/3">
                        <FiveSegmentGauge value={model.intelligence} color="bg-red-500" />
                    </div>
                </div>

                <div className="flex items-start justify-between">
                    <span className="text-muted-foreground w-1/3">Provider</span>
                    <div className="w-2/3">
                        <span>{model.provider}</span>
                    </div>
                </div>

                <div className="flex items-start justify-between">
                    <span className="text-muted-foreground w-1/3">Context</span>
                    <div className="w-2/3">
                        <span className="font-medium">{model.contextLength}</span>
                    </div>
                </div>

                <div className="flex items-start justify-between">
                    <span className="text-muted-foreground w-1/3 pt-0.5">Best For</span>
                    <div className="w-2/3">
                        {renderFeatureList(model.bestFor || [])}
                    </div>
                </div>

                <div className="flex items-start justify-between">
                    <span className="text-muted-foreground w-1/3 pt-0.5">Supports</span>
                    <div className="w-2/3 flex flex-wrap gap-2">
                        {(model.supportedInputs || []).map((input) => {
                            const trimmedInput = input.trim();
                            const IconComponent = supportIcons[trimmedInput] || supportIcons.default;
                            const iconColor = supportIconColors[trimmedInput] || supportIconColors.default;
                            return (
                                <div
                                    key={input}
                                    className="p-2 rounded-md border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                                    title={input}
                                >
                                    <IconComponent className={`h-4 w-4 ${iconColor}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 