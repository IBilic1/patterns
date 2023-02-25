import React, {ChangeEvent, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Field, Form, Formik, FormikHelpers} from "formik";
import {ContentProp_} from "../../../types/content/types";
import {useAddUserContentMutation} from "../../../store/query/user-content/UserContent.query";
import {UserContentApiProp, UserContentProp} from "../../../types/user-content/types";
import {UserContext} from "../../../App";
import {useAddContentTagMutation, useGetAllTagsQuery} from "../../../store/query/tag-content/TagContent.query";
import {TagProp} from "../../../types/tag-content/types";
import styled from "@emotion/styled";
import {CustomPaper} from "./Profile";

export const styles = {
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
    submitButton2: {
        margin: '10px 0',
        padding: '10px 20px',
        backgroundColor: 'pink',
        border: 'none',
        borderRadius: '5px',
        display: 'block'
    },
};

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  display: block;
  margin: 8px;
  color: #333;
`;

export const Input = styled(Field)`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &[type="email"],
  &[type="password"] {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;


function AddPicture() {
    const [addUserContent] = useAddUserContentMutation()
    const [addTagContent] = useAddContentTagMutation()
    const {data: tags} = useGetAllTagsQuery()
    const [file, setFile] = useState<File | null>(null);
    const {user} = React.useContext(UserContext);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [myTags, setMyTags] = useState<TagProp[] | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const saveTags = (content: UserContentApiProp) => {
        myTags.map(tag => {
            addTagContent({
                tag: {
                    title: tag.title
                },
                content: content.content
            })
        })
    };

    const handleSubmit = (values: ContentProp_) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
                var base64 = btoa(
                    new Uint8Array(reader.result as ArrayBuffer)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                const temp = {
                    content: {
                        content: base64,
                        size: file.size,
                        format: file.name.slice(file.name.lastIndexOf(".") + 1),
                        dateTime: new Date().toISOString()
                    },
                    user: {
                        id: user?.id
                    }
                } as UserContentProp
                const promise = addUserContent(temp).unwrap()
                promise.then(r => r === null ? alert("You have saved too many photos") : saveTags(r));
            };
        }
    };

    const handleSubmitTags = (value: TagProp, {setSubmitting}: FormikHelpers<TagProp>) => {
        const checkAndSave = () => {
            if (myTags.filter(tag => tag.title.toLowerCase() == value.title.toLowerCase()).length == 0) setMyTags([...myTags, value])
        }
        myTags !== null ?
            checkAndSave()
            : setMyTags([value])
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                ADD PICTURE
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add picture</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add some cool picture...
                    </DialogContentText>
                    <Formik
                        initialValues={{image: null} as ContentProp_}
                        onSubmit={handleSubmit}
                    >
                        {({values, handleSubmit, setFieldValue}) => (
                            <Form onSubmit={handleSubmit}>
                                <input name={"image"} type="file" onChange={handleFileChange} style={styles.fileInput}/>
                                <img src={previewUrl} style={styles.imagePreview}/>
                                <button type="submit" style={styles.submitButton}>Submit</button>
                            </Form>
                        )}
                    </Formik>
                    <CustomPaper elevation={3}>
                        <DialogContentText>
                            {
                                myTags?.map(tag => {
                                    return <Label htmlFor="title">{tag.title}</Label>
                                })
                            }
                        </DialogContentText>
                        <Formik
                            initialValues={{} as TagProp}
                            onSubmit={handleSubmitTags}>
                            {({values, handleSubmit: handleSubmit_, setFieldValue}) => (
                                <Form onSubmit={handleSubmit_}>
                                    <Label htmlFor="title">Add tags:</Label>

                                    <Input id="title" name="title" isRequired={true}
                                           variant='auth'
                                           fontSize='sm'
                                           ms={{base: "0px", md: "0px"}}
                                           mb='24px'
                                           fontWeight='500'
                                           size='lg'/>

                                    <button type="submit" style={styles.submitButton2}>Add new tag</button>
                                </Form>
                            )}
                        </Formik>
                    </CustomPaper>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPicture;