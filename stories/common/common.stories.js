import React from 'react';
import { storiesOf } from '@storybook/react';
import { createMuiTheme } from '@material-ui/core/styles';
import rootTheme from '../../src/style/components/root'
import BublyButton from '../../src/components/bubly/button/button'
import { muiTheme } from 'storybook-addon-material-ui';
const customTheme1 = createMuiTheme(rootTheme)
storiesOf('Chapter 2: Common Components', module)
    .addDecorator(
        muiTheme([customTheme1]),
    )
    .add('Bubly Custom Button', () => <BublyButton variant="outlined">product info</BublyButton>);