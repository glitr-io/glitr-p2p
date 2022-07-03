# glitr-p2p

## example

# App.js
```js
import React from 'react'
import ReactDOM from 'react-dom'
import GlitrPeerProvider from 'glitr-p2p/Provider'
import YourChildComsumer from './YourChildComsumer'

const App = {
    const appiSchema = [
        {
            type: 'SEND_MESSAGE',
            handler: [(req, res, next) => {
                console.log('you can add some reused middleware function here');
                next();
            },
            (req, res) => {
                console.log('can handle the data in the request however you want');
                console.log(req.data)
                res.send('optional message to send back to sender in response');
            }]
        },
    ];

    return ( 
        <GlitrPeerProvider appiSchema={appiSchema}>
            <YourChildComsumer />
        </GlitrPeerProvider>
    );
}

```

# p2p-connection.js
```js
import React, { useState } from 'react'
import usePeer from 'glitr-p2p/usePeer'

const YourChildComsumer = () => {

    const { joinPeer, peers, createRoom, rooms } = useGlitrP2P(apiSchema)
    const [peerToConnect, setPeerToConnect] = useState('')
    const [messageToSend, setMessageToSend] = useState('')

    useEffect(() => {
        if (Object.keys(peers)) {
            Object.keys(peers).forEach(peer => {
                peer.on('SEND_MESSAGE', (payload, done) => {
                    console.log('SEND_MESSAGE', { payload, peerId: peer.id });
                    done()
                });
            });
        }

        if (Object.keys(peers)) {
            return () => Object.keys(peers).forEach(peer => {
                peer.off('SEND_MESSAGE');
            });
        }
    }, [peers]);

    const sendMessageToPeer = (peerId, payload) => peers
        .find(peer => peer.id = peerId]
        .send('SEND_MESSAGE', payload)
        .catch((e) => console.log('no response back from peer', e))

    return (
        <>
            <input
                type="text"
                onChange={({ target: value }) => setPeerToConnect(value)}
                value={peerToConnect}
            />

            <button onClick={() => joinPeer(peerToConnect)}>connect to peer</button>

            <input
                type="text"
                onChange={({ target: value }) => setMessageToSend(value)}
                value={messageToSend}
            >

            <button
                onClick={() => sendMessageToPeer(peerToConnect, messageToSend)}
            >send message</button>
        </>
    )
}
```

# p2p-room-connection.js
```js
import React, { useState } from 'react'
import useGlitrP2P from 'glitr-p2p/useGlitrP2P'

const YourChildComsumer = () => {

    const { joinPeer, peers, createRoom, inviteToRoom rooms } = useGlitrP2P()
    const [peerToConnect, setPeerToConnect] = useState('')
    const [messageToSend, setMessageToSend] = useState('')
    const [roomToJoin, setRoomToJoin] = useState('')
    const [roomForInviting, setRoomForInviting] = useState('')
    const [setRoomForInviting, setRoomForInviting] = useState('')
    

    useEffect(() => {
        if (Object.keys(rooms)) {
            Object.keys(rooms).forEach(room => {
                room.on('SEND_MESSAGE', (payload, done) => {
                    console.log('SEND_MESSAGE', { payload, roomId: room.id });
                    done();
                });
            });
        }

        if (Object.keys(rooms)) {
            return () => Object.keys(rooms).forEach(room => {
                room.off('SEND_MESSAGE');
            });
        }
    }, [peers]);

    const createNewRoom = () => createRoom();
    const invite = (roomId, peerId) = inviteToRoom(roomId, peerId);

    const sendMessageToRoom = (roomId, payload) => peers
        .find(room => room.id = roomId]
        .send('SEND_MESSAGE', payload)
        .catch((e) => console.log('no response back from room', e))

    return (
        <>
            <input
                type="text"
                placeholder="peerToConnect"
                onChange={({ target: value }) => setPeerToConnect(value)}
                value={peerToConnect}
            />

            <button onClick={() => joinPeer(peerToConnect)}>connect to peer</button>

            <button onClick={() => createNewRoom()}>createRoom</button>

            <input
                type="text"
                placeholder="roomForInviting"
                onChange={({ target: value }) => setRoomForInviting(value)}
                value={roomForInviting}
            />
            <input
                type="text"
                placeholder="peerToConnectToRoom"
                onChange={({ target: value }) => setPeerToConnectToRoom(value)}
                value={peerToConnectToRoom}
            />
            <button onClick={() => invite(peerToConnectToRoom)}>createRoom</button>

            <input
                type="text"
                placeholder="messageToSend"
                onChange={({ target: value }) => setMessageToSend(value)}
                value={messageToSend}
            >

            <button
                onClick={() => sendMessageToPeer(peerToConnect, messageToSend)}
            >send message</button>
        </>
    )
}
```