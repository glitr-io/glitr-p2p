import { createContext } from 'react';

interface ContextProps {
    peerId?: string,
    connectedPeers: {[key: string]: any},
    peers: {[key: string]: any},
    rooms: {[key: string]: any},
    joinPeer: (peerId: string) => void,
    inviteToRoom: (peerId: string, roomId: string) => void,
    createRoom: (peerId: string) => void
};

const PeerContext = createContext(({
    peerId: null,
    connectedPeers: {},
    peers: [],
    rooms: [],
    joinPeer: (peerId: string) => {},
    inviteToRoom: (peerId: string, roomId: string) => {},
    createRoom: () => {}
}));

export default PeerContext;
