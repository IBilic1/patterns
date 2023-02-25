import {PackageProp, PackageTestProp} from "../package/paths";
import {SignUpUserProp, UserApiProp, UserProp} from "../user/types";
import {ContentApiProp, ContentProp} from "../content/types";

export type UserContentProp = {
    content : ContentProp,
    user: UserApiProp,
}

export type UserContentApiProp = {
    id :number,
    content : ContentApiProp,
    user: UserApiProp,
}

export type UserConsumptionProp = {
    id:number,
    package_ : PackageProp,
    user: UserApiProp,
    uploadSize :number,
    dailyUploadLimit:number
}
