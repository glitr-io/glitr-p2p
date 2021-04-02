# glitr-p2p

## example

# App.js
```js
import React from 'react'
import ReactDOM from 'react-dom'
import GlitrPeerProvider from 'glitr-p2p/Provider'
import YourChildComsumer from './YourChildComsumer'

const apiSchema = [
    {
        type: 'SEND_MESSAGE',
        handler: (req, res, next) => {
            console.log('you can add some reused middleware function here');
            next();
        },
        (req, res, next) => {
            console.log('can handle the data in the request however you want');
            console.log(req.data)
            res.send('optional message to send back to sender in response');
        }
    },

]

const App = (
    <GlitrPeerProvider apiSchema={apiSchema}>
        <YourChildComsumer />
    </GlitrPeerProvider>
)

```

# YourChildComsumer.js
```js
import React, { useState } from 'react'

const YourChildComsumer = {
    
    return ()
}
```