import { CLIENT_VERSION, HOST, PORT } from "../constants/env.js";
import { PACKAGE_TYPE_LENGTH, TOTAL_LENGTH } from "../constants/header.js";

export const config = {
    server: {
        port: PORT,
        host: HOST,
    },
    client : {
        CLIENT_VERSION,
    },
    packet:{
        totalLength:TOTAL_LENGTH,
        typeLength: PACKAGE_TYPE_LENGTH,
    }
}