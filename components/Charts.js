import React from 'react';
import Realm from 'realm';
import { ScrollView, Text, Dimensions} from 'react-native';
import { BarChart, PieChart} from 'react-native-chart-kit';

export function Charts(props) {
	
const data = [
	{
    name: "Taxable",
    amount: props.taxable,
	color: "#ffffff",
    legendFontColor: "#ffffff",
    legendFontSize: 15	
    },
	{
	name: "Nontaxable",
    amount: props.nontaxable,
	color: "#8dc187",
    legendFontColor: "#ffffff",
    legendFontSize: 15	
	}
];	

const totalIncome = props.taxable + props.nontaxable;	
		
		return(
		<ScrollView>
  <Text></Text>
  <PieChart
    data={data}
    accessor={"amount"}			
    width={Dimensions.get("window").width - 16} 
    height={220}
    chartConfig={{
      decimalPlaces: 2,
      color: (opacity = 1) => "rgba(255, 255, 255)",
    }}
	style={{
        borderRadius: 16,
		marginLeft:'auto',
		marginRight:'auto',
		left:0,
		right:0  
		   
      }}
    backgroundColor={"#458336"}
    paddingLeft={"5"}
  />
 <Text></Text>	
  <BarChart
        data={{
          labels: ['Income', 'Expenses'],
          datasets: [{ data: [totalIncome, props.expenses] }],
        }}
        width={Dimensions.get('window').width - 16}
        height={230}
        yAxisLabel={'$ - '}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#458336',
          backgroundGradientTo: '#458336',
          decimalPlaces: 2,
          color: (opacity = 255) => '#ECEFF1',
        }}
		style={{
            borderRadius: 12, 
			padding: 10,
			marginLeft:'auto',
		    marginRight:'auto',
		    left:0,
		    right:0 		 
          }}
      />
</ScrollView>
		);
	
}