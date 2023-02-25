import React from 'react'
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const iconStyle = {
    marginRight: '.5rem',
};

function AuthStrategy() {
    return [
        {name: 'AADBDT', url: '/aadabt', icon: <AccessibilityNewIcon style={iconStyle}/>},
        {name: 'Profile', url: '/profile', icon: <SupervisorAccountIcon style={iconStyle}/>},
    ];
}

export default AuthStrategy;