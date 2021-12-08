import React from 'react'
import renderer, { ReactTestRendererJSON } from 'react-test-renderer'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AppMenu from '../AppMenu'

configure({ adapter: new Adapter() })

jest.mock('react-native-paper', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View } = require('react-native')
  const appBar = View
  appBar.displayName = ''
  appBar.Action = View
  return {
    Appbar: appBar,
  }
})

describe('<AppMenu />', () => {
  const props = {
    onCameraPress: jest.fn(),
    onFolderPress: jest.fn(),
    onClearPress: jest.fn(),
  }

  it('Renders with props', () => {
    const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null =
      renderer
        .create(
          <AppMenu
            onCameraPress={props.onCameraPress}
            onClearPress={props.onClearPress}
            onFolderPress={props.onFolderPress}
          />
        )
        .toJSON()

    const json = tree as ReactTestRendererJSON
    expect(json?.children?.length).toBe(3)
  })

  it('Handles clear press clears the image and concepts', () => {
    const wrapper = shallow(
      <AppMenu
        onCameraPress={props.onCameraPress}
        onClearPress={props.onClearPress}
        onFolderPress={props.onFolderPress}
      />
    )

    wrapper.children().at(0).dive().simulate('press')
    expect(props.onCameraPress).toHaveBeenCalled()

    wrapper.children().at(1).dive().simulate('press')
    expect(props.onFolderPress).toHaveBeenCalled()

    wrapper.children().at(2).dive().simulate('press')
    expect(props.onClearPress).toHaveBeenCalled()
  })
})
