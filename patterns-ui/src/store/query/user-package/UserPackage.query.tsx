import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "../../query";
import {PackageProp} from "../../../types/package/paths";
import {LoginUserProp, SignUpUserProp, UserApiProp} from "../../../types/user/types";
import {UserPackageApiProp, UserPackageProp, UserUpdatePackageProp} from "../../../types/user-package/paths";
import {TagProp} from "../../../types/tag-content/types";

export const userPackageApi = createApi({
    reducerPath: 'userPackage',
    baseQuery: baseQuery("http://localhost:8080/user-package"),
    tagTypes: ['UserPackage'],
    endpoints: (builder) => ({
        signUp: builder.mutation<UserApiProp, UserPackageProp>({
            query: (payload) => ({
                url: "/register",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ['UserPackage']
        }),
        updateUserPackage: builder.mutation<boolean, UserUpdatePackageProp>({
            query: (payload) => ({
                url: "",
                method: "PUT",
                body: payload
            }),
            invalidatesTags: ['UserPackage']
        }),
        getAllPackageUsers:  builder.query<UserPackageApiProp[], void>({
            query: () => '',
            providesTags: ['UserPackage'],
            keepUnusedDataFor: 0
        }),

    })
})


export const {useSignUpMutation, useUpdateUserPackageMutation, useGetAllPackageUsersQuery} = userPackageApi