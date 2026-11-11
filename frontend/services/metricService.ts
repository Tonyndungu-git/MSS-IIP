import { api } from '@/lib/api';
import { AssetMetricSetupInput } from '@/types';

export const metricService = {
  /**
   * Configure metric registers on an industrial asset
   */
  async setupAssetMetrics(input: AssetMetricSetupInput): Promise<any> {
    return await api.setupAssetMetrics(input);
  },
};
