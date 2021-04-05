import React from 'react';
import { Story, Meta } from '@storybook/react';
import PeerProvider from '../components/PeerProvider';
import TestConsumer from './TestConsumer';

export default {
    title: 'Example/PeerProvider',
    component: PeerProvider,
} as Meta;

const Template: Story = (args) => <PeerProvider {...args}>
  <TestConsumer />
  <TestConsumer />
</PeerProvider>;

export const Primary = Template.bind({});
Primary.args = {
  label: 'PeerProvider',
};