import React from 'react'

import {Drawer} from '@mui/material';
import Sidebar from "./Sidebar";
const drawerStyle = {
    width: '15%',
    marginTop: '150px',
    flexShrink: 0,
    border: 'none',

    '& .MuiDrawer-paper': {
        width: '15%',
        marginTop: '150px',
        boxSizing: 'border-box',
        border: 'none',
    },
};

function SidebarContainer() {
    return (
        <Drawer sx={drawerStyle} variant="permanent" anchor="left">
            <Sidebar />
        </Drawer>
    );
}

export default SidebarContainer;