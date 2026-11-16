import { supabase, getStoredUser } from "@/lib/supabase";

import {
  Asset,
  Organization,
  Site,
  Gateway,
  TelemetryLatestResponse,
  CreateAssetInput,
  CreateOrgInput,
  CreateSiteInput,
  CreateGatewayInput,
  AssetMetricSetupInput,
} from "@/types";


export type {
  CreateAssetInput,
  CreateOrgInput,
  CreateSiteInput,
  CreateGatewayInput,
  AssetMetricSetupInput,
};



export const DEFAULT_API_URL =
  "http://127.0.0.1:8000";


export const API_BASE_URL =
  DEFAULT_API_URL;



export function getApiBaseUrl(): string {

  if (typeof window !== "undefined") {

    const override =
      localStorage.getItem(
        "mss_api_url_override"
      );


    if (
      override &&
      override.trim()
    ) {
      return override.trim();
    }

  }


  return (
    process.env.NEXT_PUBLIC_API_URL ||
    DEFAULT_API_URL
  );

}




export function setApiBaseUrlOverride(
  url: string | null
): void {


  if (
    typeof window === "undefined"
  ) {
    return;
  }



  if (
    !url ||
    url.trim() === "" ||
    url.trim() === DEFAULT_API_URL
  ) {


    localStorage.removeItem(
      "mss_api_url_override"
    );


  } else {


    localStorage.setItem(
      "mss_api_url_override",
      url.trim()
    );

  }

}





export interface HealthResponse {

  status: string;

  service?: string;

  timestamp?: string;

  latency_ms?: number;

}





async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {


  const baseUrl =
    getApiBaseUrl();



  const url =
    `${baseUrl.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;




  const controller =
    new AbortController();



  const timeoutId =
    setTimeout(
      () => controller.abort(),
      15000
    );



  let accessToken: string | undefined;



  if (supabase) {

    const {
      data
    } =
      await supabase.auth.getSession();


    accessToken =
      data.session?.access_token;

  }




  try {


    const response =
      await fetch(
        url,
        {

          ...options,


          signal:
            controller.signal,


          headers: {


            Accept:
              "application/json",


            "Content-Type":
              "application/json",



            ...(accessToken
              ? {

                Authorization:
                  `Bearer ${accessToken}`

              }
              : {}),



            ...(options.headers || {})

          }

        }

      );



    clearTimeout(timeoutId);




    if (!response.ok) {


      const errorText =
        await response
          .text()
          .catch(
            () => ""
          );



      throw new Error(
        `API error [${response.status}]: ${
          errorText ||
          response.statusText
        }`
      );

    }



    return await response.json();



  }

  catch(error:any) {


    clearTimeout(timeoutId);



    if (
      error.name ===
      "AbortError"
    ) {

      throw new Error(
        "API request timeout. Backend unavailable."
      );

    }



    throw error;

  }


}





export const api = {


  async getOrganizationUsers(
    organization_id:string
  ) {


    return apiFetch<any[]>(
      `users/${organization_id}`
    );

  },



  async removeUser(
    input:{
      user_id:string;
      organization_id:string;
    }
  ) {


    return apiFetch(
      "users/remove",
      {

        method:"DELETE",

        body:
          JSON.stringify(input)

      }
    );

  },



  async getUserContext(
    userId:string
  ) {


    return apiFetch<{

      user_id:string;

      organization_id:string;

      organization_name:string;

      role:string;


    }>(
      `auth/me?user_id=${encodeURIComponent(userId)}`
    );


  },



  async registerTenant(
    input:{
      user_id:string;
      email:string;
      full_name:string;
      organization_name:string;
      industry:string;
      country:string;
    }
  ) {


    return apiFetch(
      "auth/register-tenant",
      {

        method:"POST",

        body:
          JSON.stringify(input)

      }
    );

  },



  async getHealth():
    Promise<HealthResponse> {


    const start =
      performance.now();



    try {


      const data =
        await apiFetch<{

          status?:string;

          service?:string;

        }>(
          "health"
        );



      return {


        status:
          data.status ||
          "ok",


        service:
          data.service ||
          "MSS API",


        timestamp:
          new Date()
          .toISOString(),


        latency_ms:
          Math.round(
            performance.now()-start
          )


      };


    }


    catch {


      return {


        status:"offline",


        service:"MSS API",


        timestamp:
          new Date()
          .toISOString(),


        latency_ms:
          Math.round(
            performance.now()-start
          )


      };


    }


  },
    async getAssets():
    Promise<Asset[]> {


    const data =
      await apiFetch<Asset[]>(
        "assets/"
      );


    return Array.isArray(data)
      ? data
      : [];


  },





  async getAssetById(
    assetId:string
  ):
    Promise<Asset> {


    return apiFetch<Asset>(
      `assets/${assetId}`
    );


  },





  async createAsset(
    input:CreateAssetInput
  ):
    Promise<Asset> {


    return apiFetch<Asset>(
      "assets/",
      {

        method:"POST",

        body:
          JSON.stringify(input)

      }
    );


  },





  async getLatestTelemetry(
    assetId:string
  ):
    Promise<TelemetryLatestResponse> {


    return apiFetch<TelemetryLatestResponse>(
      `telemetry/latest/${assetId}`
    );


  },







  async getOrganizations(
    organization_id?:string
  ):
    Promise<Organization[]> {


    const user =
      getStoredUser();



    const orgId =
      organization_id ||
      user?.organization_id;




    if(!orgId){


      console.warn(
        "No organization_id available"
      );


      return [];


    }




    const data =
      await apiFetch<Organization[]>(
        `organizations/?organization_id=${orgId}`
      );



    return Array.isArray(data)
      ? data
      : [];



  },







  async createOrganization(
    input:CreateOrgInput
  ):
    Promise<Organization> {


    return apiFetch<Organization>(
      "organizations/",
      {

        method:"POST",

        body:
          JSON.stringify(input)

      }
    );


  },







  async getSites():
    Promise<Site[]> {


    const data =
      await apiFetch<Site[]>(
        "sites/"
      );



    return Array.isArray(data)
      ? data
      : [];



  },







  async createSite(
    input:CreateSiteInput
  ):
    Promise<Site> {


    return apiFetch<Site>(
      "sites/",
      {

        method:"POST",

        body:
          JSON.stringify(input)

      }
    );


  },







  async getGateways():
    Promise<Gateway[]> {


    const data =
      await apiFetch<Gateway[]>(
        "gateways/"
      );



    return Array.isArray(data)
      ? data
      : [];



  },







  async createGateway(
    input:CreateGatewayInput
  ):
    Promise<Gateway> {


    return apiFetch<Gateway>(
      "gateways/",
      {

        method:"POST",

        body:
          JSON.stringify(input)

      }
    );


  },







  async setupAssetMetrics(
    input:AssetMetricSetupInput
  ) {


    return apiFetch(
      "asset-metrics/setup",
      {

        method:"POST",

        body:
          JSON.stringify(input)

      }
    );


  }


};