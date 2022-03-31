import NotFoundScreen from '../NotFoundScreen';
import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

describe('<NotFoundScreen />', () => {
  it('Renders', () => {
    const props: any = { Root: {}, NotFound: {} }
    const routeProps: any = {}
    const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null =
      renderer
        .create(<NotFoundScreen navigation={props} route={routeProps} />)
        .toJSON()

    const json = tree as ReactTestRendererJSON
    expect(json?.children?.length).toBe(2)
  })
})
