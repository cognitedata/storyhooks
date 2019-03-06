import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryHooks from '../src';

storiesOf('StoryHooks story', module)
  .add('Demo', () => (
    <StoryHooks
      didMount={() => {
        action('didMount')();
        console.log('didMount executed');
      }}
      willUnmount={() => {
        action('willUnmount')();
        console.log('willUnmount executed');
      }}
    >
      <div>Placeholder child</div>
      <div>Multiple children are supported</div>
      <div>Check console.log too</div>
    </StoryHooks>
  ))
  .add('Second demo', () => (
    <StoryHooks
      didMount={() => {
        action('didMount')();
        console.log('didMount executed');
      }}
      willUnmount={() => {
        action('willUnmount')();
        console.log('willUnmount executed');
      }}
    >
      <div>This only exists so you can test switching stories.</div>
    </StoryHooks>
  ));
