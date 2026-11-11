'use client';

import { useState, useEffect, useCallback } from 'react';
import { telemetryService } from '@/services/telemetryService';
import { TelemetryLatestResponse } from '@/types';


export function useTelemetry(
  assetId: string | null,
  autoPoll: boolean = true,
  pollIntervalMs: number = 5000
) {

  const [telemetry, setTelemetry] =
    useState<TelemetryLatestResponse | null>(null);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string | null>(null);

  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);



  const fetchTelemetry = useCallback(async () => {


    if (!assetId) {

      setTelemetry(null);
      setLoading(false);
      setError(null);

      return;

    }


    try {

      setLoading(true);


      const data =
        await telemetryService.getLatestTelemetry(assetId);



      setTelemetry(data);

      setLastUpdated(
        new Date()
      );

      setError(null);



    } catch (err: any) {


      console.error(
        "Telemetry fetch failed:",
        err
      );


      setError(
        err?.message ||
        "Failed to fetch telemetry from API"
      );


      setTelemetry(null);



    } finally {


      setLoading(false);


    }


  }, [assetId]);





  useEffect(() => {


    fetchTelemetry();



    if (
      autoPoll &&
      assetId &&
      pollIntervalMs > 0
    ) {


      const interval =
        setInterval(
          fetchTelemetry,
          pollIntervalMs
        );



      return () =>
        clearInterval(interval);


    }


  }, [
    fetchTelemetry,
    autoPoll,
    pollIntervalMs,
    assetId
  ]);





  return {

    telemetry,

    loading,

    error,

    lastUpdated,

    refetch: fetchTelemetry

  };

}