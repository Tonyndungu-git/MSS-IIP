import { api } from '@/lib/api';
import { Gateway, CreateGatewayInput } from '@/types';

export const gatewayService = {
  /**
   * Register an industrial edge gateway device
   */
  async createGateway(input: CreateGatewayInput): Promise<Gateway> {
    return await api.createGateway(input);
  },
};
