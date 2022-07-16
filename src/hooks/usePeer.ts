import { useContext, useState, useEffect } from 'react';
import PeerContext from '../contexts/PeerContext'

export default (peerToConnect?: string) => {
    const [peer, setPeer] = useState(null);
    const context = useContext(PeerContext);
    const {
        peerId,
        connectedPeers,
        peers,
        joinPeer,
        createRoom,
        inviteToRoom,
        rooms
    } = context;

    console.log('inside usePeer():', { peerId, connectedPeers, peers, peerToConnect });

    useEffect(() => {
        if (peerToConnect && !Object.keys(peers).includes(peerToConnect)) {
            joinPeer(peerToConnect)
        }
    }, [peerToConnect]);

    useEffect(() => {
        if (peerToConnect && Object.keys(peers).includes(peerToConnect)) {
            setPeer(peers.find(peer => peer.id === peerToConnect));
        }
    }, [peers, peerToConnect])

    return {
        ...context,
        peer
    };
};
