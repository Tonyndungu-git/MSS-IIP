'use client';

import { useState, useEffect, useCallback } from 'react';
import { reportService } from '@/services/reportService';
import { ReportItem, Asset, TelemetryLatestResponse } from '@/types';

export function useReports() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await reportService.getReports();
      setReports(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const exportAssetInventory = async (assets: Asset[]): Promise<void> => {
    const csvContent = reportService.generateAssetInventoryCSV(assets);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = `mss-asset-registry-${new Date().toISOString().slice(0, 10)}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const reportRecord: ReportItem = {
      id: `REP-${Date.now().toString().slice(-6)}`,
      title: 'Full Asset Fleet Inventory Registry',
      report_type: 'ASSET_HEALTH',
      format: 'CSV',
      status: 'READY',
      file_size: `${(blob.size / 1024).toFixed(1)} KB`,
      generated_at: new Date().toISOString(),
    };

    await reportService.recordReport(reportRecord);
    await fetchReports();
  };

  const exportTelemetrySnapshot = async (telemetry: TelemetryLatestResponse | null, assetName?: string): Promise<void> => {
    const jsonContent = reportService.generateTelemetrySnapshotJSON(telemetry, assetName);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = `mss-telemetry-frame-${new Date().toISOString().slice(0, 10)}.json`;
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const reportRecord: ReportItem = {
      id: `REP-${Date.now().toString().slice(-6)}`,
      title: 'Real-Time Ingestion Frame Snapshot',
      report_type: 'TELEMETRY_LOG',
      format: 'JSON',
      status: 'READY',
      file_size: `${(blob.size / 1024).toFixed(1)} KB`,
      generated_at: new Date().toISOString(),
    };

    await reportService.recordReport(reportRecord);
    await fetchReports();
  };

  return {
    reports,
    loading,
    refetch: fetchReports,
    exportAssetInventory,
    exportTelemetrySnapshot,
  };
}
