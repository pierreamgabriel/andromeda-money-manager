import React from 'react';
import {CheckBox} from 'react-native-elements';

interface CheckBoxProps {
  title: string;
  checked: boolean;
  color: string;
  uncheckedColor: string;
  func: () => void;
}

function Checkbox(props: CheckBoxProps) {
  return (
    <CheckBox
      center
      title={props.title}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
      textStyle={{color: props.color}}
      uncheckedColor={props.uncheckedColor}
      checked={props.checked}
      onPress={props.func}
    />
  );
}

export default Checkbox;
