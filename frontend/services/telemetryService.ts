import { api } from '@/lib/api';
import { TelemetryLatestResponse } from '@/types';

export const telemetryService = {
  /**
   * Fetch latest telemetry for a specific asset
   */
  async getLatestTelemetry(
    assetId: string
  ): Promise<TelemetryLatestResponse> {
    return await api.getLatestTelemetry(assetId);
  },
};