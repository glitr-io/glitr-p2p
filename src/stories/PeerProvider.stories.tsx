import React from 'react';
import { Story, Meta } from '@storybook/react';
import PeerProvider from '../components/PeerProvider';
import TestConsumer from './TestConsumer';

export default {
    title: 'Example/PeerProvider',
    component: PeerProvider,
} as Meta;

const appiSchema: any = [
  {
    type: 'SEND_MESSAGE',
    handler: [(req, res, next) => { 
      console.log('got a message', req);
      res.send(req.body);
    }]
  }
]

const Template: Story = (args) => <PeerProvider {...args} appiSchema={appiSchema}>
  <TestConsumer />
</PeerProvider>;

export const Primary = Template.bind({});
Primary.args = {
  label: 'PeerProvider',
};