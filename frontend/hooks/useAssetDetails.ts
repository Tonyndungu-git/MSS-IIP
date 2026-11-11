'use client';

import { useState, useEffect, useCallback } from 'react';
import { assetService } from '@/services/assetService';
import { Asset } from '@/types';

export function useAssetDetails(id: string) {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAsset = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await assetService.getAssetById(id);
      setAsset(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message || `Failed to fetch asset with ID: ${id}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAsset();
  }, [fetchAsset]);

  return {
    asset,
    loading,
    error,
    refetch: fetchAsset,
  };
}
