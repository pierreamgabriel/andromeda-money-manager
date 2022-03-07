import React, { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, SafeAreaView, View, Pressable, Modal } from 'react-native';
import { Header as HeaderRNE, Input, CheckBox, Overlay, Text, Button, Icon } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { rnrw } from 'react-native-realm-wrapper';
import {MainButton, OkButton} from '../components/Buttons';
import {taxRnrw, nonTaxRnrw} from '../Schemas';

function Addincome ({ navigation, route }) {
	const [description, setDesc] = React.useState("");
	const [amount, setAm] = React.useState("");
	const [date, setDate] = React.useState(new Date().toLocaleDateString());
	const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
	const [paymentDate, setPaymentDate] = React.useState("Select a payment date");
	const [tax, setTax] = React.useState(false);
    const [nonTax, setNonTax] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	
	const showDatePicker = () => {	
    setDatePickerVisibility(true);
  };
	const handleConfirm = (date) => {
    setDate(date.toLocaleDateString());	
    hideDatePicker();
  };
	const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
	const toggleOverlay = () => {
    setVisible(!visible);
  };

	const addData = async () => {
		if (description == "" || amount == "") {
			alert("Description and amount are required.");
		} else if (tax == true){	
		let id; 	
		await rnrw.nextID(taxRnrw).then(value => {id = value;});
		rnrw.write(taxRnrw, {id: id, description: description, amount: parseInt(amount), date: date})
		.then(value => {
			if (value == "Success") {
			toggleOverlay();
			} else {
			  alert("Something went wrong. Please try again.");
			  }
		})	
		} else if (nonTax == true) {
		let id; 	
		await rnrw.nextID(nonTaxRnrw).then(value => {id = value;});
		rnrw.write(nonTaxRnrw, {id: id, description: description, amount: parseInt(amount), date: date})
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
	}
	
	useEffect(() => {
	if (date != new Date().toLocaleDateString())	{
		
		setPaymentDate(date);
	}
}, [date]);
	
	return(
	<>
	<SafeAreaView> 
	<HeaderRNE containerStyle={styles.header}
	statusBarProps={{backgroundColor: '#80bb55'}}	
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
        onChangeText={value => setDesc(value)}
        />	
    <Input
        placeholder="Amount"
        leftIcon={{ type: 'font-awesome', name: 'money' }}
        onChangeText={value => setAm(value)}
        />
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
   <CheckBox
        center
        title="Taxable"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        containerStyle={{backgroundColor:'transparent'}}
        checked={tax}
        onPress={() => {setTax(true); setNonTax(false)}}
      />
   <CheckBox
        center
        title="Nontaxable"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        containerStyle={{backgroundColor:'transparent'}}
        checked={nonTax}
        onPress={() => {setTax(false); setNonTax(true)}}
      /> 
     </View>
     <Pressable onPress={showDatePicker}>
     <Input
        disabled
        placeholder={paymentDate}
        leftIcon={{ type: 'font-awesome', name: 'calendar' }}
        onChangeText={value => setDesc(value)}
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
        <Text style={{marginTop: 10}}>Data added successfully.</Text>
        <OkButton nav={navigation} route={route}/>
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

export default Addincome;