import React from 'react'
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

const styles = {
    fileInput: {
        padding: '10px',
        margin: '10px 0',
        backgroundColor: 'lightgray',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    imagePreview: {
        width: '60%',
        height: '60%',
        margin: '10px 10px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: 'lightblue',
        border: 'none',
        borderRadius: '5px',
        display: 'block'
    },
};

export type CustomImageListProps = {
    data: string
}

function ShowPicture({data}: CustomImageListProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AddBoxIcon onClick={handleClickOpen}/>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <img
                        src={`data:image/png;base64,${data}`}
                        height={"100%"}
                        width={"100%"}
                        alt={data}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ShowPicture;