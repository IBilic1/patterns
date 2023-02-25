import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export function baseQuery(baseUrl: string) {
    return fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.append("Access-Control-Allow-Origin", "http://localhost:8080")
            headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        },
        mode: "cors"
    })
}