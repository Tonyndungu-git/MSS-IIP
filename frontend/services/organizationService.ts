import { api } from '@/lib/api';
import { Organization, CreateOrgInput } from '@/types';

export const organizationService = {
  /**
   * Fetch all organizations
   */
  async getOrganizations(): Promise<Organization[]> {
    return await api.getOrganizations();
  },

  /**
   * Create an organization tenant
   */
  async createOrganization(input: CreateOrgInput): Promise<Organization> {
    return await api.createOrganization(input);
  },
};
