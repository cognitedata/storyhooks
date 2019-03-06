import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import sinon from 'sinon';
import StoryHooks from '../StoryHooks';

configure({ adapter: new Adapter() });

describe('StoryHooks', () => {
  it('Renders without exploding', () => {
    const didMountStub = sinon.mock();
    const willUnmountStub = sinon.mock();
    const wrapper = mount(
      <StoryHooks didMount={didMountStub} willUnmount={willUnmountStub}>
        <span>child</span>
      </StoryHooks>
    );
    expect(didMountStub.callCount).toEqual(1);
    expect(willUnmountStub.callCount).toEqual(0);

    wrapper.unmount();
    expect(didMountStub.callCount).toEqual(1);
    expect(willUnmountStub.callCount).toEqual(1);
  });
});

