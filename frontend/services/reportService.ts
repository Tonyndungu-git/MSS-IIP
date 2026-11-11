import { ReportItem, Asset, TelemetryLatestResponse } from '@/types';

const REPORTS_STORAGE_KEY = 'mss_generated_reports_history';

export const reportService = {
  /**
   * Get past generated audit reports
   */
  async getReports(): Promise<ReportItem[]> {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(REPORTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  /**
   * Generate an asset fleet registry export
   */
  generateAssetInventoryCSV(assets: Asset[]): string {
    const headers = ['ID', 'Name', 'Asset Type', 'Manufacturer', 'Model', 'Serial Number', 'Status', 'Health Score', 'Site ID'];
    const rows = assets.map((a) => [
      a.id,
      `"${a.name.replace(/"/g, '""')}"`,
      a.asset_type,
      `"${a.manufacturer.replace(/"/g, '""')}"`,
      `"${a.model.replace(/"/g, '""')}"`,
      a.serial_number,
      a.status,
      a.health_score ?? 'N/A',
      a.site_id,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  /**
   * Generate a raw telemetry frame snapshot JSON
   */
  generateTelemetrySnapshotJSON(telemetry: TelemetryLatestResponse | null, assetName?: string): string {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        assetName: assetName || 'Fleet',
        telemetryPayload: telemetry || { asset_code: null, telemetry: [] },
      },
      null,
      2
    );
  },

  /**
   * Record a generated report in history
   */
  async recordReport(report: ReportItem): Promise<void> {
    if (typeof window === 'undefined') return;
    const current = await this.getReports();
    const updated = [report, ...current];
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(updated));
  },
};
