import React from 'react';
import { storiesOf } from '@storybook/react';
import { createMuiTheme } from '@material-ui/core/styles';
import rootTheme from '../../src/style/components/root'
import BublyButton from '../../src/components/bubly/button/button'
import { muiTheme } from 'storybook-addon-material-ui';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

const customTheme1 = createMuiTheme(rootTheme)
storiesOf('Chapter 2: Common Components', module)
    .addDecorator(
        muiTheme([customTheme1]),
    )
    .addDecorator(withKnobs)
    .add('Bubly Custom Button', () => {
    const color= text('Color','');    
    return <BublyButton variant="outlined" color={color}>product info</BublyButton>
    });