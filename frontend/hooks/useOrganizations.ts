'use client';

import { useState, useEffect, useCallback } from 'react';
import { organizationService } from '@/services/organizationService';
import { Organization, CreateOrgInput } from '@/types';

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await organizationService.getOrganizations();
      setOrganizations(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch organizations from API');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const createOrganization = async (input: CreateOrgInput): Promise<Organization> => {
    const created = await organizationService.createOrganization(input);
    await fetchOrganizations();
    return created;
  };

  return {
    organizations,
    loading,
    error,
    refetch: fetchOrganizations,
    createOrganization,
  };
}
