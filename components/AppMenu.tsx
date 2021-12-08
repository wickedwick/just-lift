import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import { AppMenuProps } from '../types/common'

const AppMenu = (props: AppMenuProps): JSX.Element => {
  return (
    <Appbar style={styles.full}>
      <Appbar.Action icon='camera' onPress={props.onCameraPress} />
      <Appbar.Action icon='folder' onPress={props.onFolderPress} />
      <Appbar.Action icon='delete' onPress={props.onClearPress} />
    </Appbar>
  )
}

const styles = StyleSheet.create({
  full: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    paddingTop: 25,
  },
})

export default AppMenu
