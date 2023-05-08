import React, {useContext} from 'react';
import {Button} from 'react-native-elements';
import Realm from 'realm';
import {UpdateHome} from '../screens/Home';
import {StackParams} from '../App';
import {StyleSheet} from 'react-native';

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
      buttonStyle={styles.mainButton}
      containerStyle={styles.mainButtonContainer}
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
      buttonStyle={styles.okButton}
      containerStyle={styles.okButtonContainer}
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
      buttonStyle={styles.addButton}
      containerStyle={styles.addButtonContainer}
    />
  );
}

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: 'rgba(78, 116, 289, 1)',
    borderRadius: 3,
  },
  mainButtonContainer: {
    width: 120,
    marginHorizontal: 50,
    marginVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
  },
  okButton: {
    backgroundColor: 'rgba(78, 116, 289, 1)',
    borderRadius: 3,
  },
  okButtonContainer: {
    width: 50,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: 'rgba(78, 116, 289, 1)',
    borderRadius: 3,
  },
  addButtonContainer: {
    width: 120,
    marginHorizontal: 50,
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
  },
});

export {MainButton, OkButton, AddItemButton};
