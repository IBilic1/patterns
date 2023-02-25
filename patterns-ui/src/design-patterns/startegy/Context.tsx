import React from 'react'
import AdminStrategy from "./AdminStrategy";
import DefaultStrategy from "./DefaultStrategy";
import AuthStrategy from "./AuthStrategy";

const iconStyle = {
    marginRight: '.5rem',
};
export type ContextProps = {
    context: boolean | null;
}

function Context({context}: ContextProps) {
    switch (context) {
        case true:
            return AdminStrategy()
        case false:
            return AuthStrategy()
        default:
            return DefaultStrategy()
    }
}

export default Context;