<a href="https://cognite.com/">
    <img src="./cognite_logo.png" alt="Cognite logo" title="Cognite" align="right" height="80" />
</a>

# Storyhooks

Storyhooks is a super tiny tool intended to make setup and mocking easier when writing stories in Storybook for React components.

It is intended to emulate a `beforeEach`/`afterEach` workflow -- the `didMount` function is called when the child is being mounted, and the `willUnmount` function can be used to perform a teardown when the child is ready to be unmounted.

[![npm version](https://badge.fury.io/js/%40cognite%2Fstoryhooks.svg)](https://badge.fury.io/js/%40cognite%2Fstoryhooks)

## Getting started

`yarn add @cognite/storyhooks`

or

`npm i @cognite/storyhooks`

## Example Usage

To make use of StoryHooks in individual stories, start by importing it at the top of the file containing them:

`import StoryHooks from '@cognite/storyhooks';`

Pass in components as children of the StoryHooks component. Multiple children are supported. Check out `stories/index.stories.tsx` for more examples.

```
<StoryHooks
  didMount={() => {
    // This is a great place to perform setup actions, such as mocking out API calls performed by the component
    sinon.stub(backend, 'fetchData').returns([{ id: 1, value: 'my data' }]);
  }}
  willUnmount={() => {
    // This is a great place to perform teardown actions, such as:
    sinon.restore();
  }}
>
  <MyAwesomeComponent />
  <AnotherAwesomeComponent />
</StoryHooks>
```

## Contributing

Feel free to send us a PR.

By contributing you agree to abide by the [Code of Conduct](https://github.com/cognitedata/storyhooks/blob/master/CODE_OF_CONDUCT.md).
