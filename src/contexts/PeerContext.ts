import { createContext } from 'react';

const PeerContext = createContext({
    count: 0,
    setCount: (val: number) => { },
});

export default PeerContext;
