import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Pressable } from 'react-native';
import { Header as HeaderRNE, Input, CheckBox, Overlay, Text, Icon } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { rnrw } from 'react-native-realm-wrapper';
import { MainButton, OkButton } from '../components/Buttons';
import { taxRnrw, nonTaxRnrw } from '../Schemas';
import Checkbox from '../components/Checkbox';

function AddExpense({ navigation, route }) {
  const [data, setData] = useState({
    desc: "",
    amount: "",
    amount_: "",
    tax: false,
    nonTax: false,
    date: [],
    paymentDate: "Select a payment date",
  });
  const amount = (arg1, arg2) => {
    if (isNaN(arg1)) {
      arg1 = "";
    }
    const fixAmount = arg1.toString().replace(/[^0-9]/g, "");
    const number = parseInt(fixAmount);
    if (arg2 == "blur") {
      if (isNaN(number)) {
        setData({ ...data, amount: "", amount_: "" });
      } else {
        setData({ ...data, amount: number, amount_: number.toFixed(2) });
      }
    } else {
      setData({ ...data, amount: number, amount_: fixAmount });
    }
  }
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleConfirm = (date) => {
    setData({ ...data, date: date.toLocaleDateString() });
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const addData = async () => {
    if (data.desc == "" || data.amount == "" || isNaN(data.amount) || typeof data.date != "string") {
      alert("All fields are required.");
    } else if (data.tax == true) {
      let id;
      await rnrw.nextID(taxRnrw).then(value => { id = value; });
      rnrw.write(taxRnrw, { id: id, description: data.desc, amount: data.amount, date: data.date, tax: true })
        .then(value => {
          if (value == "Success") {
            toggleOverlay();
          } else {
            alert("Something went wrong. Please try again.");
          }
        });
    } else if (data.nonTax == true) {
      let id;
      await rnrw.nextID(nonTaxRnrw).then(value => { id = value; });
      rnrw.write(nonTaxRnrw, { id: id, description: data.desc, amount: data.amount, date: data.date, tax: false })
        .then(value => {
          if (value == "Success") {
            toggleOverlay();
          } else {
            alert("Something went wrong. Please try again.");
          }
        })
    } else {
      alert("You need to select Taxable or Nontaxable.");
    }
  };

  useEffect(() => {
    if (typeof data.date == "string") {
      setData({ ...data, paymentDate: data.date });
    }
  }, [data.date]);

  return (
    <>
      <SafeAreaView>
        <HeaderRNE containerStyle={styles.header}
          statusBarProps={{ backgroundColor: '#80bb55' }}
          leftComponent={
            <Pressable onPress={navigation.goBack}>
              <Icon type='font-awesome' name="arrow-left" color="white" />
            </Pressable>
          }
          centerComponent={{ text: 'Add new income', style: styles.center }}
        />
      </SafeAreaView>
      <View>
        <Input
          placeholder="Description"
          leftIcon={{ type: 'font-awesome', name: 'comment' }}
          onChangeText={value => setData({ ...data, desc: value })}
        />
        <Input
          placeholder="Amount"
          leftIcon={{ type: 'font-awesome', name: 'money' }}
          value={data.amount_}
          onChangeText={value => amount(value)}
          onBlur={() => amount(data.amount, "blur")}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '95%' }}>
          <Checkbox title="Taxable" checked={data.tax} 
          func={() => setData({ ...data, tax: true, nonTax: false })}/>
          <Checkbox title="Nontaxable" checked={data.nonTax}
          func={() => setData({ ...data, tax: false, nonTax: true })}/>
        </View>
        <Pressable onPress={showDatePicker}>
          <Input
            disabled
            placeholder={data.paymentDate}
            leftIcon={{ type: 'font-awesome', name: 'calendar' }}
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
          <Text style={{ marginTop: 10 }}>Data added successfully.</Text>
          <OkButton nav={navigation} route={route} />
        </Overlay>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#80bb55',
    paddingBottom: 10
  },
  center: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    width: 180
  },
});

export default AddExpense;