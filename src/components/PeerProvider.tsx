import React, { useState, useEffect, useCallback } from 'react';
import PeerContext from '../contexts/PeerContext';
import Peer from 'peerjs';
import createPeerRouter from '../utils/createPeerRouter';
import routeHandler from '../utils/routeHandler';

export default ({ children, appiSchema = [] }) => {
    const [peer] = useState(new Peer());
    const [peerId, setPeerId] = useState(null);
    const [connectedPeers, setConnectedPeers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [peers, setPeers] = useState([])

    const handleNewConnection = (connection: any) => {
        debugger;
        setConnectedPeers([...connectedPeers, connection]);
        // the following is a hack to get the connectedPeers to update
        connectedPeers.push(connection);
    }

    useEffect(() => {
        if (peer) {
            peer.on('open', (id: string) => {
                console.log('My peer ID is: ' + id);
                setPeerId(id);
            });

            peer.on('connection', function (connection) {
                connection.on('open', function () {
                    console.log('data stream opened');
                    handleNewConnection({ ...connection});
                });
                console.log({ connectedPeers })
                connection.on('data', (data: any) => {
                    const endpointToExecute = appiSchema
                        .find(({ type }) => (type === data.type))

                    if (endpointToExecute) routeHandler(connection, endpointToExecute.handler, data)
                    if (data.type === 'INVITE_TO_ROOM') {
                        setRooms([...rooms, data.data])
                    }
                    if (data.type === 'LEAVING_ROOM') {
                        setRooms(rooms.map(({ peers, roomId, ...room }) => 
                            (peers.contains(connection.peer && data.data.roomId)
                                ? { ...room, peers: peers.filter((peerId) => peerId !== connection.peer) }
                                : { peers, roomId, ...room }
                        )))
                    }
                    if (data.type === 'requestSuccess') {
                        setRooms(rooms.map(({ peers, roomId, ...room }) => 
                            (peers.contains(connection.peer && data.data.roomId)
                                ? { ...room, peers: peers.filter((peerId) => peerId !== connection.peer) }
                                : { peers, roomId, ...room }
                        )))
                    }
                });

                // remove from connectedPeers when disconnected
                connection.on('close', function () {
                    console.log('data stream closed');
                    // remove key from connectedPeers
                    setConnectedPeers({ ...connectedPeers, [connection.peer]: null })
                });
            });
        }
    }, [peer]);

    useEffect(() => {
        setPeers(connectedPeers
            .map((connection: any) => {
                // const connection = connectedPeers[peerId];
                const newPeer = {
                    id: connection.peer,
                    connection
                } as any;

                appiSchema.forEach((endpoint: any) => {
                    newPeer.send = {};
                    newPeer.send[endpoint.type] = (data: any) => {
                        return new Promise((resolve, reject) => {

                            const requestId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                            const responseTimer = setTimeout(() => {
                                reject('Response timeout');
                                connection.send({ status: 'requestFailure', requestId: requestId})
                            }, 5000);

                            connection.on('data', ({type, requestId: peerRequestId}) => {
                                if (type === 'requestSuccess' && requestId === peerRequestId) {
                                    clearTimeout(responseTimer);
                                    resolve({ type: 'requestSuccess', requestId});
                                }
                    
                                if (type === 'requestFailure' && requestId === peerRequestId) {
                                    clearTimeout(responseTimer);
                                    reject({ type: 'requestFailure', requestId});
                                }
                            })

                            connection.send({
                                type: endpoint.type,
                                requestId,
                                data
                            })
                        })
                    }

                    newPeer.recieve = {};
                    newPeer.recieve[endpoint.type] = (handler: any) => {
                        connection.on('data', (data: any) => {
                            if (data.type === endpoint.type) {
                                if (handler.length) routeHandler(connection, handler, data)
                            }
                        })
                    }
                })

                return newPeer;
            })
        )
    }, [connectedPeers])


    const joinPeer = (peerId: string) => {
        console.log('joining peer');
        const connection = peer.connect(peerId);
        handleNewConnection(connection);

        setTimeout(() => {
            // check if connection established or remove it from the state
            if (!connection.open) {
                setConnectedPeers(connectedPeers.filter((connection) => connection.peer !== peerId))
            }
        }, 1000);

        connection.on('data', (data: any) => {
            console.log('some data recieved', { data });

            const endpointToExecute = appiSchema
                .find(({ type }) => (type === data.type))

            if (endpointToExecute) routeHandler(connection, endpointToExecute.handler, data)
            if (data.type === 'INVITE_TO_ROOM') {
                setRooms([...rooms, data.data])
            }
            if (data.type === 'LEAVING_ROOM') {
                setRooms(rooms.map(({ peers, roomId, ...room }) => 
                    (peers.contains(connection.peer && data.data.roomId)
                        ? { ...room, peers: peers.filter((peerId) => peerId !== connection.peer) }
                        : { peers, roomId, ...room }
                )))
            }
        });

        connection.on('close', function () {
            console.log('data stream closed');
            // remove key from connectedPeers
            setConnectedPeers({ ...connectedPeers, [connection.peer]: null })
        });
    }

    const createRoom = () => {
        // create unique room id
        const roomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const newRoom = {
            roomId,
            peers: [peerId],
            // leave: () => {
            //     // emit message to all peers that i am leaving the room
            //     this.peers.map(peerId => {
            //         connectedPeers[peerId].send({
            //             type: 'LEAVING_ROOM',
            //             data: {
            //                 roomId
            //             }
            //         })
            //     })
            //     setRooms(rooms.filter((room) => room.roomId !== roomId))
            // }
        };
        setRooms([...rooms, newRoom]);
        return roomId;
    }
    const inviteToRoom = (peerId: string, roomId: string) => {
        if (!connectedPeers[peerId]) return;
        const room = rooms.find((room) => room.roomId === roomId);
        if (!room) return;

        const connection = connectedPeers[peerId];
        connection.send({
            type: 'INVITE_TO_ROOM',
            data: {
                roomId,
                peers: [...room.peers]
            }
        })
    }

    const leaveRoom = (roomId: string) => {
        const room = rooms.find((room) => room.roomId === roomId);
        if (!room) return;

        room.leave();

        const newRooms = rooms.filter((room) => room.roomId !== roomId);
        setRooms(newRooms);
    }

    return (
        <PeerContext.Provider value={{ peerId, connectedPeers, peers, joinPeer, createRoom, inviteToRoom, rooms }}>
            {children}
        </PeerContext.Provider>
    );
}