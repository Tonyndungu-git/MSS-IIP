import { api, HealthResponse } from '@/lib/api';

export const healthService = {
  /**
   * Ping backend API health check endpoint and measure roundtrip latency
   */
  async checkHealth(): Promise<HealthResponse> {
    return await api.getHealth();
  },
};
