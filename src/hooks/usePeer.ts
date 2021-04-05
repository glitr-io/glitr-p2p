import { useContext, useState } from 'react';
import PeerContext from '../contexts/PeerContext'

export default (peerToConnect?: string) => {
    const {
        peerId,
        connectedPeers,
        joinPeer
    } = useContext(PeerContext);

    console.log('this is from the usePeer file', {
        peerId,
        connectedPeers,
        joinPeer
    });

    const [peer, setPeer] = useState<Map<string, any>>(null);

    // if (!peer && peerToConnect) {
    //     joinPeer(peerToConnect)
    // } else {
        // setPeer(connectedPeers[peerToConnect]);
    // }
    return {
        peer,
        count: 22,
        setCount: () => console.log('hello world')
    };
};
