import React from 'react'
import usePeer from '../hooks/usePeer'

const TestConsumer = () => {
    const { count, setCount, peer } = usePeer();

console.log({ peer })
    return <div>
        <div>this is the test-consumer</div>
        <div>count: {count}</div>
        <button onClick={() => setCount(count + 1)}>inc</button>
        <button onClick={() => setCount(count - 1)}>dec</button>
    </div>
};

export default TestConsumer;
