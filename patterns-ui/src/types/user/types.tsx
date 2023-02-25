export type LoginUserProp = {
    email: string;
    password: string;
}

export type SignUpUserProp = {
    email: string;
    username: string;
    password: string;
}

export type UserApiProp = {
    id: number;
    email: string;
    username: string;
    password: string;
    admin: boolean;
}

export type UserProp = {
    id: number;
}