import React from "react";
import {Field, Form, Formik} from "formik";
import {LoginUserProp, UserApiProp} from "../../../types/user/types";
import {useLoginMutation} from "../../../store/query/user/User.query";
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../../App";
import {Box, Paper} from "@mui/material";

const CustomPaper = styled(Paper)`
  width: 50%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid;
  border-radius: 4px;
  color: white;
  margin-top: 8px;
`

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

const SubmitButton = styled(Button)`
    background-color: #1E005A;
`

function SignIn() {
    const [login] = useLoginMutation()
    const history = useHistory();
    const {setUser} = React.useContext(UserContext);
    const handleClick = () => {
        history.push("/sign-up");
    };

    const callback = (r: UserApiProp) => {
        setUser(r)
        history.push("/profile");
    }

    const handleSubmit = (prop: LoginUserProp) => {
        const promise = login(prop).unwrap()
        promise.then(r => r == null ? alert(`User with provided email ${prop.email} does not exists.`) : callback(r));
    };
    return (
        <Box display={"flex"} justifyContent={"center"}>
            <CustomPaper>
                <Formik
                    initialValues={{} as LoginUserProp}
                    onSubmit={handleSubmit}>
                    <Form>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" placeholder="mail@simmmple.com" isRequired={true}
                               variant='auth'
                               fontSize='sm'
                               ms={{base: "0px", md: "0px"}}
                               type='email'
                               mb='24px'
                               fontWeight='500'
                               size='lg'/>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" placeholder="123456789" isRequired={true}
                               variant='auth'
                               fontSize='sm'
                               ms={{base: "0px", md: "0px"}}
                               type='password'
                               mb='24px'
                               fontWeight='500'
                               size='lg'/>
                        <SubmitButton type="submit">Submit</SubmitButton>
                        <RegisterButton onClick={handleClick}>Register</RegisterButton>
                    </Form>
                </Formik>
            </CustomPaper>
        </Box>


    );
}

export default SignIn;
