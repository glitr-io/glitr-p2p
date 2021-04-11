import React, { useState, useEffect } from 'react'
import usePeer from '../hooks/usePeer'

const TestConsumer = () => {
    const [peerToConnect, setPeerToConnect] = useState('')
    const { peer } = usePeer(peerToConnect);
    const [messageToSend, setMessageToSend] = useState('')

    useEffect(() => {
        if (peer) {
            peer.on('open', () => {
                peer.on('data', (data: any, payload: any) => console.log('some data recieved:', data, payload));
                peer.on('data', (data: any, payload: any) => console.log('some data recieved!!!!:', data, payload));
                peer.on('data', (data: any, payload: any) => console.log('some data recieved??????:', data, payload));
            })
        }
    }, [peer])

    return (
        <div>
            <input
                type="text"
                onChange={({ target: { value } }) => setPeerToConnect(value)}
                value={peerToConnect}
            />

            {/* <button onClick={() => joinPeer(peerToConnect)}>connect to peer</button> */}

            <input
                type="text"
                onChange={({ target: { value } }) => setMessageToSend(value)}
                value={messageToSend}
            />

            <button
                onClick={() => peer && peer
                    .send({
                        type: 'SEND_MESSAGE',
                        message: messageToSend
                    })
                }
            >send message</button>
        </div>
    )
};

export default TestConsumer;
