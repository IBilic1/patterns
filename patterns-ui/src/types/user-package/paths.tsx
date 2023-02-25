import {SignUpUserProp, UserApiProp} from "../user/types";
import {PackageProp, PackageTestProp} from "../package/paths";

export type UserPackageProp = {
    package_ : PackageTestProp,
    user: SignUpUserProp,
    dateTime : string
}

export type UserPackageApiProp = {
    id:number,
    package_ : PackageProp,
    user: SignUpUserProp,
    dateTime : string
}

export type UserUpdatePackageProp = {
    package_ : PackageTestProp,
    user: UserApiProp,
    dateTime : string
}
