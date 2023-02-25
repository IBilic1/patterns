import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "../../query";
import {PackageProp} from "../../../types/package/paths";

export const packageApi = createApi({
    reducerPath: 'package',
    baseQuery: baseQuery("http://localhost:8080/package"),
    tagTypes: ['Package'],
    endpoints: (builder) => ({
        getPackages: builder.query<PackageProp[], void>({
            query: () => ''
        })
    })
})


export const {useGetPackagesQuery} = packageApi