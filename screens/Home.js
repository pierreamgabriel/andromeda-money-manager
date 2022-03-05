import React, { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, SafeAreaView, View } from 'react-native';
import { Header as HeaderRNE, Tab, TabView, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Numbers, Charts } from '../components/Charts';
import Realm from 'realm';

function Home ({ navigation }) {
	
const [taxableIncome, setTax] = React.useState(null);
const [nontaxableIncome, setNon] = React.useState(null);
const [expenses_, setEx] = React.useState(null);
const [index, setIndex] = React.useState(0);	
	
const taxable = {
	name: 'taxable',
	properties: {
		description: 'string',
		amount: 'int'
	}
}

const nontaxable = {
	name: 'nontaxable',
	properties: {
		description: 'string',
		amount: 'int'
	}
}

const expenses = {
	name: 'expenses',
	properties: {
		description: 'string',
		amount: 'int'
	}
}

useEffect(() => {	
Realm.open({
    schema: [taxable, nontaxable, expenses]
  }).then(realm => {
  realm.write(() => {
  realm.create("taxable", { description: "Max", amount: 5 });
  setTax(realm.objects("taxable").sum("amount"));	
  setNon(realm.objects("nontaxable").sum("amount")); 
  setEx(realm.objects("expenses").sum("amount"));	  
  realm.close();	  
})
});
}, [taxableIncome, nontaxableIncome, expenses_]);
	
	return(
    <>
	<SafeAreaView> 
	<HeaderRNE containerStyle={styles.header}
	statusBarProps={{backgroundColor: '#80bb55'}}	
	leftComponent={{text: 'Income Tracker', style: styles.left}} >
	</HeaderRNE>	
	</SafeAreaView>
	 <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item containerStyle={{backgroundColor: '#699847'}}
          title="Recent"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'dollar-sign', type: 'font-awesome-5', color: 'white' }}
        />
        <Tab.Item containerStyle={{backgroundColor: '#699847'}}
          title="Income"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'hand-holding-usd', type: 'font-awesome-5', color: 'white' }}
        />
        <Tab.Item containerStyle={{backgroundColor: '#699847'}}
          title="Expenses"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'file-invoice-dollar', type: 'font-awesome-5', color: 'white' }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: '#80bb55', width: '100%' }}>
         <Charts taxable={taxableIncome} nontaxable={nontaxableIncome} expenses={expenses_} /> 
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#80bb55', width: '100%' }}>
          <View>
			 <Button
                onPress={() =>
                  navigation.navigate('Addincome')
       			}
                title="Add new"
                buttonStyle={{
                  backgroundColor: 'rgba(78, 116, 289, 1)',
                  borderRadius: 3,			 
                }}
                containerStyle={{
                  width: 120,
                  marginHorizontal: 50,
                  marginVertical: 10,
				  marginLeft:'auto',
		          marginRight:'auto',
		          left:0,
		          right:0				
                }}
              />
			</View>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#80bb55', width: '100%' }}>
          
        </TabView.Item>
      </TabView>
	</>	
	);
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#80bb55',
	paddingBottom: 10
  },
  left: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    width: 160
  },	
});

export default Home;