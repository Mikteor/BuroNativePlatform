import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';


const Main = ({}) => {


  return (
    
    <View style={styles.container}>

<Text style={styles.title}>Новости</Text>

<View style={styles.card}>
    <Text style={{textAlign: 'right'}}>01.20</Text>
    <Text>Имя фамилия</Text>
    <Text style={styles.newsTitle} numberOfLines={1}>Большое и длинное название новости</Text>
</View>

    </View>
  );
}
export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4C4C4',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
    card: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderRadius: 13,
      paddingRight: 8,
      paddingLeft: 20,
      paddingVertical: 8,
    },
    newsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      borderBottomWidth: 1,
      marginHorizontal: 10,
      marginVertical: 20,
      paddingBottom: 10,
    },
  });

