'use client';

import { useState, useEffect, useCallback } from 'react';
import { assetService } from '@/services/assetService';
import { Asset, CreateAssetInput } from '@/types';

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const data = await assetService.getAssets();
      setAssets(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch equipment assets from API');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const registerAsset = async (input: CreateAssetInput): Promise<Asset> => {
    const created = await assetService.registerAsset(input);
    await fetchAssets();
    return created;
  };

  return {
    assets,
    loading,
    error,
    refetch: fetchAssets,
    registerAsset,
  };
}
