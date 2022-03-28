import React from "react";
import { CheckBox } from "react-native-elements";

function Checkbox (props) {
    return(
        <CheckBox
        center
        title={props.title}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0}}
        textStyle={{color: props.color}}
        uncheckedColor={props.uncheckedColor}
        checked={props.checked}
        onPress={props.func}
      />
    );
}

export default Checkbox;