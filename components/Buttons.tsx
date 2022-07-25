/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Button} from 'react-native-elements';
import Realm from 'realm';
import {UpdateHome} from '../screens/Home';
import {StackParams} from '../App';

interface MainButtonProps {
  func: () => void;
  text: string;
}

interface OkButtonProps {
  route: {
    params: {
      onReturn: (arg: number) => void;
    };
  };
  nav: {
    goBack: () => void;
  };
}

interface AddItemButtonProps {
  screen: StackParams | string;
  nav: {
    navigate: (prop: StackParams | string, {}) => void;
  };
}

function MainButton(props: MainButtonProps) {
  return (
    <Button
      onPress={props.func}
      title={props.text}
      buttonStyle={{
        backgroundColor: 'rgba(78, 116, 289, 1)',
        borderRadius: 3,
      }}
      containerStyle={{
        width: 120,
        marginHorizontal: 50,
        marginVertical: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
      }}
    />
  );
}

function OkButton(props: OkButtonProps) {
  return (
    <Button
      onPress={async () => {
        const realm = await Realm.open({});
        await realm.close();
        props.route.params.onReturn(1);
        props.nav.goBack();
      }}
      title="OK"
      buttonStyle={{
        backgroundColor: 'rgba(78, 116, 289, 1)',
        borderRadius: 3,
      }}
      containerStyle={{
        width: 50,
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
      }}
    />
  );
}

function AddItemButton(props: AddItemButtonProps) {
  const setUpdate = useContext(UpdateHome);
  return (
    <Button
      onPress={() => {
        props.nav.navigate(props.screen, {
          onReturn: (arg: number) => {
            setUpdate(arg);
          },
        });
        setUpdate(0);
      }}
      title="Add New"
      buttonStyle={{
        backgroundColor: 'rgba(78, 116, 289, 1)',
        borderRadius: 3,
      }}
      containerStyle={{
        width: 120,
        marginHorizontal: 50,
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
      }}
    />
  );
}

export {MainButton, OkButton, AddItemButton};
