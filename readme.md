# glitr-p2p

## example

# App.js
```js
import React from 'react'
import ReactDOM from 'react-dom'
import GlitrPeerProvider from 'glitr-p2p/Provider'
import YourChildComsumer from './YourChildComsumer'

const App = (
    <GlitrPeerProvider>
        <YourChildComsumer />
    </GlitrPeerProvider>
)

```

# YourChildComsumer.js
```js
import React, { useState } from 'react'
import usePeer from 'glitr-p2p/usePeer'

const YourChildComsumer = {

    const  = [
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

    const [peerToConnect, setPeerToConnect] = useState('')
    const [peerConnection, joinPeer] = usePeer(apiSchema)
    const [messageToSend, setMessageToSend] = useState('')

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
                onClick={() => peerConnection
                    .send('SEND_MESSAGE', messageToSend)
                    .then(response => console.log('response:', response))
                    .catch((e) => console.log('no response back from peer', e))
                }
            >send message</button>
        </>
    )
}
```