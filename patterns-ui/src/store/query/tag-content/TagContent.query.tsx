import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "../../query";
import {PackageProp} from "../../../types/package/paths";
import {LoginUserProp, SignUpUserProp, UserApiProp} from "../../../types/user/types";
import {UserPackageProp, UserUpdatePackageProp} from "../../../types/user-package/paths";
import {UserContentProp} from "../../../types/user-content/types";
import {TagContentApiProp, TagContentProp, TagProp} from "../../../types/tag-content/types";

export const tagContentApi = createApi({
    reducerPath: 'tagContent',
    baseQuery: baseQuery("http://localhost:8080/tag-content"),
    tagTypes: ['TagContent'],
    endpoints: (builder) => ({
        getAllTags:  builder.query<TagProp[], void>({
            query: () => '/tags',
            providesTags: ['TagContent'],
            keepUnusedDataFor: 0
        })
        ,getAllTagContents:  builder.query<TagContentApiProp[], void>({
            query: () => '',
            providesTags: ['TagContent'],
            keepUnusedDataFor: 0
        }),
        addContentTag: builder.mutation<TagContentProp, TagContentProp>({
            query: (payload) => ({
                url: "",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ['TagContent']
        }),
    })
})


export const {useGetAllTagsQuery, useAddContentTagMutation, useGetAllTagContentsQuery} = tagContentApi