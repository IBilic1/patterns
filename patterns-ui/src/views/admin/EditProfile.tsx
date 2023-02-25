import React from "react";
import {Field, Form, Formik} from "formik";
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";
import {useGetPackagesQuery} from "../../store/query/package/Package.query";
import {useSignUpMutation} from "../../store/query/user-package/UserPackage.query";
import {UserPackageApiProp, UserPackageProp} from "../../types/user-package/paths";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    SelectChangeEvent
} from "@mui/material";
import {UserApiProp} from "../../types/user/types";
import {UserContext} from "../../App";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SelectField from "../../components/SelectField";
import {UserContentApiProp} from "../../types/user-content/types";

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  display: block;
  margin: 8px;
  color: #333;
`;

const Input = styled(Field)`
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #4CAF50;
  color: white;
  margin-top: 8px;
  cursor: pointer;
`;

const RegisterButton = styled(SubmitButton)`
    background-color: #800080;
`

const DropDown = styled(Input)`
    margin-top: 8px;
`
export type EditProfileProps = {
    userPackage: UserPackageApiProp
}


function EditProfile({userPackage}: EditProfileProps) {
    const [signUp] = useSignUpMutation()
    const {data} = useGetPackagesQuery()
    const [open, setOpen] = React.useState(false);
    const {setUser} = React.useContext(UserContext);
    const history = useHistory()

    const handleClick = () => {
        history.push("/profile");
    };

    const handleSubmit = (prop: UserPackageProp) => {
        const x = signUp({
            package_: {
                id: prop.package_.id,
            },
            user: {
                email: prop.user.email,
                username: prop.user.username,
                password: prop.user.password,
            },
            dateTime: new Date().toISOString()
        }).unwrap()
        const callback = (r: UserApiProp) => {
            setUser(r)
            handleClick()
        }

        x.then(r => r == null ? alert("This user already exists") : callback(r));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AutoAwesomeIcon onClick={handleClickOpen}/>
            <Dialog open={open}>
                <DialogTitle>Update user</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            package_: {
                                id: userPackage.package_.id,
                            },
                            user: {
                                email: userPackage.user.email,
                                username: userPackage.user.username,
                                password: userPackage.user.password,
                            },
                            dateTime: userPackage.dateTime
                        } as UserPackageProp}
                        onSubmit={handleSubmit}>
                        {props => (
                            <Form>
                                <Field name="package_.id" size="small" inputLabel="Available packages"
                                       component={SelectField}>
                                    <MenuItem value={-1} key={-1} disabled>
                                        ...
                                    </MenuItem>
                                    {data?.map(package_ => (
                                        <MenuItem key={package_.id} value={package_.id}>
                                            {package_.title}
                                        </MenuItem>
                                    ))}
                                </Field>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="user.email" placeholder="mail@simmmple.com" isRequired={true}
                                       variant='auth'
                                       fontSize='sm'
                                       ms={{base: "0px", md: "0px"}}
                                       type='email'
                                       mb='24px'
                                       fontWeight='500'
                                       size='lg'/>
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="user.username" placeholder="username" isRequired={true}
                                       variant='auth'
                                       fontSize='sm'
                                       ms={{base: "0px", md: "0px"}}
                                       mb='24px'
                                       fontWeight='500'
                                       size='lg'/>
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="user.password" isRequired={true}
                                       variant='auth'
                                       fontSize='sm'
                                       ms={{base: "0px", md: "0px"}}
                                       type='password'
                                       mb='24px'
                                       fontWeight='500'
                                       size='lg'/>
                                <RegisterButton type="submit">Submit</RegisterButton>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>


    );
}

export default EditProfile;
