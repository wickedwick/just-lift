import React from 'react';
import { ActionButtonProps } from '../types/common';
import { Button } from 'react-native-paper';

const ActionButton = (props: ActionButtonProps): JSX.Element => {
  return (
    <Button
      icon={props.icon}
      mode={props.contained ? 'contained' : 'text'}
      onPress={props.onPress}
      style={props.style}
      labelStyle={props.labelStyle}
    >
      {props.text}
    </Button>
  )
}

export default ActionButton
