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
      containerStyle={styles.checkboxContainer}
      textStyle={styles.checkboxText(props.color)}
      uncheckedColor={props.uncheckedColor}
      checked={props.checked}
      onPress={props.func}
    />
  );
}

const styles = {
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: (arg: string) => ({
    color: arg,
  }),
};
export default Checkbox;
