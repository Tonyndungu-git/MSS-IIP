'use client';

import { useState, useCallback } from 'react';
import { aiService, AIAnalysisResult } from '@/services/aiService';
import { AIAgentDefinition, Asset } from '@/types';

export function useAIAgents() {
  const [agents] = useState<AIAgentDefinition[]>(() => aiService.getRegisteredAgents());
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || '');
  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);

  const evaluateAsset = useCallback(async (asset: Asset) => {
    setEvaluating(true);
    try {
      // Simulate real computational latency
      await new Promise((r) => setTimeout(r, 600));
      const result = await aiService.evaluateAsset(asset);
      setAnalysisResult(result);
      return result;
    } finally {
      setEvaluating(false);
    }
  }, []);

  return {
    agents,
    selectedAgentId,
    setSelectedAgentId,
    evaluating,
    analysisResult,
    evaluateAsset,
  };
}
