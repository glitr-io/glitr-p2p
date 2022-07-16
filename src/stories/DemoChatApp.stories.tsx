import React from 'react';
import { Story, Meta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import App from './ui/App';

export default {
    title: 'Example/App',
    component: App,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/teams'
        }
    }
} as Meta;

const Template: Story = () => <App />;

export const Main = Template.bind({});
Main.story = {
    parameters: {
        reactRouter: {
            routePath: '/teams',
        }
    }
};