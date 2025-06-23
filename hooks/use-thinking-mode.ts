import { useState, useMemo, useEffect } from "react";
import { type Model } from "@/lib/models";

export function useThinkingMode(currentModel: Model | null) {
  const [thinkingEnabled, setThinkingEnabled] = useState(false);

  const thinkingAvailable = useMemo(
    () => currentModel?.thinkingSupported ?? false,
    [currentModel]
  );

  // Reset thinking mode when switching to non-thinking model
  useEffect(() => {
    if (!thinkingAvailable) {
      setThinkingEnabled(false);
    }
  }, [thinkingAvailable]);

  return {
    thinkingEnabled,
    thinkingAvailable,
    setThinkingEnabled,
  };
}
