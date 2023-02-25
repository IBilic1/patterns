import {ContentApiProp, ContentProp} from "../content/types";

export type TagProp = {
    id: number,
    title: string
}

export type TagCreateProp = {
    title: string
}

export type TagContentProp = {
    tag:TagCreateProp,
    content: ContentApiProp
}

export type TagContentApiProp = {
    id:number,
    tag:TagCreateProp,
    content: ContentApiProp
}