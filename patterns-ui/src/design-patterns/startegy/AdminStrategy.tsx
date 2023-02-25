import React from 'react'
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const iconStyle = {
    marginRight: '.5rem',
};

function AdminStrategy() {
    return [
        {name: 'AADBDT', url: '/aadabt', icon: <AccessibilityNewIcon style={iconStyle}/>},
        {name: 'Profile', url: '/profile', icon: <SupervisorAccountIcon style={iconStyle}/>},
        {name: 'Admin', url: '/admin', icon: <ColorLensIcon style={iconStyle}/>},
    ];
}

export default AdminStrategy;