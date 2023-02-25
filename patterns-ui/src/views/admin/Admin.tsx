import React from 'react'
import {
    Chip,
    Divider,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {CustomPaper} from "../auth/profile/Profile";
import styled from "@emotion/styled";
import {useGetAllPackageUsersQuery} from "../../store/query/user-package/UserPackage.query";
import EditProfile from "./EditProfile";
import {useGetConsumptionQuery} from "../../store/query/user-content/UserContent.query";

const ChipWithMargin = styled(Chip)`
    margin: 20px;
    background-color: #0c1326  ;
    color: white;
`
const CustomLinearProgress = styled(LinearProgress)`
    height: 20px;
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
`

function Admin() {
    const {data} = useGetAllPackageUsersQuery()
    const {data: consumptions} = useGetConsumptionQuery()

    return (
        <CustomPaper elevation={3}>
            <Divider>
                <ChipWithMargin label="ADMIN PANEL"/>
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
                            <TableCell>Package</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data?.map(userPackage => {
                                return <TableRow>
                                    <TableCell>{userPackage?.user?.email}</TableCell>
                                    <TableCell>{userPackage?.user?.username}</TableCell>
                                    <TableCell>{userPackage?.package_?.title}</TableCell>
                                    <TableCell><EditProfile userPackage={userPackage}/></TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider>
                <ChipWithMargin label={`PROGRESS BAR FOR TODAY: ${new Date().toDateString()}`}/>
            </Divider>
            {
                data?.map(userPackage => {
                    return (
                        <>
                            {userPackage?.user.email}
                            <CustomLinearProgress
                                aria-valuemax={userPackage.package_.dailyUploadLimit}
                                variant="determinate"
                                color="secondary"
                                value={consumptions?.filter(content => content.user.email === userPackage.user?.email)[0]?.dailyUploadLimit}
                            />
                        </>

                    );
                })
            }

        </CustomPaper>


    );
}

export default Admin;