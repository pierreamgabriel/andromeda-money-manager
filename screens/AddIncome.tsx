import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View, Pressable, Alert} from 'react-native';
import {
  Header as HeaderRNE,
  Input,
  Overlay,
  Text,
  Icon,
} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {rnrw} from 'react-native-realm-wrapper';
import {MainButton, OkButton} from '../components/Buttons';
import {taxRnrw, nonTaxRnrw} from '../Schemas';
import Checkbox from '../components/Checkbox';

function AddExpense({navigation, route}) {
  const [data, setData] = useState({
    desc: '',
    amount: 0,
    amount_: '',
    tax: false,
    nonTax: false,
    date: [],
  });
  const [paymentDate, setPaymentDate] = useState('Select a payment date');
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const amount = (arg1, arg2) => {
    const fixAmount = arg1.toString().replace(/[^0-9]/g, '');

    const number = parseInt(fixAmount, 10);
    if (arg2 === 'blur') {
      if (isNaN(number)) {
        setData({...data, amount: 0, amount_: ''});
      } else {
        setData({...data, amount: number, amount_: number.toFixed(2)});
      }
    } else {
      setData({...data, amount: number, amount_: fixAmount});
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleConfirm = date => {
    setData({...data, date: date.toLocaleDateString()});
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const addData = async () => {
    if (
      data.desc === '' ||
      data.amount === 0 ||
      isNaN(data.amount) ||
      typeof data.date !== 'string'
    ) {
      Alert.alert('', 'All fields are required.');
    } else if (data.tax === true) {
      let id;
      await rnrw.nextID(taxRnrw).then(value => {
        id = value;
      });
      rnrw
        .write(taxRnrw, {
          id: id,
          description: data.desc,
          amount: data.amount,
          date: data.date,
          tax: true,
        })
        .then(value => {
          if (value === 'Success') {
            toggleOverlay();
          } else {
            Alert.alert('', 'Something went wrong. Please try again.');
          }
        });
    } else if (data.nonTax === true) {
      let id;
      await rnrw.nextID(nonTaxRnrw).then(value => {
        id = value;
      });
      rnrw
        .write(nonTaxRnrw, {
          id: id,
          description: data.desc,
          amount: data.amount,
          date: data.date,
          tax: false,
        })
        .then(value => {
          if (value === 'Success') {
            toggleOverlay();
          } else {
            Alert.alert('', 'Something went wrong. Please try again.');
          }
        });
    } else {
      Alert.alert('', 'You need to select Taxable or Nontaxable.');
    }
  };

  useEffect(() => {
    if (typeof data.date === 'string') {
      setPaymentDate(data.date);
    }
  }, [data.date]);

  return (
    <>
      <SafeAreaView>
        <HeaderRNE
          containerStyle={styles.header}
          statusBarProps={{backgroundColor: '#80bb55'}}
          leftComponent={
            <Pressable onPress={navigation.goBack}>
              <Icon
                type="font-awesome"
                name="arrow-left"
                color="white"
                tvParallaxProperties={undefined}
              />
            </Pressable>
          }
          centerComponent={{text: 'Add new income', style: styles.center}}
        />
      </SafeAreaView>
      <View>
        <Input
          placeholder="Description"
          leftIcon={{type: 'font-awesome', name: 'comment'}}
          onChangeText={value => setData({...data, desc: value})}
          autoCompleteType={undefined}
        />
        <Input
          placeholder="Amount"
          leftIcon={{type: 'font-awesome', name: 'money'}}
          value={data.amount_}
          onChangeText={value => amount(value, '')}
          onBlur={() => amount(data.amount, 'blur')}
          autoCompleteType={undefined}
        />
        <View style={styles.itemTypeRow}>
          <Checkbox
            title="Taxable"
            checked={data.tax}
            func={() => setData({...data, tax: true, nonTax: false})}
            color={''}
            uncheckedColor={''}
          />
          <Checkbox
            title="Nontaxable"
            checked={data.nonTax}
            func={() => setData({...data, tax: false, nonTax: true})}
            color={''}
            uncheckedColor={''}
          />
        </View>
        <Pressable onPress={showDatePicker}>
          <Input
            disabled
            placeholder={paymentDate}
            leftIcon={{type: 'font-awesome', name: 'calendar'}}
            autoCompleteType={undefined}
          />
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <MainButton text="Add Income" func={addData} />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={styles.overlayText}>Data added successfully.</Text>
          <OkButton nav={navigation} route={route} />
        </Overlay>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#80bb55',
    paddingBottom: 10,
  },
  center: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    width: 180,
  },
  itemTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
  },
  overlayText: {
    marginTop: 10,
  },
});

export default AddExpense;
