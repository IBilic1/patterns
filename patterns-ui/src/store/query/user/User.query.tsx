import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "../../query";
import {LoginUserProp, UserApiProp} from "../../../types/user/types";

export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: baseQuery("http://localhost:8080/user"),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        login: builder.mutation<UserApiProp, LoginUserProp>({
            query: (payload) => ({
                url: "",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ['User']
        })
    })
})


export const {useLoginMutation} = userApi