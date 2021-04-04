import React, { useState, ReactNode } from 'react';
import PeerContext from '../contexts/PeerContext';
git 

export default ({ children }) => {
    const [count, setCount] = useState(0);
    return (
        <PeerContext.Provider value={{ count, setCount }}>
            this is the peerProvider<br />
            {children}
        </PeerContext.Provider>
    );
}