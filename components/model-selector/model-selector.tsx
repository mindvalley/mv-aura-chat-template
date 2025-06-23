"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ModelCard } from "./model-card"
import { models, type Model } from "@/lib/models"

interface ModelSelectorProps {
    selectedModel: string
    onModelChange: (modelId: string) => void
    isInputAtBottom?: boolean
    isInputAtCenter?: boolean
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

export function ModelSelector({ selectedModel, onModelChange, isInputAtBottom, isInputAtCenter }: ModelSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const [hoveredModel, setHoveredModel] = React.useState<Model | null>(null)

    const currentModelDetails = models.find((model) => model.id === selectedModel) || models[0]

    return (
        <div className="relative flex items-start">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="h-[36px] w-[200px] justify-between bg-background hover:bg-accent px-3"
                    >
                        <div className="flex items-center gap-2 truncate">
                            <Image
                                src={getProviderLogo(currentModelDetails.provider)}
                                alt={`${currentModelDetails.provider} logo`}
                                width={14}
                                height={14}
                                className={`flex-shrink-0 ${currentModelDetails.provider.toLowerCase() === 'openai'
                                    ? 'filter brightness-0 invert'
                                    : ''
                                    }`}
                            />
                            <span className="font-medium truncate text-xs">{currentModelDetails.name}</span>
                        </div>
                        <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start" sideOffset={5}>
                    <Command>
                        <CommandInput placeholder="Search models..." />
                        <CommandList
                            className="scroll-smooth"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'transparent transparent',
                            }}
                            onMouseEnter={(e) => {
                                const element = e.currentTarget;
                                element.style.scrollbarColor = 'rgba(255, 255, 255, 0.1) transparent';
                            }}
                            onMouseLeave={(e) => {
                                const element = e.currentTarget;
                                element.style.scrollbarColor = 'transparent transparent';
                            }}
                        >
                            <style jsx>{`
                .scroll-smooth::-webkit-scrollbar {
                  width: 6px;
                  background: transparent;
                }
                
                .scroll-smooth::-webkit-scrollbar-track {
                  background: transparent;
                }
                
                .scroll-smooth::-webkit-scrollbar-thumb {
                  background: transparent;
                  border-radius: 10px;
                  transition: all 0.3s ease;
                }
                
                .scroll-smooth:hover::-webkit-scrollbar-thumb {
                  background: rgba(255, 255, 255, 0.1);
                }
                
                .scroll-smooth::-webkit-scrollbar-thumb:hover {
                  background: rgba(255, 255, 255, 0.2);
                }
                
                .scroll-smooth::-webkit-scrollbar-thumb:active {
                  background: rgba(255, 255, 255, 0.3);
                }
              `}</style>
                            <CommandEmpty>No model found.</CommandEmpty>
                            <CommandGroup>
                                {models.map((model) => (
                                    <CommandItem
                                        key={model.id}
                                        value={model.name}
                                        onSelect={() => {
                                            onModelChange(model.id)
                                            setOpen(false)
                                            setHoveredModel(null)
                                        }}
                                        onMouseEnter={() => setHoveredModel(model)}
                                        onMouseLeave={() => setHoveredModel(null)}
                                        className="p-3 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={getProviderLogo(model.provider)}
                                                    alt={`${model.provider} logo`}
                                                    width={20}
                                                    height={20}
                                                    className={`flex-shrink-0 ${model.provider.toLowerCase() === 'openai'
                                                        ? 'filter brightness-0 invert'
                                                        : ''
                                                        }`}
                                                />
                                                <div>
                                                    <div className="font-medium text-xs">{model.name}</div>
                                                    <div className="text-[10px] text-muted-foreground">{model.provider}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Check className={cn("h-4 w-4", selectedModel === model.id ? "opacity-100" : "opacity-0")} />
                                            </div>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Model card positioned to the right without overlap */}
            {open && hoveredModel && (
                <div className={cn(
                    "absolute left-full ml-[100px] animate-in slide-in-from-right-2 duration-200 z-10",
                    // Use top positioning for both scenarios, but adjust based on available space
                    // When input is at bottom (has messages), position from top but ensure it fits in viewport
                    isInputAtBottom ? "top-4 max-h-[calc(100vh-8rem)]" : "top-4",
                    // Add overflow handling to prevent card from being cut off
                    "overflow-visible"
                )}>
                    <ModelCard model={hoveredModel} />
                </div>
            )}
        </div>
    )
} 