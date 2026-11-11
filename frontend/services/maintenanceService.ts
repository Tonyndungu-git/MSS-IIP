import { MaintenanceOrder } from '@/types';

const MAINTENANCE_STORAGE_KEY = 'mss_maintenance_orders';

export const maintenanceService = {
  /**
   * Retrieve active work orders from storage
   */
  async getWorkOrders(): Promise<MaintenanceOrder[]> {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(MAINTENANCE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  /**
   * Create and dispatch a new work order
   */
  async createWorkOrder(order: Omit<MaintenanceOrder, 'id' | 'created_at'>): Promise<MaintenanceOrder> {
    const newOrder: MaintenanceOrder = {
      ...order,
      id: `WO-${Date.now().toString().slice(-6)}`,
      created_at: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      const current = await this.getWorkOrders();
      const updated = [newOrder, ...current];
      localStorage.setItem(MAINTENANCE_STORAGE_KEY, JSON.stringify(updated));
    }

    return newOrder;
  },

  /**
   * Update work order status
   */
  async updateStatus(id: string, status: MaintenanceOrder['status']): Promise<void> {
    if (typeof window === 'undefined') return;
    const current = await this.getWorkOrders();
    const updated = current.map((wo) => (wo.id === id ? { ...wo, status } : wo));
    localStorage.setItem(MAINTENANCE_STORAGE_KEY, JSON.stringify(updated));
  },
};
