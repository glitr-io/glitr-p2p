import { createContext } from 'react';

interface ContextProps {
    peerId?: string,
    connectedPeers: Map<string, any>
    joinPeer: (peerId: string) => void
};

const PeerContext = createContext(({
    peerId: null,
    connectedPeers: {},
    joinPeer: (peerId: string) => {}
}));

export default PeerContext;
