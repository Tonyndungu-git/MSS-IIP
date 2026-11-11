'use client';

import { useState, useEffect, useCallback } from 'react';
import { maintenanceService } from '@/services/maintenanceService';
import { MaintenanceOrder } from '@/types';

export function useMaintenance() {
  const [orders, setOrders] = useState<MaintenanceOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await maintenanceService.getWorkOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const dispatchOrder = async (order: Omit<MaintenanceOrder, 'id' | 'created_at'>): Promise<MaintenanceOrder> => {
    const created = await maintenanceService.createWorkOrder(order);
    await fetchOrders();
    return created;
  };

  const updateOrderStatus = async (id: string, status: MaintenanceOrder['status']): Promise<void> => {
    await maintenanceService.updateStatus(id, status);
    await fetchOrders();
  };

  return {
    orders,
    loading,
    refetch: fetchOrders,
    dispatchOrder,
    updateOrderStatus,
  };
}
