import React from 'react'
import {UserContentProp} from "../../types/user-content/types";
import {Chip, Divider, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, TextField,} from "@mui/material";
import {useGetContentsQuery} from "../../store/query/user-content/UserContent.query";
import styled from "@emotion/styled";
import DownloadIcon from '@mui/icons-material/Download';
import ShowPicture from "./ShowPicture";

function downloadOriginal(original: string) {
    const linkSource = `data:application/pdf;base64,${original}`;
    const downloadLink = document.createElement("a");
    const fileName = "original.png";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

const CustomImage = styled.img`
    height: 250px;
    width: 100%;
`
const CustomPaper = styled(Paper)`  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #adbce6 ;
  color: white;
  margin-top: 8px;
`
const ChipWithMargin = styled(Chip)`
    margin: 20px;
    background-color: #0c1326  ;
    color: white;
`

function Main() {
    const {data} = useGetContentsQuery()
    const [author, setAuthor] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };
    return (
        <>
            <TextField id="outlined-basic" label="Search" variant="outlined"
                       onChange={value => setAuthor(value.target.value)}/>
            <CustomPaper elevation={3}>
                <Divider>
                    <ChipWithMargin label="PICTURES"/>
                </Divider>

                <ImageList sx={{width: '100%', height: '100%'}} cols={4} rowHeight={250}>
                    {data?.filter(content => content.user.username.toLowerCase().includes(author.toLowerCase()) || author === ""
                    )?.map((item: UserContentProp) => (
                        <>
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
                                            <DownloadIcon onClick={() => downloadOriginal(item.content.content)}/>
                                            <ShowPicture data={item.content.content}/>
                                        </IconButton>
                                    }
                                />

                            </ImageListItem>
                        </>
                    ))}
                </ImageList>
            </CustomPaper>
        </>
    );
}

export default Main;