import React, { useState, useEffect } from 'react';
import PeerContext from '../contexts/PeerContext';
import Peer from 'peerjs';

export default ({ children = [] }) => {
    const [peer] = useState(new Peer());
    const [peerId, setPeerId] = useState(null);
    const [connectedPeers, setConnectedPeers] = useState({});
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (peer) {
            peer.on('open', (id: string) => {
                console.log('My peer ID is: ' + id);
                setPeerId(id);
            });

            peer.on('connection', function (connection) {
                console.log('someone connected', { connection });

                connection.on('open', function () {
                    setConnectedPeers({ ...connectedPeers, [connection.peer]: connection })
                });
                // setPeerConnection(conn);
            });

            // peer.on('data', (conn: any) => {
            //     console.log('some data rec~ieved', { conn });
            // });
        }
    }, [peer]);

    const joinPeer = (peerId: string) => {
        console.log('joining peer');
        const connection = peer.connect(peerId);
        setConnectedPeers(({ ...connectedPeers, [connection.peer]: connection }));
    }

    const createRoom = () => setRooms({...rooms, [rooms.length]: { id: rooms.length, peers: [] }});
    const inviteToRoom = (roomId: number, peerId: string) => {
        // need to add this part
    }

    return (
        <PeerContext.Provider value={{ peerId, peers, joinPeer }}>
            this is the peerProvider<br />
            {children}
        </PeerContext.Provider>
    );
}