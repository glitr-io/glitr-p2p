import { createContext } from 'react';

interface ContextProps {
    peerId?: string,
    peers: Map<string, any>
    joinPeer: (peerId: string) => void
};

const PeerContext = createContext(({
    peerId: null,
    peers: {},
    joinPeer: (peerId: string) => {}
}));

export default PeerContext;
