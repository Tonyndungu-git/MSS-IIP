const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000";



async function apiRequest(
    endpoint: string
){

    const response = await fetch(

        `${API_URL}${endpoint}`,

        {
            cache: "no-store"
        }

    );


    if(!response.ok){

        throw new Error(
            `API request failed: ${endpoint}`
        );

    }


    return response.json();

}





export async function getLatestTelemetry(){

    return apiRequest(
        "/telemetry/latest"
    );

}





export async function getAssets(){

    return apiRequest(
        "/assets/"
    );

}





export async function getAsset(
    id:string
){

    return apiRequest(
        `/assets/${id}`
    );

}