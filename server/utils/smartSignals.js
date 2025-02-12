import { FingerprintJsServerApiClient, Region } from "@fingerprintjs/fingerprintjs-pro-server-api";
import env from "../config/dotenv.js";

export const getVisits=async visitorId=>{
    const client = new FingerprintJsServerApiClient({
        apiKey: env.SECRETS,
        region: Region.EU,
    })
    const visits = await client.getVisits(visitorId);
    return visits;
}
