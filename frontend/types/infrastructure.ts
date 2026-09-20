export type AssetStatus =
    | "AVAILABLE"
    | "CHARGING"
    | "IDLE"
    | "WARNING"
    | "FAULT"
    | "OFFLINE";



export interface Telemetry {


    id:string;

    metric:string;

    value:number;

    unit:string;

    timestamp:string;

}



export interface InfrastructureAsset {


    id:string;


    asset_code:string;


    name:string;


    type:string;


    category:string;


    location:string;


    status:AssetStatus;



    telemetry:{


        power_kw?:number;


        temperature?:number;


        energy_kwh?:number;


    };



    health:number;


    last_seen:string;


}