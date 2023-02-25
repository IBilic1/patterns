import React from 'react';
import {
    AppBar,
    Badge,
    Box,
    FormControlLabel,
    FormGroup,
    IconButton,
    styled,
    Switch as MuiSwitch,
    Toolbar,
    Typography
} from "@mui/material";
import {UserContext} from "../../App";

const AppBarCustom = styled(AppBar)`
  margin-bottom: 2rem;
  background-color:#adbce6;
`;
function AppBar() {
    const {user, setUser} = React.useContext(UserContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.checked ? user : null);
    };

    return (
        <AppBarCustom>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{mr: 2}}
                >
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{display: {xs: 'none', sm: 'block'}}}
                >
                    AADBDT
                </Typography>
                <Box sx={{flexGrow: 1}}/>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error"></Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={17} color="error"> </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <MuiSwitch
                                        checked={user !== null}
                                        onChange={handleChange}
                                        aria-label="login switch"
                                    />
                                }
                                label={user ? 'Login' : 'Logout'}
                            />
                        </FormGroup>
                    </IconButton>

                </Box>
                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-haspopup="true"
                        color="inherit"
                    ></IconButton>
                </Box>
            </Toolbar>
        </AppBarCustom>
    );
}

export default AppBar;