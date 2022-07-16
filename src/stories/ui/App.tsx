import * as React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import TabPage from './TabPage';
import ListActionPage from './ListActionPage';
import usePeer from "../../hooks/usePeer";
import PeerProvider from '../../components/PeerProvider';
import PeerContext from "../../contexts/PeerContext";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './App.css';

const appiSchema: any = [
    {
      type: 'SEND_MESSAGE',
      handler: [(req, res, next) => { 
        console.log('got a message', req);
        res.send(req.body);
      }]
    }
  ]

const JoinPeer = () => {
    const [id, setId] = React.useState("");
    const {
        peer,
        joinPeer,
        peers,
     } = usePeer();

     console.log({ location: useLocation() });

    // create material-ui input with submit button to join peer
    return (
        <div>
            <Box sx={{ mt: 1 }}>
                <TextField
                    id="demo-helper-text-aligned"
                    label="enter peer id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <Button onClick={() => joinPeer(id)}>Join Peer</Button>
            </Box>
        </div>
    )
}

const CreateRoom = () => {
    const [id, setId] = React.useState("");
    const {
        peer,
        createRoom,
        peers,
     } = usePeer();

    // create material-ui input with submit button to join peer
    return (
        <div>
            <Box sx={{ mt: 1 }}>
                <TextField
                    id="demo-helper-text-aligned"
                    label="create room id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <Button onClick={() => createRoom()}>create room</Button>
            </Box>
        </div>
    )
}

const App = ({ routes }) => {
    const {
        peer,
        joinPeer,
        peers,
        rooms,
    } = usePeer();
    // log the current url
    console.log('outside of usePeer():', {list: peers});
    console.log('logging the context', React.useContext(PeerContext));
    console.log({ routes });

    return (
        <React.StrictMode>
            <TabPage
                tabs={[
                    {
                        name: "peers",
                        // content: 'Peers page'
                        content: (<ListActionPage heading="connected peers" list={peers} action={JoinPeer} />)
                    },
                    {
                        name: "rooms",
                        // content: 'Rooms page'
                        content: (<ListActionPage heading="connected rooms" list={rooms} action={CreateRoom} />)
                    }
                ]}
            />
            <Routes>
                <Route path="/" element={<div>app<Link to="/teams">teams</Link><Link to="/">app</Link></div>} />
                <Route path="/teams" element={<div>teams</div>} />
            </Routes>
        </React.StrictMode>
    );
}


export default ({ children }) => (
    <PeerProvider appiSchema={appiSchema}><App /></PeerProvider>
)