import React from "react";
import {Field, Form, Formik, useField} from "formik";
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";
import {useGetPackagesQuery} from "../../../store/query/package/Package.query";
import {useSignUpMutation} from "../../../store/query/user-package/UserPackage.query";
import {UserPackageProp} from "../../../types/user-package/paths";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {SignUpUserProp, UserApiProp} from "../../../types/user/types";
import {UserContext} from "../../../App";
import SelectField from "../../../components/SelectField";

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

const Button = styled.button`
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

const RegisterButton = styled(Button)`
    background-color: #800080;
`

const DropDown = styled(Input)`
    margin-top: 8px;
`

function SignUp() {
    const [signUp] = useSignUpMutation()
    const {data} = useGetPackagesQuery()
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

    return (
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
                    <Button type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
}

export default SignUp;
