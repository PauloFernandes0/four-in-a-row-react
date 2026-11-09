import React from 'react';
import './notification.css';

function Notification({ message, visible }) {
    
    if (!visible) return null;

    return (
        <div className="notification">
            <p>{message}</p>
        </div>
    );
}

export default Notification;