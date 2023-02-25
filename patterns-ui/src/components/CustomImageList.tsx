import {UserContentApiProp, UserContentProp} from "../types/user-content/types";
import {IconButton, ImageList, ImageListItem, ImageListItemBar, Pagination,} from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import UpdatePicture from "../views/auth/profile/UpdatePicture";

export type CustomImageListProps = {
    data: UserContentApiProp[]
}

const CustomImage = styled.img`
    height: 250px;
    width: 100%;
`

export function CustomImageList({data}: CustomImageListProps) {
    return (
        <>
            <ImageList sx={{width: '100%', height: '100%'}} cols={3} rowHeight={250}>
                {data?.map((item: UserContentApiProp) => (
                    <ImageListItem>
                        <CustomImage
                            src={`data:image/png;base64,${item.content.content}`}
                            alt={item.content.dateTime}
                        />
                        <ImageListItemBar
                            title={item.user.username}
                            subtitle={item.user.username}
                            actionIcon={
                                <IconButton
                                    sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                    aria-label={`info about ${item.user.username}`}
                                >
                                    <UpdatePicture data={item.content}/>
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Pagination count={10} color="secondary"/>
        </>
    );

}