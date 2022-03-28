import React, { useEffect, createContext, useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { Header as HeaderRNE, Tab, TabView, ListItem, Icon } from 'react-native-elements';
import { Charts } from '../components/Charts';
import { taxRnrw, nonTaxRnrw, expensesRnrw } from '../Schemas';
import { AddItemButton } from '../components/Buttons';
import Checkbox from '../components/Checkbox';
import { rnrw } from 'react-native-realm-wrapper';
export const UpdateHome = createContext();

function Home({ navigation }) {

  const [taxableIncome, setTax] = useState(null);
  const [nontaxableIncome, setNon] = useState(null);
  const [expenses_, setEx] = useState(null);
  const [index, setIndex] = useState(0);
  const [update, setUpdate] = useState();
  const [checkBoxIncome, setCheckBoxIncome] = useState({
    tax: true,
    nonTax: false
  });
  const [list, setList] = useState([]);

  const format = (value) => {
    if (value == null) {
      return
    }
    let decimalPart = value.toFixed(2).split('.')[1]
    return (
      value
        .toString()
        .split('.')[0]
        .split('')
        .reverse()
        .map((number, index, array) => {
          return (index + 1) % 3 === 0 && array[index + 1]
            ? `.${number}`
            : number;
        })
        .reverse()
        .join('')
      + ',' + decimalPart
    )
  };

  const deleteItem = (index) => {

    if (list[index].tax == true) {
      rnrw.del(taxRnrw, list[index].id);
      setList(list.filter((item, i) => i !== index));
    } else {
      rnrw.del(nonTaxRnrw, list[index].id);
      setList(list.filter((item, i) => i !== index));
    }
  };

  useEffect(() => {
    
    const setVariables = async () => {
      let arr1;
      let arr2;
      let arr3;
      await rnrw.ot(taxRnrw, "date", true).then(obj => { arr1 = JSON.parse(JSON.stringify(obj)); });
      await rnrw.ot(nonTaxRnrw, "date", true).then(obj => { arr2 = JSON.parse(JSON.stringify(obj)); });
      await rnrw.ot(expensesRnrw, "date", true).then(obj => { arr3 = JSON.parse(JSON.stringify(obj)); });
      
      if (arr1.length > 0) {
        setTax(arr1.map(item => item.amount).reduce((prev, next) => prev + next));
      } else {
        arr1 = [];
      }
      if (arr2.length > 0) {
        setNon(arr2.map(item => item.amount).reduce((prev, next) => prev + next));
      } else {
        arr2 = [];
      }
      if (arr3.length > 0) {
        setEx(arr3.map(item => item.amount).reduce((prev, next) => prev + next));
      } else {
        arr3 = [];
      }
      if (checkBoxIncome.all) {
        setList([...arr1, ...arr2]);
      } else if (checkBoxIncome.tax) {
        setList(arr1);
      } else {
        setList(arr2);
      }  

    };
    setVariables();
    
  }, [update, checkBoxIncome]);

  return (
    <>
      <SafeAreaView>
        <HeaderRNE containerStyle={styles.header}
          statusBarProps={{ backgroundColor: '#80bb55' }}
          leftComponent={{ text: 'Andromeda Money', style: styles.left }} >
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
        <Tab.Item containerStyle={{ backgroundColor: '#699847' }}
          title="Report"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'dollar-sign', type: 'font-awesome-5', color: 'white' }}
        />
        <Tab.Item containerStyle={{ backgroundColor: '#699847' }}
          title="Income"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'hand-holding-usd', type: 'font-awesome-5', color: 'white' }}
        />
        <Tab.Item containerStyle={{ backgroundColor: '#699847' }}
          title="Expenses"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'file-invoice-dollar', type: 'font-awesome-5', color: 'white' }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: '#80bb55', width: '100%' }}
          onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          <Charts taxable={taxableIncome} nontaxable={nontaxableIncome} expenses={expenses_} />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#80bb55', width: '100%' }}
          onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          <ScrollView>
            <UpdateHome.Provider value={setUpdate}>
              <AddItemButton nav={navigation} screen="AddIncome" />
            </UpdateHome.Provider>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Checkbox title="Taxable" uncheckedColor="white" color="white" checked={checkBoxIncome.tax}
                func={() => setCheckBoxIncome({ all: false, tax: true, nonTax: false })} />
              <Checkbox title="Nontaxable" uncheckedColor="white" color="white" checked={checkBoxIncome.nonTax}
                func={() => setCheckBoxIncome({ all: false, tax: false, nonTax: true })} />
            </View>
            {list.map((item, index) => {
              return (
                <ListItem key={index} bottomDivider
                  style={{
                    marginBottom: 3,
                    width: "95%",
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}>
                  <ListItem.Content>
                    <ListItem.Title>{item.description}</ListItem.Title>
                    <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
                    <ListItem.Subtitle>{format(item.amount)}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon name="delete" onPress={() => deleteItem(index)} />
                </ListItem>
              );
            })}
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#80bb55', width: '100%' }}
          onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          <View>
            <AddItemButton nav={navigation} screen="AddExpense" />
          </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    width: 185
  },
});

export default Home;