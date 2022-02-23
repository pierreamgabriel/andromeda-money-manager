import React from 'react';
import { ScrollView, StatusBar, StyleSheet, SafeAreaView, View } from 'react-native';
import { Header as HeaderRNE } from 'react-native-elements';
import { rnrw } from 'react-native-realm-wrapper';

function Addincome () {
	
	return(
	<SafeAreaView> 
	<HeaderRNE containerStyle={styles.header}
	statusBarProps={{backgroundColor: '#80bb55'}}	
	leftComponent={{text: 'Add new income', style: styles.left}} >
	</HeaderRNE>	
	</SafeAreaView>	
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
    width: 180
  },	
});

export default Addincome;