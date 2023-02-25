import React from 'react'
import {
    Button,
    Chip,
    Divider,
    makeStyles,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import AddPicture from "./AddPicture";
import {Field, Form, Formik} from "formik";
import {UserPackageProp} from "../../../types/user-package/paths";
import {useGetPackagesQuery} from "../../../store/query/package/Package.query";
import {
    useGetAllPackageUsersQuery,
    useUpdateUserPackageMutation
} from "../../../store/query/user-package/UserPackage.query";
import {UserContext} from "../../../App";
import {useHistory} from "react-router-dom";
import {useGetConsumptionQuery, useGetContentsQuery} from "../../../store/query/user-content/UserContent.query";
import SelectField from "../../../components/SelectField";
import styled from "@emotion/styled";
import {CustomImageList} from "../../../components/CustomImageList";

const ChipWithMargin = styled(Chip)`
    margin: 20px;
    background-color: #0c1326  ;
    color: white;
`

const ChipPackage = styled(Chip)`
    color: #FFD700 ;
    border: 1px solid #FFD700;
`
export const CustomPaper = styled(Paper)`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #adbce6 ;
  color: white;
  margin-top: 8px;
`

const ContentPaper = styled(CustomPaper)` 
  background-color: #add8e6 ;
`

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 8px;
  color: #333;
`;

function Profile() {
    const {data} = useGetPackagesQuery()
    const [updateUserPackage] = useUpdateUserPackageMutation()
    const {user} = React.useContext(UserContext);
    const {data: myContent} = useGetContentsQuery()
    const {data: consumptions, refetch } = useGetConsumptionQuery()
    const {data: userPackages} = useGetAllPackageUsersQuery()
    const history = useHistory()

    const handleClick = () => {
        history.push("/profile");
    };
    const callback = (r: boolean) => {
        alert("Your package is sucessfully updated.")
        handleClick()
        refetch()
    }
    const handleSubmit = (prop: UserPackageProp) => {
        const x = updateUserPackage({
            package_: {
                id: prop.package_.id,
            },
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                password: user.password,
                admin: false
            },
            dateTime: new Date().toISOString()
        }).unwrap()

        x.then(r => r == false ? alert("You have already change package in last 24h.") : callback(r));

    };

    return (
        <> <CustomPaper elevation={3}>
            <Divider>
                <ChipWithMargin label="ADD PICTURE"/>
            </Divider>
            <AddPicture/>
        </CustomPaper>
            <CustomPaper elevation={3}>
                <Divider>
                    <ChipWithMargin label="ABOUT ME"/>
                </Divider>
                <TableContainer
                    component={Paper}
                    variant="outlined"
                >
                    <Table aria-label="demo table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Spent daily upload limit</TableCell>
                                <TableCell>Spent daily upload size</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user?.username}</TableCell>
                                <TableCell>{consumptions?.filter(content => content.user.id === user?.id)[0]?.dailyUploadLimit}</TableCell>
                                <TableCell>{consumptions?.filter(content => content.user.id === user?.id)[0]?.uploadSize}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomPaper>


            <CustomPaper elevation={3}>
                <Divider>
                    <ChipWithMargin label="PACKAGE"/>
                </Divider>
                <p>
                    <Label>CURRENT PACKAGE:</Label> <ChipPackage
                    label={userPackages?.filter(content => content.user.email === user?.email)[0]?.package_.title}
                    color="primary" variant="outlined"/>
                </p>
                <Formik
                    initialValues={{
                        package_: {
                            id: null,
                        },
                        user: {
                            email: '',
                            username: '',
                            password: '',
                        },
                        dateTime: ''
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
                            <Button type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </CustomPaper>
            <ContentPaper elevation={3}>
                <Divider>
                    <ChipWithMargin label="MY IMAGES"/>
                </Divider>
                <CustomImageList data={myContent?.filter(content => content.user.id === user?.id)}/>
            </ContentPaper>

        </>);
}

export default Profile;