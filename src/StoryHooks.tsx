import React from 'react';

export type HookFunction = () => void;

export interface StoryHooksProps {
  didMount?: HookFunction;
  willUnmount?: HookFunction;
}

/**
 * StoryHooks is a component which should only be used for the storybook. It is
 * intended to emulate a {@code beforeEach}/{@code afterEach} workflow -- the
 * {@code didMount} function is called before the child is mounted, and the
 * {@code willUnmount} function can be used to perform a teardown after the
 * child being unmounted.
 */
class StoryHooks extends React.PureComponent<StoryHooksProps> {
  public componentDidMount() {
    const { didMount } = this.props;
    if (didMount) {
      didMount();
    }
  }

  public componentWillUnmount() {
    const { willUnmount } = this.props;
    if (willUnmount) {
      willUnmount();
    }
  }

  public render() {
    return this.props.children;
  }
}

export default StoryHooks;
