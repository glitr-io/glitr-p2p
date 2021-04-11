import { useContext, useState, useEffect } from 'react';
import PeerContext from '../contexts/PeerContext'

export default (peerToConnect?: string) => {
    const [peer, setPeer] = useState(null);
    const {
        peerId,
        connectedPeers,
        joinPeer
    } = useContext(PeerContext);

    useEffect(() => {
        if (peerToConnect && !connectedPeers[peerToConnect]) {
            joinPeer(peerToConnect)
        }
    }, [peerToConnect]);

    useEffect(() => {
        if (peerToConnect && connectedPeers[peerToConnect]) {
            setPeer(connectedPeers[peerToConnect]);
        }
    }, [connectedPeers, peerToConnect])

    console.log('this is from the usePeer file', {
        peerId,
        connectedPeers,
        joinPeer
    });

    // const [peer, setPeer] = useState(null);

    // if (!peer && peerToConnect) {
    //     debugger;
    //     joinPeer(peerToConnect)
    // } else {
    //     debugger;
    //     setPeer(peerToConnect ? connectedPeers[peerToConnect] : null);
    // }
    return {
        peer,
        count: 22,
        setCount: () => console.log('hello world')
    };
};
