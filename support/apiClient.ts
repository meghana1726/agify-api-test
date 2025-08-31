import axios from "axios";
import * as https from "node:https";

const apiClient = axios.create({
    baseURL: "https://api.agify.io",
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, // ignore SSL errors
    }),
    timeout: 5000,
});

export default apiClient;
