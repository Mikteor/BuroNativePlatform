import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native';
import {Button, ListItem, } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import { DataTable } from 'react-native-paper';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Main = ({}) => {

const team = [1,2,3,4,5,6,7,8,]
const projects = [1,2,3,4,5,6,7,8,9,0]

  return (
    
  <View style={styles.container}>

    <View style={{flex:1}}>
      <View style={styles.title}>
          <Icon name='account-group-outline' color='#7C7C7C' size={24}/>
          <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Команда отдела</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {team.map((el,i)=>{
            return(
              <ListItem
                style={{marginVertical: 2,}}
                key={'team'+i}  
                // containerStyle={styles.buttContainer}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                >
                    <Image source={require('../../assets/ava.jpeg')} style={styles.avatar}/>
                    <ListItem.Content>
                      <ListItem.Title>Mitya putovitenko</ListItem.Title>
                      <ListItem.Subtitle>Mitya putovitenko</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
              </ListItem>
            )
        })}
      </ScrollView>
      
  </View>
  <View style={{flex:1}}>

      <View style={styles.title}>
          <Icon name='playlist-check' color='#7C7C7C' size={24}/>
          <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Проекты отдела</Text>
          <Button title='Все проекты' type='clear' 
                  titleStyle={{color: '#7C7C7C', fontSize: 14 }} 
                  containerStyle={{height:30, justifyContent: 'center',}}
                  icon={<ArrowIcon name='keyboard-arrow-right' color='#7C7C7C' size={18}/>}
                  iconRight={true}
                  />
      </View>
      <ScrollView style={styles.scrollView}>
      <DataTable>
      {projects.map((el,i)=>{
        return(
          
          <DataTable.Row style={styles.tableRow} key={'projj'+i} onPress={()=>navigation.navigate('project')} >
            <DataTable.Cell style={{flex: 1,}}>Название крупного проекта с длинным названием</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>35 дней</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>
              <View style={styles.projType}>
                <Text style={{color: '#CA9E4D',}}>архитектура</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={{flex: .3}} numeric>
              <Icon name='circle' color='green' size={14}/>
            </DataTable.Cell>
          </DataTable.Row>
        )
        
      })}
      </DataTable>
      </ScrollView>
  </View>
      
        

    </View>
  );
}
export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  scrollView:{
    paddingHorizontal: 15,
  },
    card: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderRadius: 13,
      paddingRight: 8,
      paddingLeft: 20,
      paddingVertical: 8,
      marginTop: 20,
    },
    newsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
      marginBottom: 30,
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: 15,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#DDDDDD',
      marginBottom: 5,
      paddingBottom: 3,
      marginTop: 20,
    },
    tableRow: {
      backgroundColor: 'white',
      marginVertical: 2,
      padding: 0,
    },
    projType: {
      backgroundColor: '#F2ECE1',

    },
    profileFlex: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 100,
      marginRight: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      width: 200,
      // backgroundColor: 'red'
    },
    btnProf: {
      borderRadius: 13,
      width: 150,
      marginLeft: 'auto',
    },
  });

