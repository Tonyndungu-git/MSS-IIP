import { api } from '@/lib/api';
import { Asset, CreateAssetInput } from '@/types';

export const assetService = {
  /**
   * Retrieve all equipment assets registered in the infrastructure registry
   */
  async getAssets(): Promise<Asset[]> {
    return await api.getAssets();
  },

  /**
   * Retrieve single asset specifications, telemetry bindings, and state
   */
  async getAssetById(id: string): Promise<Asset> {
    return await api.getAssetById(id);
  },

  /**
   * Register a new asset into the infrastructure platform
   */
  async registerAsset(input: CreateAssetInput): Promise<Asset> {
    return await api.createAsset(input);
  },
};
