import React, {ChangeEvent} from 'react'
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup
} from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {CustomPaper} from "./Profile";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {ContentApiProp} from "../../../types/content/types";
import {useGetAllTagContentsQuery} from "../../../store/query/tag-content/TagContent.query";

const styles = {
    submitDeleteButton: {
        padding: '10px 20px',
        backgroundColor: 'red',
        border: 'none',
        borderRadius: '5px',
        margin: '10px'
    },
    submitAddButton: {
        padding: '10px 20px',
        backgroundColor: 'pink',
        border: 'none',
        borderRadius: '5px',
        margin: '10px'
    },
};

export type CustomImageListProps = {
    data: ContentApiProp
}

function UpdatePicture({data}: CustomImageListProps) {
    const [open, setOpen] = React.useState(false);
    const {data: tags} = useGetAllTagContentsQuery()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
    };

    return (
        <div>
            <AutoAwesomeIcon onClick={handleClickOpen}/>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update picture</DialogTitle>
                <DialogContent>
                    <img
                        src={`data:image/png;base64,${data.content}`}
                        height={"100%"}
                        width={"100%"}
                        alt={data.dateTime}
                    />

                    <CustomPaper elevation={3}>
                        <DialogContentText>
                            <FormGroup>
                                {
                                    tags?.filter(content => content.content.id === data.id)?.map(tag => {
                                        return <FormControlLabel
                                            control={
                                                <Checkbox onChange={handleChange} name="gilad"
                                                          value={tag.id} checkedIcon={<DeleteIcon/>}
                                                          icon={<DeleteOutlineOutlinedIcon/>}/>
                                            }
                                            label={tag.tag.title}
                                        />
                                    })
                                }
                            </FormGroup>
                        </DialogContentText>
                    </CustomPaper>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UpdatePicture;