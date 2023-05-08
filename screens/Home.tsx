import React, {useEffect, createContext, useState} from 'react';
import {StyleSheet, SafeAreaView, View, ScrollView} from 'react-native';
import {Header as HeaderRNE, Tab, ListItem, Icon} from 'react-native-elements';
import {Charts} from '../components/Charts';
import {taxRnrw, nonTaxRnrw, expensesRnrw} from '../Schemas';
import {AddItemButton} from '../components/Buttons';
import Checkbox from '../components/Checkbox';
import {rnrw} from 'react-native-realm-wrapper';
import TabView from '../components/tab/TabView';

export const UpdateHome = createContext((_arg: any) => {});

type List = {
  id: string;
  description: string;
  amount: number;
  date: string;
  tax: boolean;
}[];

function Home({navigation}) {
  const [taxableIncome, setTax] = useState(0);
  const [nontaxableIncome, setNon] = useState(0);
  const [expenses_, setEx] = useState(0);
  const [index, setIndex] = useState(0);
  const [update, setUpdate] = useState();
  const [checkBoxIncome, setCheckBoxIncome] = useState({
    tax: true,
    nonTax: false,
    all: false,
  });
  const [list, setList] = useState<List>([]);

  const format = value => {
    if (value == null) {
      return;
    }
    let decimalPart = value.toFixed(2).split('.')[1];
    return (
      value
        .toString()
        .split('.')[0]
        .split('')
        .reverse()
        .map((number, i, array) => {
          return (i + 1) % 3 === 0 && array[i + 1] ? `.${number}` : number;
        })
        .reverse()
        .join('') +
      ',' +
      decimalPart
    );
  };

  const deleteItem = (arg: number) => {
    if (list[arg].tax === true) {
      rnrw.del(taxRnrw, list[arg].id);
      setList(list.filter((item, i) => i !== arg));
    } else {
      rnrw.del(nonTaxRnrw, list[arg].id);
      setList(list.filter((item, i) => i !== arg));
    }
  };

  useEffect(() => {
    const setVariables = async () => {
      let arr1;
      let arr2;
      let arr3;
      await rnrw.ot(taxRnrw, 'date', true).then(obj => {
        arr1 = JSON.parse(JSON.stringify(obj));
      });
      await rnrw.ot(nonTaxRnrw, 'date', true).then(obj => {
        arr2 = JSON.parse(JSON.stringify(obj));
      });
      await rnrw.ot(expensesRnrw, 'date', true).then(obj => {
        arr3 = JSON.parse(JSON.stringify(obj));
      });

      if (arr1.length > 0) {
        setTax(
          arr1.map(item => item.amount).reduce((prev, next) => prev + next),
        );
      } else {
        arr1 = [];
      }
      if (arr2.length > 0) {
        setNon(
          arr2.map(item => item.amount).reduce((prev, next) => prev + next),
        );
      } else {
        arr2 = [];
      }
      if (arr3.length > 0) {
        setEx(
          arr3.map(item => item.amount).reduce((prev, next) => prev + next),
        );
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
        <HeaderRNE
          containerStyle={styles.header}
          statusBarProps={{backgroundColor: '#80bb55'}}
          leftComponent={{
            text: 'Andromeda Money',
            style: styles.left,
          }}
        />
      </SafeAreaView>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={styles.indicator}
        variant="primary">
        <Tab.Item
          containerStyle={styles.container}
          title="Report"
          titleStyle={styles.tabItemTitle}
          icon={{name: 'dollar-sign', type: 'font-awesome-5', color: 'white'}}
        />
        <Tab.Item
          containerStyle={styles.container}
          title="Income"
          titleStyle={styles.tabItemTitle}
          icon={{
            name: 'hand-holding-usd',
            type: 'font-awesome-5',
            color: 'white',
          }}
        />
        <Tab.Item
          containerStyle={styles.container}
          title="Expenses"
          titleStyle={styles.tabItemTitle}
          icon={{
            name: 'file-invoice-dollar',
            type: 'font-awesome-5',
            color: 'white',
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabItem}>
          <Charts
            taxable={taxableIncome}
            nontaxable={nontaxableIncome}
            expenses={expenses_}
          />
        </TabView.Item>
        <TabView.Item style={styles.tabItem}>
          <ScrollView>
            <UpdateHome.Provider value={setUpdate}>
              <AddItemButton nav={navigation} screen="AddIncome" />
            </UpdateHome.Provider>
            <View style={styles.itemTypeRow}>
              <Checkbox
                title="Taxable"
                uncheckedColor="white"
                color="white"
                checked={checkBoxIncome.tax}
                func={() =>
                  setCheckBoxIncome({all: false, tax: true, nonTax: false})
                }
              />
              <Checkbox
                title="Nontaxable"
                uncheckedColor="white"
                color="white"
                checked={checkBoxIncome.nonTax}
                func={() =>
                  setCheckBoxIncome({all: false, tax: false, nonTax: true})
                }
              />
            </View>
            {list.map((item, i) => {
              return (
                <ListItem
                  key={item.id}
                  bottomDivider
                  style={styles.item}
                  hasTVPreferredFocus={undefined}
                  tvParallaxProperties={undefined}>
                  <ListItem.Content>
                    <ListItem.Title>{item.description}</ListItem.Title>
                    <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
                    <ListItem.Subtitle>{format(item.amount)}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon
                    name="delete"
                    onPress={() => deleteItem(i)}
                    tvParallaxProperties={undefined}
                  />
                </ListItem>
              );
            })}
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={styles.tabItem}>
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
    paddingBottom: 10,
  },
  left: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    width: 185,
  },
  indicator: {
    backgroundColor: 'white',
    height: 3,
  },
  container: {
    backgroundColor: '#699847',
  },
  tabItem: {
    backgroundColor: '#80bb55',
    width: '100%',
  },
  tabItemTitle: {
    fontSize: 12,
  },
  itemTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginBottom: 3,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default Home;
