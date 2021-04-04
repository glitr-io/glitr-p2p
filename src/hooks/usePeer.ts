import { useContext } from 'react';
import PeerContext from '../contexts/PeerContext'

export default () => {
    const peerContext = useContext(PeerContext);
    console.log('this is from the usePeer file');
    return peerContext;
};
