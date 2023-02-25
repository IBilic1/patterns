import React from 'react';

import {Link, useLocation} from 'react-router-dom';

import {AccordionSummary, Typography, styled} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {UserContext} from "../../App";
import Context, {ContextProps} from "../../design-patterns/startegy/Context";

const linkStyle = {
    textDecoration: 'none',
    width: '100%',
    padding: '0',
};

const SidebarListItem = styled(ListItem)`
  text-align: center;
  width: 100%;
  padding: 0;
`;

const SidebarLinkButton = styled(ListItemButton)`
  justify-content: left;
  padding: 1.5rem;
  color:#adbce6;
`;

function Sidebar() {
    const {pathname} = useLocation();
    const {user} = React.useContext(UserContext);

    return (
        <List>
            {Context({context: user != null ? user.admin : null}).map((routeName) => {
                return (
                    <>
                        <SidebarListItem>
                            {
                                user === null && routeName.name !== "Profile" &&
                                <Link to={routeName.url} style={linkStyle}>
                                    <SidebarLinkButton selected={routeName.url === pathname} key={pathname}>
                                        <>{routeName.icon}</>
                                        <Typography variant="h6">{routeName.name}</Typography>
                                    </SidebarLinkButton>
                                </Link>
                            }
                            {
                                user !== null &&
                                <Link to={routeName.url} style={linkStyle}>
                                    <SidebarLinkButton selected={routeName.url === pathname} key={pathname}>
                                        <>{routeName.icon}</>
                                        <Typography variant="h6">{routeName.name}</Typography>
                                    </SidebarLinkButton>
                                </Link>
                            }
                        </SidebarListItem>
                    </>
                );
            })}
        </List>
    );
}

export default Sidebar;