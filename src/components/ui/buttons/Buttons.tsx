import React from 'react';

import AddIcon from "../icons/AddIcon";
import RemoveIcon from "../icons/RemoveIcon";

interface Props {
    children?: string;
    onClick?: any;
    variant?: 'add' | 'remove' | 'submitForm' | null;
    disabled?: boolean;
}

export const Buttons: React.FC<Props> = ({children, onClick, variant}) => {
    if (!variant) {
        return (
            <button className="default-button" onClick={onClick}>
                {children}
            </button>
        );
    }
    switch (variant) {
        case 'submitForm' : 
        return (
            <button className="submit-button" onClick={onClick}>
                {children}
            </button>
        );
        case 'add': 
        return (
            <button className="add-button" onClick={onClick}>
                <AddIcon/>
            </button>
        );
        case 'remove' : 
        return (
            <button className="remove-button" onClick={onClick}>
                <RemoveIcon/>
            </button>
        )
        default: 
        return null
    }
}

