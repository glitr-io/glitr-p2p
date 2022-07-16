import React, { useState, useEffect } from 'react'
import usePeer from '../hooks/usePeer'

const TestConsumer = () => {
    const [peerToConnect, setPeerToConnect] = useState('')
    const { peer, peers } = usePeer(peerToConnect);
    const [messageToSend, setMessageToSend] = useState('')

    useEffect(() => {
        setMessageToSend('')
    }, [peers]);

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
                    .SEND_MESSAGE({
                        type: 'SEND_MESSAGE',
                        message: messageToSend
                    })
                }
            >send message</button>

            {peers?.map((peer) => (
                <div key={peer.id}>
                    <input
                        type="text"
                        defaultValue={peer.id}
                        disabled
                    />

                    {/* <button onClick={() => joinPeer(peerToConnect)}>connect to peer</button> */}

                    <input
                        type="text"
                        onChange={({ target: { value } }) => setMessageToSend(value)}
                        value={messageToSend}
                    />

                    <button
                        onClick={() => peer && peer
                            .SEND_MESSAGE({
                                type: 'SEND_MESSAGE',
                                message: messageToSend
                            })
                        }
                    >send message</button>
                </div>
            ))}


        </div>
    )
};

export default TestConsumer;
