import React from 'react'
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import EventNoteIcon from "@mui/icons-material/EventNote";

const iconStyle = {
    marginRight: '.5rem',
};

function DefaultStrategy() {
    return [
        {name: 'AADBDT', url: '/aadabt', icon: <AccessibilityNewIcon style={iconStyle}/>},
        {name: 'SignIn', url: '/sign-in', icon: <EventNoteIcon style={iconStyle}/>},
    ];
}

export default DefaultStrategy;