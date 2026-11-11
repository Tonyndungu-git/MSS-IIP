'use client';

import { useState, useEffect, useCallback } from 'react';
import { healthService } from '@/services/healthService';
import { HealthResponse } from '@/lib/api';

export function useHealth(pollIntervalMs: number = 20000) {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    try {
      const data = await healthService.checkHealth();
      setHealth(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to ping backend API');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    if (pollIntervalMs > 0) {
      const timer = setInterval(fetchHealth, pollIntervalMs);
      return () => clearInterval(timer);
    }
  }, [fetchHealth, pollIntervalMs]);

  return { health, loading, error, refetch: fetchHealth };
}
