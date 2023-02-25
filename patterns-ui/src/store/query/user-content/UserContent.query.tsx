import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "../../query";
import {UserConsumptionProp, UserContentApiProp, UserContentProp} from "../../../types/user-content/types";
import React from "react";

export const userContentApi = createApi({
    reducerPath: 'UserContent',
    baseQuery: baseQuery("http://localhost:8080/user-content"),
    tagTypes: ['UserContent'],
    endpoints: (builder) => ({
        addUserContent: builder.mutation<UserContentApiProp, UserContentProp>({
            query: (payload) => ({
                url: "",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ['UserContent']
        }),
        getContents: builder.query<UserContentApiProp[], void>({
            query: () => '/all',
            providesTags: ['UserContent'],
            keepUnusedDataFor: 0
        }),
        getConsumption: builder.query<UserConsumptionProp[], void>({
            query: () => `/consumption`,
            providesTags: ['UserContent'],
            keepUnusedDataFor: 0
        })
    })
})


export const {useAddUserContentMutation, useGetContentsQuery, useGetConsumptionQuery} = userContentApi