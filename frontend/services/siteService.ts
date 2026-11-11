import { api } from '@/lib/api';
import { Site, CreateSiteInput } from '@/types';

export const siteService = {
  /**
   * Provision a physical site location
   */
  async createSite(input: CreateSiteInput): Promise<Site> {
    return await api.createSite(input);
  },
};
