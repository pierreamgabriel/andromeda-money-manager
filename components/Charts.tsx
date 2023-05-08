import React from 'react';
import {View, ScrollView, Text, Dimensions} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';

interface ChartProps {
  taxable: number;
  nontaxable: number;
  expenses: number;
}

export function Charts(props: ChartProps) {
  const data = [
    {
      name: '',
      amount: props.taxable,
      color: '#fc9b45',
      legendFontColor: '#ffffff',
      legendFontSize: 15,
    },
    {
      name: '',
      amount: props.nontaxable,
      color: '#96d1e6',
      legendFontColor: '#ffffff',
      legendFontSize: 15,
    },
  ];

  const totalIncome = props.taxable + props.nontaxable;

  return (
    <ScrollView>
      <View style={styles.taxRow}>
        <Icon
          solid
          name="circle"
          type="font-awesome-5"
          color="#fc9b45"
          tvParallaxProperties={undefined}
        />
        <Text style={styles.taxable}>Taxable</Text>
        <Icon
          solid
          name="circle"
          type="font-awesome-5"
          color="#96d1e6"
          tvParallaxProperties={undefined}
        />
        <Text style={styles.nonTaxable}>Nontaxable</Text>
      </View>
      <PieChart
        data={data}
        accessor={'amount'}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          decimalPlaces: 2,
          color: (_opacity = 1) => 'rgba(255, 255, 255)',
        }}
        style={styles.pieChart}
        backgroundColor={'#458336'}
        paddingLeft={'20'}
      />
      <View style={styles.barChartTitleRow}>
        <Icon
          solid
          name="balance-scale"
          type="font-awesome-5"
          color="#ffffff"
          tvParallaxProperties={undefined}
        />
        <Text style={styles.barChartTitle}>Income vs Expenses</Text>
      </View>
      <BarChart
        data={{
          labels: ['Income', 'Expenses'],
          datasets: [{data: [totalIncome, props.expenses]}],
        }}
        width={Dimensions.get('window').width - 16}
        height={230}
        showValuesOnTopOfBars={true}
        withHorizontalLabels={false}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#458336',
          backgroundGradientTo: '#458336',
          decimalPlaces: 2,
          color: (_opacity = 255) => '#ECEFF1',
        }}
        style={styles.barChart}
        yAxisLabel=""
        yAxisSuffix=""
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  taxRow: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taxable: {
    marginLeft: 5,
    marginRight: 5,
    color: '#ffffff',
  },
  nonTaxable: {
    marginLeft: 5,
    color: '#ffffff',
  },
  pieChart: {
    borderRadius: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
  },
  barChartTitleRow: {
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barChartTitle: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  barChart: {
    borderRadius: 12,
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
  },
});
